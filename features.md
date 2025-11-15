# YUHU - Features Specification

## Proof of Concept: Real Implementation, No Jargon

This document specifies **exactly how** each feature works technically, with real libraries and real code.

---

## 1. Real-Time Push Notifications

### What It Does
Users receive instant notifications when:
- New announcements are posted
- Events are approved
- Messages arrive
- Event reminders (24h and 1h before)

### Technical Implementation

**Library:** `expo-notifications`

**Setup:**
```bash
npx expo install expo-notifications expo-device expo-constants
```

**Code Example:**
```javascript
// utils/notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push notifications
export async function registerForPushNotificationsAsync() {
  let token;
  
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#8B5CF6',
    });
  }
  
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      throw new Error('Permission not granted!');
    }
    
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    
    // Store token in Supabase user profile
    await supabase
      .from('users')
      .update({ push_token: token })
      .eq('id', userId);
    
    return token;
  }
}

// Send notification from backend
export async function sendPushNotification(expoPushToken: string, title: string, body: string, data?: any) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: data,
  };
  
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
```

**Backend Trigger (Supabase Edge Function):**
```javascript
// supabase/functions/send-notification/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { userIds, title, body, data } = await req.json()
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_KEY')
  )
  
  // Get push tokens for users
  const { data: users } = await supabase
    .from('users')
    .select('push_token')
    .in('id', userIds)
  
  const tokens = users.map(u => u.push_token).filter(Boolean)
  
  // Send to Expo Push API
  const messages = tokens.map(token => ({
    to: token,
    sound: 'default',
    title,
    body,
    data,
  }))
  
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  })
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

**Result:** Real push notifications that work on physical devices, delivered via Expo Push Service → FCM/APNs.

---

## 2. End-to-End Encrypted Chat

### What It Does
Messages are encrypted on sender device, stored encrypted in database, and only decrypted on recipient device. **No one**, not even the server, can read messages.

### Technical Implementation

**Libraries:**
```bash
npm install @noble/curves @noble/ciphers @noble/hashes
npx expo install expo-secure-store expo-crypto
```

**Encryption Flow:**
1. Each user generates RSA key pair on device
2. Private key stored in Expo SecureStore (never leaves device)
3. Public key stored in Supabase
4. Messages encrypted with AES-GCM using shared secret from ECDH

**Code Example:**
```javascript
// utils/encryption.ts
import { secp256k1 } from '@noble/curves/secp256k1';
import { getRandomBytes } from 'expo-crypto';
import { gcm } from '@noble/ciphers/aes';
import { sha256 } from '@noble/hashes/sha256';
import { hkdf } from '@noble/hashes/hkdf';
import * as SecureStore from 'expo-secure-store';

export interface KeyPair {
  privateKey: string;
  publicKey: string;
}

// Generate key pair
export async function generateKeyPair(): Promise<KeyPair> {
  const privateKeyBytes = getRandomBytes(32);
  const privateKey = Buffer.from(privateKeyBytes).toString('hex');
  const publicKey = secp256k1.getPublicKey(privateKey, true);
  
  return {
    privateKey,
    publicKey: Buffer.from(publicKey).toString('hex'),
  };
}

// Store private key securely
export async function storePrivateKey(userId: string, privateKey: string) {
  await SecureStore.setItemAsync(`privateKey_${userId}`, privateKey);
}

// Load private key
export async function loadPrivateKey(userId: string): Promise<string | null> {
  return await SecureStore.getItemAsync(`privateKey_${userId}`);
}

// Encrypt message
export async function encryptMessage(
  message: string,
  senderPrivateKey: string,
  recipientPublicKey: string
): Promise<{ ciphertext: string; iv: string; authTag: string }> {
  // Derive shared secret using ECDH
  const sharedSecret = secp256k1.getSharedSecret(
    senderPrivateKey,
    recipientPublicKey
  );
  
  // Derive AES key using HKDF
  const aesKey = hkdf(sha256, sharedSecret, undefined, undefined, 32);
  
  // Generate random IV
  const iv = getRandomBytes(12);
  
  // Encrypt with AES-GCM
  const cipher = gcm(aesKey, iv);
  const plaintext = new TextEncoder().encode(message);
  const ciphertext = cipher.encrypt(plaintext);
  
  return {
    ciphertext: Buffer.from(ciphertext).toString('hex'),
    iv: Buffer.from(iv).toString('hex'),
    authTag: Buffer.from(ciphertext.slice(-16)).toString('hex'),
  };
}

// Decrypt message
export async function decryptMessage(
  encryptedData: { ciphertext: string; iv: string; authTag: string },
  recipientPrivateKey: string,
  senderPublicKey: string
): Promise<string> {
  // Derive shared secret
  const sharedSecret = secp256k1.getSharedSecret(
    recipientPrivateKey,
    senderPublicKey
  );
  
  // Derive AES key
  const aesKey = hkdf(sha256, sharedSecret, undefined, undefined, 32);
  
  // Decrypt
  const iv = Buffer.from(encryptedData.iv, 'hex');
  const ciphertext = Buffer.from(encryptedData.ciphertext, 'hex');
  
  const decipher = gcm(aesKey, iv);
  const plaintext = decipher.decrypt(ciphertext);
  
  return new TextDecoder().decode(plaintext);
}
```

**Integration with Chat:**
```javascript
// screens/ChatScreen.tsx
const sendMessage = async (messageText: string) => {
  const myPrivateKey = await loadPrivateKey(myUserId);
  const partnerPublicKey = await getPublicKey(partnerId);
  
  const encrypted = await encryptMessage(
    messageText,
    myPrivateKey,
    partnerPublicKey
  );
  
  await supabase.from('messages').insert({
    sender_id: myUserId,
    recipient_id: partnerId,
    ciphertext: encrypted.ciphertext,
    iv: encrypted.iv,
    auth_tag: encrypted.authTag,
    created_at: new Date().toISOString(),
  });
};

const receiveMessage = async (encryptedMessage) => {
  const myPrivateKey = await loadPrivateKey(myUserId);
  const senderPublicKey = await getPublicKey(encryptedMessage.sender_id);
  
  const decrypted = await decryptMessage(
    {
      ciphertext: encryptedMessage.ciphertext,
      iv: encryptedMessage.iv,
      authTag: encryptedMessage.auth_tag,
    },
    myPrivateKey,
    senderPublicKey
  );
  
  return decrypted;
};
```

**Result:** True end-to-end encryption using industry-standard algorithms (secp256k1 ECDH + AES-256-GCM).

---

## 3. Real-Time Chat with Supabase Realtime

### What It Does
Messages appear instantly (< 1 second) in both sender and recipient apps without polling.

### Technical Implementation

**Setup Supabase Realtime:**
```sql
-- Enable realtime for messages table
alter publication supabase_realtime add table messages;
```

**Code:**
```javascript
// hooks/useRealtimeMessages.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useRealtimeMessages(chatId: string) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });
      
      setMessages(data || []);
    };
    
    fetchMessages();
    
    // Subscribe to new messages
    const subscription = supabase
      .channel(`chat_${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [chatId]);
  
  return messages;
}
```

**Usage:**
```javascript
const ChatScreen = ({ chatId }) => {
  const messages = useRealtimeMessages(chatId);
  
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageBubble message={item} />}
    />
  );
};
```

**Result:** WebSocket-based real-time updates with automatic reconnection.

---

## 4. Role-Based Access Control (RBAC)

### What It Does
Users can only access features and data based on their role (Student, Coordinator, Head, Admin).

### Technical Implementation

**Database Schema:**
```sql
create type user_role as enum ('student', 'coordinator', 'council_head', 'admin');

create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null,
  role user_role default 'student',
  created_at timestamp default now()
);

create table role_permissions (
  role user_role primary key,
  can_post_announcements boolean default false,
  can_approve_events boolean default false,
  can_manage_users boolean default false
);
```

**Row Level Security (RLS) Policies:**
```sql
-- Students can only see their own data
create policy "Users can view own profile"
  on users for select
  using (auth.uid() = id);

-- Only coordinators can post announcements
create policy "Coordinators can insert announcements"
  on announcements for insert
  with check (
    exists (
      select 1 from users
      where id = auth.uid()
      and role in ('coordinator', 'council_head', 'admin')
    )
  );

-- Only admins can update user roles
create policy "Admins can update roles"
  on users for update
  using (
    exists (
      select 1 from users
      where id = auth.uid()
      and role = 'admin'
    )
  );
```

**Frontend Protection:**
```javascript
// hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single()
          .then(({ data: profile }) => {
            setUser(data.user);
            setRole(profile.role);
          });
      }
    });
  }, []);
  
  const isCoordinator = role === 'coordinator' || role === 'council_head' || role === 'admin';
  const isAdmin = role === 'admin';
  
  return { user, role, isCoordinator, isAdmin };
}
```

**Conditional UI:**
```javascript
const HomeScreen = () => {
  const { isCoordinator, isAdmin } = useAuth();
  
  return (
    <View>
      {isCoordinator && (
        <Button title="Post Announcement" onPress={postAnnouncement} />
      )}
      
      {isAdmin && (
        <Button title="Admin Dashboard" onPress={goToAdminDashboard} />
      )}
    </View>
  );
};
```

**Result:** Enforced permissions at database level (RLS) + UI level for security.

---

## 5. Event Calendar Sync

### What It Does
Events created in YUHU automatically sync to user's device calendar (Google Calendar, Apple Calendar).

### Technical Implementation

**Library:**
```bash
npx expo install expo-calendar
```

**Code:**
```javascript
// utils/calendar.ts
import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';

export async function requestCalendarPermissions() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  return status === 'granted';
}

export async function addEventToCalendar(event: {
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  notes: string;
}) {
  const hasPermission = await requestCalendarPermissions();
  if (!hasPermission) return null;
  
  // Get default calendar
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const defaultCalendar = calendars.find(
    cal => cal.allowsModifications && cal.source.name === 'Default'
  ) || calendars[0];
  
  const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
    title: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    location: event.location,
    notes: event.notes,
    timeZone: 'Asia/Kolkata',
    alarms: [
      { relativeOffset: -1440 }, // 24 hours before
      { relativeOffset: -60 },   // 1 hour before
    ],
  });
  
  return eventId;
}
```

**Usage:**
```javascript
const EventDetail = ({ event }) => {
  const handleAddToCalendar = async () => {
    const calendarEventId = await addEventToCalendar({
      title: event.title,
      startDate: new Date(event.date),
      endDate: new Date(event.date),
      location: event.venue,
      notes: event.description,
    });
    
    // Save calendar event ID to track later
    await supabase
      .from('user_calendar_events')
      .insert({
        user_id: userId,
        event_id: event.id,
        calendar_event_id: calendarEventId,
      });
    
    Alert.alert('Success', 'Event added to your calendar!');
  };
  
  return (
    <Button title="Add to Calendar" onPress={handleAddToCalendar} />
  );
};
```

**Result:** Native calendar integration with reminders.

---

## 6. QR Code Attendance Tracking

### What It Does
Coordinators generate QR code for event. Students scan to mark attendance.

### Technical Implementation

**Libraries:**
```bash
npm install react-native-qrcode-svg
npx expo install expo-camera
```

**Generate QR Code:**
```javascript
// screens/EventAttendanceScreen.tsx (Coordinator view)
import QRCode from 'react-native-qrcode-svg';

const EventAttendanceScreen = ({ event }) => {
  const attendanceToken = `yuhu://attendance/${event.id}/${Date.now()}`;
  
  return (
    <View>
      <Text>Scan to Mark Attendance</Text>
      <QRCode
        value={attendanceToken}
        size={250}
      />
    </View>
  );
};
```

**Scan QR Code:**
```javascript
// screens/ScanAttendanceScreen.tsx (Student view)
import { Camera } from 'expo-camera';

const ScanAttendanceScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const handleBarCodeScanned = async ({ data }) => {
    // Parse: yuhu://attendance/{eventId}/{timestamp}
    const match = data.match(/yuhu:\/\/attendance\/([^/]+)\/([^/]+)/);
    if (!match) return;
    
    const [, eventId, timestamp] = match;
    
    // Mark attendance
    await supabase.from('attendance').insert({
      event_id: eventId,
      user_id: userId,
      scanned_at: new Date().toISOString(),
    });
    
    Alert.alert('Success', 'Attendance marked!');
  };
  
  return (
    <Camera
      onBarCodeScanned={handleBarCodeScanned}
      style={{ flex: 1 }}
    />
  );
};
```

**Result:** Quick, contactless attendance tracking.

---

## Summary

All features use **real libraries** with **real implementation code**. No vaporware, no jargon. Every feature is:

✅ Technically feasible with Expo + Supabase  
✅ Backed by proven libraries  
✅ Implementable in the MVP timeframe  
✅ Battle-tested by other production apps  

---

**End of Features Document**
