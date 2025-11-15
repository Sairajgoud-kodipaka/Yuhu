import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

const DEMO_CHATS: Record<string, ChatUser> = {
  '1': { id: '1', name: 'Priya Singh', avatar: '👤', isOnline: true },
  '2': { id: '2', name: 'Ayush Kumar', avatar: '👤', isOnline: false },
  '3': { id: '3', name: 'Coding Club', avatar: '💻', isOnline: false },
  '4': { id: '4', name: 'Rohan Mehta', avatar: '👤', isOnline: false },
};

const DEMO_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      text: 'Hey, did you register for the hackathon?',
      senderId: 'other',
      senderName: 'Priya Singh',
      timestamp: '10:30 AM',
      status: 'read',
    },
    {
      id: '2',
      text: 'Yes! I\'m excited. Are you forming a team?',
      senderId: 'me',
      senderName: 'Me',
      timestamp: '10:32 AM',
      status: 'read',
    },
    {
      id: '3',
      text: 'Not yet, want to team up?',
      senderId: 'other',
      senderName: 'Priya Singh',
      timestamp: '10:33 AM',
      status: 'read',
    },
    {
      id: '4',
      text: 'Absolutely! 🎉',
      senderId: 'me',
      senderName: 'Me',
      timestamp: '10:34 AM',
      status: 'read',
    },
  ],
};

export default function ChatDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthStore();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const chat = DEMO_CHATS[params.id];
    const chatMessages = DEMO_MESSAGES[params.id] || [];
    setChatUser(chat || null);
    setMessages(chatMessages);
  }, [params.id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  if (!chatUser) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat Not Found</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>
    );
  }

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        senderId: 'me',
        senderName: 'Me',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        status: 'sent',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleProfilePress = () => {
    router.push({
      pathname: '/(tabs)/profile',
      params: { userId: chatUser.id },
    });
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Ionicons name="checkmark" size={14} color={colors.textMuted} />;
      case 'delivered':
        return <Ionicons name="checkmark" size={14} color={colors.textMuted} />;
      case 'read':
        return <Ionicons name="checkmark-done" size={14} color={colors.primary} />;
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userInfo} onPress={handleProfilePress}>
          <Text style={styles.avatarText}>{chatUser.avatar}</Text>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{chatUser.name}</Text>
            {chatUser.isOnline && (
              <Text style={styles.onlineStatus}>Online</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            // Menu options: View Profile, Block, Delete Chat
          }}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Encrypted Indicator */}
      <View style={styles.encryptedIndicator}>
        <Ionicons name="lock-closed" size={12} color={colors.textMuted} />
        <Text style={styles.encryptedText}>End-to-end encrypted</Text>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          return (
            <View
              key={msg.id}
              style={[
                styles.messageContainer,
                isMe ? styles.messageContainerRight : styles.messageContainerLeft,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  isMe ? styles.messageBubbleMe : styles.messageBubbleOther,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isMe ? styles.messageTextMe : styles.messageTextOther,
                  ]}
                >
                  {msg.text}
                </Text>
                <View style={styles.messageFooter}>
                  <Text
                    style={[
                      styles.messageTime,
                      isMe ? styles.messageTimeMe : styles.messageTimeOther,
                    ]}
                  >
                    {msg.timestamp}
                  </Text>
                  {isMe && (
                    <View style={styles.statusIcon}>
                      {getStatusIcon(msg.status)}
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={colors.textMuted}
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => {
            // Voice message functionality
          }}
        >
          <Ionicons name="mic-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
        {message.trim() && (
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.sm,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    gap: spacing.sm,
  },
  avatarText: {
    fontSize: 32,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  onlineStatus: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Inter',
    color: colors.success,
  },
  menuButton: {
    padding: spacing.sm,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  encryptedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    gap: spacing.xs,
    backgroundColor: colors.surface,
  },
  encryptedText: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Inter',
    color: colors.textMuted,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  messageContainer: {
    marginBottom: spacing.md,
    maxWidth: '80%',
  },
  messageContainerLeft: {
    alignItems: 'flex-start',
  },
  messageContainerRight: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  messageBubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    maxWidth: '100%',
  },
  messageBubbleMe: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: borderRadius.xs,
  },
  messageBubbleOther: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: borderRadius.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    lineHeight: typography.fontSize.md * 1.4,
  },
  messageTextMe: {
    color: colors.textPrimary,
  },
  messageTextOther: {
    color: colors.textPrimary,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  messageTime: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Inter',
  },
  messageTimeMe: {
    color: colors.textPrimary,
    opacity: 0.8,
  },
  messageTimeOther: {
    color: colors.textMuted,
  },
  statusIcon: {
    marginLeft: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    gap: spacing.sm,
  },
  attachButton: {
    padding: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textPrimary,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  voiceButton: {
    padding: spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

