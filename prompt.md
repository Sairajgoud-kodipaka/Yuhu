# YUHU - Cursor AI Development Prompts

## Phase-by-Phase Prompts for Building YUHU with Cursor

Use these prompts sequentially in Cursor to build YUHU module by module.

---

## Phase 0: Project Setup

### Prompt 1: Initialize Expo Project
```
Create a new Expo project called "yuhu" with the following specifications:
- Use TypeScript
- Use Expo Router for navigation
- Install and configure these core dependencies:
  - @react-navigation/native
  - expo-router
  - zustand (for state management)
  - @supabase/supabase-js
  - expo-secure-store
  - @expo-google-fonts/inter

Create the following folder structure:
/app - Expo Router pages
/components - Reusable UI components
/context - React contexts (Auth, Theme)
/hooks - Custom hooks
/lib - Supabase client and utilities
/utils - Helper functions
/constants - App constants (colors, spacing)
/types - TypeScript types

Set up app.json with:
- App name: "YUHU"
- Slug: "yuhu"
- Version: "1.0.0"
- iOS bundle identifier: com.triox.yuhu
- Android package: com.triox.yuhu
- Splash screen with purple (#8B5CF6) background
- Icon placeholder

Create a basic theme file at constants/theme.ts with the color palette:
- Background: #111111
- Surface: #18181B  
- Primary: #8B5CF6
- Text primary: #FFFFFF
- Text secondary: #E5E7EB

Create initial Expo Router structure:
- app/_layout.tsx (root layout)
- app/(auth)/login.tsx
- app/(auth)/register.tsx
- app/(tabs)/_layout.tsx (tab navigator)
- app/(tabs)/index.tsx (home/dashboard)
```

### Prompt 2: Setup Supabase
```
Set up Supabase integration for YUHU:

1. Create lib/supabase.ts with Supabase client initialization using environment variables

2. Create .env file with placeholders:
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

3. Create context/AuthContext.tsx with:
- User state management
- Login function
- Logout function  
- Register function
- Session persistence using Expo SecureStore
- Auto-refresh token handling

4. Wrap app in AuthProvider in app/_layout.tsx

5. Create a useAuth hook in hooks/useAuth.ts that returns:
- user
- session
- loading
- signIn(email, password)
- signUp(email, password, name)
- signOut()

6. Add app.json plugin for expo-secure-store

7. Create types/database.ts with initial User type:
```typescript
export type UserRole = 'student' | 'coordinator' | 'council_head' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  course?: string;
  year?: number;
  role: UserRole;
  profile_pic?: string;
  push_token?: string;
  created_at: string;
  updated_at: string;
}
```
```

---

## Phase 1: Authentication & User Management

### Prompt 3: Build Login Screen
```
Create a fully functional login screen at app/(auth)/login.tsx:

Requirements:
- Use theme colors from constants/theme.ts
- Dark background (#111111)
- Email and password input fields with:
  - Proper keyboard types
  - Auto-capitalize off for email
  - Secure text entry for password
  - Input styling: background #27272A, border #27272A, text white
- Purple "Login" button (#8B5CF6)
- "Forgot Password?" link
- "Don't have an account? Register" link to navigate to register screen
- Loading state while signing in
- Error handling with Alert for failed login
- Auto-navigate to home screen on successful login

Use useAuth hook for authentication logic.
Add proper TypeScript types.
Include accessibility labels.
Handle keyboard dismissal.
```

### Prompt 4: Build Register Screen
```
Create a registration screen at app/(auth)/register.tsx:

Requirements:
- Similar styling to login screen
- Input fields:
  - Full Name
  - Email
  - Password (with strength indicator)
  - Confirm Password
  - Course dropdown (BS, BBA, MBA, PGDM)
  - Year dropdown (1, 2, 3, 4)
- Validate:
  - Email format
  - Password minimum 8 characters
  - Passwords match
  - All fields filled
- Purple "Create Account" button
- "Already have an account? Login" link
- Loading state
- Error handling
- On success, create user in Supabase and navigate to home

Create a Supabase table schema in a comment for the users table with all fields.
```

### Prompt 5: Profile Management
```
Create profile screen at app/(tabs)/profile.tsx:

Features:
- Display user info: name, email, course, year, role
- Profile picture with:
  - expo-image-picker integration
  - Upload to Supabase Storage
  - Circular avatar display
  - Placeholder if no image
- Edit profile button that opens modal/screen with:
  - Editable fields: name, course, year
  - Save button that updates Supabase
  - Cancel button
- Logout button (red #EF4444)
- Dark theme styling

Create utils/imageUpload.ts helper for uploading images to Supabase Storage.

Add proper loading states and error handling.
```

---

## Phase 2: Clubs & Councils

### Prompt 6: Database Schema for Clubs
```
Create Supabase database schema for clubs and councils.

Generate SQL migration files in supabase/migrations/:

1. councils table:
- id (uuid, primary key)
- name (text) - "Technical", "Sports", etc.
- description (text)
- head_id (uuid, foreign key to users)
- created_at (timestamp)

2. clubs table:
- id (uuid, primary key)
- name (text)
- description (text)
- council_id (uuid, foreign key to councils)
- logo_url (text, nullable)
- created_at (timestamp)

3. club_memberships table:
- id (uuid, primary key)
- club_id (uuid, foreign key to clubs)
- user_id (uuid, foreign key to users)
- role (enum: 'member', 'coordinator')
- joined_at (timestamp)
- Unique constraint on (club_id, user_id)

4. club_coordinators table (or use club_memberships with role='coordinator'):
- club_id (uuid)
- user_id (uuid)
- assigned_at (timestamp)

Add Row Level Security (RLS) policies:
- Everyone can read clubs and councils
- Only coordinators of a club can update it
- Only council heads can create clubs in their council

Create TypeScript types in types/database.ts for Council, Club, ClubMembership.
```

### Prompt 7: Club List Screen
```
Create clubs list screen at app/(tabs)/clubs.tsx:

Features:
- Fetch all clubs from Supabase grouped by council
- Display councils as sections with clubs as cards
- Each club card shows:
  - Club logo (or placeholder)
  - Club name
  - Short description (truncated)
  - Member count
  - "Join" button if not member, "Joined" badge if member
- Search bar at top to filter clubs
- Pull-to-refresh functionality
- Loading skeleton while fetching
- Empty state if no clubs

Use FlatList with sections (SectionList).
Style with theme colors.
Add navigation to club detail on card press.

Create API functions in lib/api/clubs.ts:
- getClubs()
- joinClub(clubId, userId)
- leaveClub(clubId, userId)
```

### Prompt 8: Club Detail Screen
```
Create club detail screen at app/club/[id].tsx (dynamic route):

Features:
- Display full club info:
  - Large club logo
  - Name and description
  - Council name
  - Coordinator names (with profile pics)
  - Member count
  - Join/Leave button
- Tabs:
  - Announcements (list of club announcements)
  - Events (list of club events)
  - Members (list with avatars and names)
- If user is coordinator:
  - Show "Post Announcement" button
  - Show "Create Event" button
  - Show "Manage Members" button

Fetch data using:
- getClubById(id)
- getClubMembers(id)
- getClubAnnouncements(id)

Style with dark theme.
Handle loading and error states.
```

---

## Phase 3: Announcements & Feed

### Prompt 9: Announcements Schema & API
```
Create database schema for announcements:

1. announcements table:
- id (uuid, primary key)
- club_id (uuid, foreign key to clubs, nullable if council-wide)
- council_id (uuid, foreign key to councils, nullable)
- author_id (uuid, foreign key to users)
- title (text)
- content (text)
- status (enum: 'pending', 'approved', 'rejected')
- approved_by (uuid, foreign key to users, nullable)
- approved_at (timestamp, nullable)
- created_at (timestamp)
- updated_at (timestamp)

2. announcement_views table (for read receipts):
- id (uuid, primary key)
- announcement_id (uuid, foreign key)
- user_id (uuid, foreign key)
- viewed_at (timestamp)

RLS policies:
- Students can read approved announcements
- Coordinators can create and read announcements for their clubs
- Council heads can approve announcements for their council
- Admins can approve any announcement

Create API functions in lib/api/announcements.ts:
- createAnnouncement(data)
- getAnnouncements(filters?)
- approveAnnouncement(id, approverId)
- rejectAnnouncement(id, reason)

Create types in types/database.ts for Announcement.
```

### Prompt 10: Announcement Feed Screen
```
Create announcement feed at app/(tabs)/index.tsx (home screen):

Features:
- Infinite scroll list of approved announcements
- Each announcement card shows:
  - Club/Council logo and name
  - Title (bold, large)
  - Content preview (3 lines, expandable)
  - Author name and timestamp ("2h ago" format)
  - Read/unread indicator
- Filter buttons at top:
  - All
  - My Clubs
  - By Council (Technical, Sports, etc.)
- Pull-to-refresh
- Loading indicators
- Empty state: "No announcements yet"

On tap, navigate to announcement detail screen.

Use date-fns for relative time formatting.
Mark announcement as read when viewed.
```

### Prompt 11: Create Announcement Screen (Coordinator)
```
Create announcement creation screen at app/announcement/create.tsx:

Only accessible by coordinators, council heads, and admins.

Features:
- Select club (dropdown of clubs user coordinates)
- Title input (required)
- Content input (multiline, rich text editor optional)
- "Post for Approval" button
- Draft save functionality
- Preview mode

On submit:
- Create announcement with status 'pending'
- Trigger notification to council head for approval
- Show success message
- Navigate back to feed

Validate required fields.
Handle errors.
Dark theme styling.
```

---

## Phase 4: Events Management

### Prompt 12: Events Schema & API
```
Create database schema for events:

1. events table:
- id (uuid, primary key)
- club_id (uuid, foreign key to clubs)
- title (text, required)
- description (text)
- date (timestamp, required)
- end_date (timestamp, nullable)
- venue (text, required)
- rsvp_limit (integer, nullable)
- status (enum: 'draft', 'pending_approval', 'approved', 'rejected', 'completed')
- created_by (uuid, foreign key to users)
- approved_by (uuid, nullable, foreign key to users)
- approved_at (timestamp, nullable)
- created_at (timestamp)
- updated_at (timestamp)

2. event_rsvps table:
- id (uuid, primary key)
- event_id (uuid, foreign key to events)
- user_id (uuid, foreign key to users)
- status (enum: 'going', 'maybe', 'not_going')
- rsvp_at (timestamp)
- Unique constraint on (event_id, user_id)

3. event_attendance table:
- id (uuid, primary key)
- event_id (uuid, foreign key to events)
- user_id (uuid, foreign key to users)
- checked_in_at (timestamp)
- checked_in_by (uuid, foreign key to users)

4. event_media table:
- id (uuid, primary key)
- event_id (uuid, foreign key to events)
- user_id (uuid, foreign key to users who uploaded)
- media_url (text)
- media_type (enum: 'image', 'video')
- uploaded_at (timestamp)

RLS policies similar to announcements.

Create API functions in lib/api/events.ts:
- createEvent(data)
- getEvents(filters?)
- approveEvent(id, approverId)
- rsvpEvent(eventId, userId, status)
- checkInAttendance(eventId, userId)
- uploadEventMedia(eventId, file)

Create TypeScript types for Event, RSVP, Attendance, EventMedia.
```

### Prompt 13: Events Feed Screen
```
Create events screen at app/(tabs)/events.tsx:

Features:
- List of approved upcoming events
- Each event card shows:
  - Event banner image (if available, else gradient)
  - Title
  - Date and time (formatted nicely)
  - Venue
  - Club name
  - RSVP count / limit
  - "RSVP" button with status (Going/Maybe/Not Going)
- Filter/sort options:
  - Upcoming / Past
  - By club
  - By date range
- Calendar view toggle (show events on calendar)
- Search events

On tap, navigate to event detail screen.

Use react-native-calendars for calendar view if toggled.
```

### Prompt 14: Event Detail & RSVP
```
Create event detail screen at app/event/[id].tsx:

Features:
- Full event information:
  - Banner image
  - Title and description
  - Date, time, venue
  - Club info
  - Coordinator contact
- RSVP section:
  - Going / Maybe / Not Going buttons
  - Show RSVP count
  - List of attendees (avatars)
- "Add to Calendar" button (using expo-calendar)
- For coordinators of this club:
  - "Edit Event" button
  - "Manage Attendance" button (QR code screen)
  - "Upload Photos" button
- Event media gallery (if event is past)

Implement:
- RSVP functionality with optimistic UI updates
- Calendar integration
- Share event (using expo-sharing)

Handle loading, errors, permissions.
```

### Prompt 15: QR Attendance Tracking
```
Create two screens for attendance:

1. app/event/[id]/attendance.tsx (Coordinator view):
- Generate unique QR code for event using react-native-qrcode-svg
- QR data format: yuhu://attendance/{eventId}/{timestamp}/{secret}
- Display QR code prominently
- Show list of checked-in attendees in real-time
- Manual check-in option (search and select user)
- Export attendance list as CSV

2. app/attendance/scan.tsx (Student view):
- Use expo-camera to scan QR code
- Parse QR data
- Call API to mark attendance
- Show success/error feedback
- Add haptic feedback on success (expo-haptics)

Create API endpoint for checking in attendance with validation:
- Event exists and is today
- User RSVP'd
- QR code is valid and recent (within 1 hour)

Add permission handling for camera.
```

---

## Phase 5: Dashboard

### Prompt 16: Personalized Dashboard
```
Enhance the home screen (app/(tabs)/index.tsx) to be a personalized dashboard:

Layout sections:
1. Welcome header with user name and profile pic
2. Quick stats cards:
   - Clubs joined count
   - Upcoming events count
   - Unread announcements count
3. Upcoming events (next 3, horizontal scroll)
4. Recent announcements feed (below)
5. Suggested clubs (if user in < 3 clubs)

Features:
- Pull-to-refresh
- Quick actions:
  - Floating action button for coordinators (post announcement, create event)
- Smooth scrolling with proper spacing

Fetch aggregated data:
- getUserDashboard(userId) API that returns all dashboard data in one call

Use skeleton loaders while fetching.
Optimize with React.memo and useMemo where appropriate.
```

---

## Phase 6: Messaging & Chat

### Prompt 17: End-to-End Encryption Setup
```
Implement E2E encryption for chat:

1. Create utils/encryption.ts with functions using @noble/curves and @noble/ciphers:
- generateKeyPair(): Generate secp256k1 key pair
- storePrivateKey(userId, key): Store in Expo SecureStore
- loadPrivateKey(userId): Retrieve from SecureStore
- storePublicKey(userId, key): Store in Supabase users table
- loadPublicKey(userId): Fetch from Supabase
- encryptMessage(text, senderPrivateKey, recipientPublicKey): Return {ciphertext, iv, authTag}
- decryptMessage(encrypted, recipientPrivateKey, senderPublicKey): Return plaintext

2. Create context/EncryptionContext.tsx:
- Initialize keys on app start
- Generate keys on first launch
- Provide encryption/decryption functions to app

3. Update users table schema:
- Add public_key field (text)

4. On user registration/first login:
- Generate key pair
- Store private key in SecureStore
- Upload public key to Supabase

5. Add key verification:
- generateKeyFingerprint(publicKey): Return readable hex for verification

Handle errors gracefully.
Add loading states.
```

### Prompt 18: Chat Database & Realtime
```
Create database schema for messaging:

1. chats table:
- id (uuid, primary key)
- type (enum: 'dm', 'group')
- name (text, nullable for DMs)
- participant_ids (array of uuid)
- created_at (timestamp)
- last_message_at (timestamp)

2. messages table:
- id (uuid, primary key)
- chat_id (uuid, foreign key to chats)
- sender_id (uuid, foreign key to users)
- ciphertext (text, encrypted message)
- iv (text, initialization vector)
- auth_tag (text, authentication tag)
- created_at (timestamp)

Enable Supabase Realtime for messages table:
```sql
alter publication supabase_realtime add table messages;
```

Create API functions in lib/api/chat.ts:
- getOrCreateDM(userId1, userId2): Get existing DM or create new
- getChats(userId): Get all chats for user
- sendMessage(chatId, senderId, encryptedData)
- getMessages(chatId, limit, offset)

Create hook hooks/useRealtimeMessages.ts:
- Subscribe to new messages for a chat
- Automatically decrypt incoming messages
- Return messages array

RLS policies:
- Users can only read chats they're participants in
- Users can only send messages in chats they're in
```

### Prompt 19: Chat List Screen
```
Create chat list screen at app/(tabs)/chats.tsx:

Features:
- List of all user's chats (DMs and groups)
- Each chat item shows:
  - Participant avatar(s)
  - Chat name (or other user's name for DM)
  - Last message preview (decrypted)
  - Timestamp ("2m ago")
  - Unread indicator (dot)
- Search bar to filter chats
- Pull-to-refresh
- Swipe actions:
  - Mute/Unmute
  - Delete (with confirmation)

On tap, navigate to chat screen with chat ID.

Fetch chats ordered by last_message_at descending.
Optimize with virtualized list (FlashList if needed).
```

### Prompt 20: Chat Screen
```
Create chat screen at app/chat/[id].tsx:

Features:
- Messages list (inverted FlatList, latest at bottom)
- Each message bubble shows:
  - Avatar (for others' messages)
  - Message text (decrypted)
  - Timestamp
  - Delivered/read status (optional)
- Message input at bottom:
  - Text input
  - Send button
  - Media attach button (future)
- Auto-scroll to bottom on new message
- Load more messages on scroll to top (pagination)

Use useRealtimeMessages hook for real-time updates.

On send:
1. Encrypt message with recipient's public key
2. Send to Supabase
3. Optimistically add to UI
4. Send push notification to recipient

Handle:
- Keyboard avoiding view
- Message grouping by sender and time
- Copy message on long press

Dark theme styling with purple accents for own messages.
```

---

## Phase 7: Admin Dashboard

### Prompt 21: Admin Analytics Dashboard
```
Create admin dashboard at app/admin/index.tsx:

Only accessible if user role is 'admin'.

Features:
- Stats cards:
  - Total users
  - Active users (last 7 days)
  - Total clubs
  - Total events (upcoming)
  - Total announcements (pending approval)
- Charts:
  - User registrations over time (line chart)
  - Club memberships by council (pie chart)
  - Event attendance rates (bar chart)
- Recent activity feed:
  - New registrations
  - Pending approvals
  - Recent events
- Quick actions:
  - Approve pending announcements
  - Approve pending events
  - Manage users

Use victory-native or react-native-chart-kit for charts.

Create API endpoints for analytics:
- getAdminStats()
- getUserGrowth(days)
- getClubDistribution()
- getRecentActivity(limit)

Implement proper RBAC checks.
```

### Prompt 22: User Management (Admin)
```
Create user management screen at app/admin/users.tsx:

Features:
- Searchable list of all users
- Each user row shows:
  - Avatar
  - Name, email
  - Course, year
  - Role badge
  - Status (active/suspended)
- Actions menu:
  - View profile
  - Change role (dropdown: student, coordinator, council_head, admin)
  - Suspend/Unsuspend account
  - Delete user (with confirmation)
- Filters:
  - By role
  - By course
  - Active/Suspended

API functions:
- getAllUsers(filters, search)
- updateUserRole(userId, newRole)
- suspendUser(userId, reason)
- deleteUser(userId)

Add audit logging for all admin actions.
```

---

## Phase 8: Notifications

### Prompt 23: Push Notifications Setup
```
Set up push notifications throughout the app:

1. Install and configure expo-notifications:
```bash
npx expo install expo-notifications expo-device expo-constants
```

2. Create utils/notifications.ts:
- registerForPushNotificationsAsync(): Get Expo push token, store in Supabase
- sendPushNotification(userIds, title, body, data): Call Expo Push API

3. Create Supabase Edge Function at supabase/functions/send-notification/index.ts:
- Fetch push tokens for user IDs
- Call Expo Push API
- Handle batching for multiple users

4. Integrate notification triggers:
- On announcement approved: Notify all club members
- On event approved: Notify all club members
- On new message: Notify recipient
- 24h before event: Notify RSVPed users
- 1h before event: Notify RSVPed users

5. Create notifications screen at app/(tabs)/notifications.tsx:
- List all notifications
- Mark as read
- Navigate to relevant screen on tap

6. Handle deep linking:
- Configure app.json for deep links
- Parse notification data to navigate to correct screen

7. Add notification permissions request on first launch.

Test on real device (not simulator).
```

---

## Phase 9: Polish & Optimization

### Prompt 24: Performance Optimization
```
Optimize YUHU app performance:

1. Implement code splitting:
- Use React.lazy for heavy screens
- Add Suspense with loading fallbacks

2. Optimize images:
- Use expo-image instead of Image
- Implement proper caching
- Use appropriate image sizes (no loading full-res unnecessarily)

3. Implement pagination:
- Announcements feed
- Events list
- Chat messages
- Use limit/offset or cursor-based pagination

4. Add caching:
- Use React Query or SWR for data fetching with caching
- Cache user profiles, clubs data

5. Reduce re-renders:
- Add React.memo to components
- Use useMemo and useCallback appropriately
- Optimize FlatList with proper keyExtractor and shouldComponentUpdate

6. Bundle size optimization:
- Analyze bundle with expo-dev-client
- Remove unused dependencies
- Use dynamic imports for large libraries

7. Add loading skeletons everywhere instead of spinners

8. Implement proper error boundaries

Run Expo performance profiler and fix any bottlenecks.
```

### Prompt 25: Accessibility & Final Polish
```
Ensure YUHU is accessible and polished:

1. Accessibility:
- Add accessibilityLabel to all interactive elements
- Set accessibilityRole correctly (button, link, header, etc.)
- Add accessibilityHint where helpful
- Ensure color contrast meets WCAG AA (4.5:1 for text)
- Test with screen reader (TalkBack on Android, VoiceOver on iOS)
- Minimum touch target size 44x44 points

2. Animations:
- Add smooth transitions between screens
- Animate list item entrance (stagger)
- Add micro-interactions (button press, switch toggle)
- Use react-native-reanimated for complex animations

3. Haptic feedback:
- Add haptics on button press, success, error using expo-haptics

4. Onboarding:
- Create welcome screens for first-time users
- Explain key features
- Request permissions with context

5. Empty states:
- Add illustrations or icons for empty lists
- Provide helpful CTAs

6. Error handling:
- User-friendly error messages
- Retry buttons
- Offline mode indicators

7. Pull-to-refresh everywhere applicable

8. Dark mode refinement:
- Ensure all screens look perfect in dark theme
- Consistent spacing and shadows

9. Test on multiple devices and screen sizes

10. Final bug bash - fix all known issues
```

---

## Phase 10: Deployment

### Prompt 26: Prepare for Production
```
Prepare YUHU for production deployment:

1. Environment setup:
- Create .env.production with production Supabase URL and keys
- Set up Sentry for error tracking
- Configure analytics (Expo Analytics or PostHog)

2. Update app.json:
- Set correct version number
- Add privacy policy URL
- Add terms of service URL
- Configure app icon and splash screen properly
- Set Android permissions correctly
- Set iOS capabilities

3. Build configuration:
- Set up EAS Build
- Create eas.json with production build profile
- Configure app signing for iOS and Android

4. Testing:
- Run full regression test suite
- Test on multiple physical devices (iOS and Android)
- Test in production environment with real Supabase
- Load testing for concurrent users

5. Create privacy policy and terms of service documents

6. Set up monitoring:
- Sentry for crash reports
- Supabase monitoring for database performance
- Analytics dashboard

7. Documentation:
- User guide
- Admin guide
- Developer documentation
- API documentation
```

### Prompt 27: Submit to App Stores
```
Guide me through submitting YUHU to Apple App Store and Google Play Store:

1. Apple App Store:
- Create App Store Connect account
- Generate app-specific certificates and provisioning profiles via EAS
- Create app listing with:
  - App name: YUHU
  - Description (compelling, keyword-optimized)
  - Screenshots (5-8 per device size)
  - App icon (1024x1024)
  - Privacy details
  - App category: Social Networking
- Build production IPA using EAS Build
- Upload with Transporter or eas submit
- Submit for review

2. Google Play Store:
- Create Google Play Console account
- Create app listing similar to iOS
- Set up age ratings, privacy policy
- Build production AAB using EAS Build
- Upload to internal testing first, then production
- Submit for review

3. Prepare marketing assets:
- App preview videos
- Feature graphics
- Promotional text

4. Launch plan:
- Soft launch to beta testers
- Monitor for issues
- Full launch announcement
- Marketing push (social media, campus posters)

Provide step-by-step checklist for both stores.
```

---

## Additional Helpful Prompts

### Prompt: Debug Supabase Connection
```
I'm having issues connecting to Supabase. Help me debug:
1. Check lib/supabase.ts configuration
2. Verify environment variables are loaded correctly
3. Test connection with a simple query
4. Check RLS policies aren't blocking queries
5. Verify API keys are correct in Supabase dashboard
```

### Prompt: Fix TypeScript Errors
```
I have TypeScript errors in [filename]. Help me:
1. Identify the type mismatches
2. Create proper interfaces/types
3. Add correct type annotations
4. Fix any 'any' types with proper types
```

### Prompt: Optimize Slow Screen
```
The [screen name] is slow to load. Help me optimize:
1. Profile the component renders
2. Identify unnecessary re-renders
3. Add memoization where appropriate
4. Implement proper pagination
5. Add loading skeletons
6. Optimize database queries
```

---

**End of Cursor Prompts Document**

Use these prompts sequentially, one at a time, in Cursor to build YUHU step-by-step. Each prompt is designed to be comprehensive and actionable.
