import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';

interface CheckIn {
  id: string;
  name: string;
  timestamp: string;
}

const DEMO_EVENTS: Record<string, { name: string; date: string; time: string }> = {
  '1': { name: 'Annual Tech Fest 2025', date: 'March 15, 2025', time: '10:00 AM - 6:00 PM' },
  '2': { name: 'Tech Talk by Alumni', date: 'Today', time: '2:00 PM' },
};

const DEMO_CHECK_INS: CheckIn[] = [
  { id: '1', name: 'Raj Kumar', timestamp: '2:05 PM' },
  { id: '2', name: 'Priya Singh', timestamp: '2:04 PM' },
  { id: '3', name: 'Ayush Kumar', timestamp: '2:03 PM' },
  { id: '4', name: 'Anjali Patel', timestamp: '2:02 PM' },
  { id: '5', name: 'Rohan Mehta', timestamp: '2:01 PM' },
];

export default function QRAttendanceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ eventId: string }>();
  const { user } = useAuthStore();
  const [event, setEvent] = useState<{ name: string; date: string; time: string } | null>(null);
  const [checkedInCount, setCheckedInCount] = useState(45);
  const [totalLimit] = useState(80);
  const [checkIns, setCheckIns] = useState<CheckIn[]>(DEMO_CHECK_INS);

  useEffect(() => {
    const foundEvent = DEMO_EVENTS[params.eventId || '2'];
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [params.eventId]);

  if (!event) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Event Not Found</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>
    );
  }

  const handleManualCheckIn = () => {
    Alert.prompt(
      'Manual Check-in',
      'Enter student name or ID',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Check In',
          onPress: (name) => {
            if (name && name.trim()) {
              const newCheckIn: CheckIn = {
                id: Date.now().toString(),
                name: name.trim(),
                timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
              };
              setCheckIns([newCheckIn, ...checkIns]);
              setCheckedInCount(prev => prev + 1);
              Alert.alert('Success', `${name} has been checked in`);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handleUserPress = (userId: string) => {
    router.push({
      pathname: '/(tabs)/profile',
      params: { userId },
    });
  };

  const renderCheckInItem = ({ item }: { item: CheckIn }) => (
    <TouchableOpacity
      style={styles.checkInItem}
      onPress={() => handleUserPress(item.id)}
    >
      <Ionicons name="checkmark-circle" size={20} color={colors.success} />
      <Text style={styles.checkInName}>{item.name}</Text>
      <Text style={styles.checkInTime}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  // Generate QR code placeholder (ASCII art representation)
  const QRCodePlaceholder = () => (
    <View style={styles.qrContainer}>
      <View style={styles.qrCode}>
        <Text style={styles.qrText}>
          {'▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄'}{'\n'}
          {'█ ▄▄▄ █▀█ █ ▄▄▄ █'}{'\n'}
          {'█ ███ █▄▀ █ ███ █'}{'\n'}
          {'█▄▄▄▄▄█ ▀▄█▄▄▄▄▄█'}{'\n'}
          {'▄ ▄▄  ▄ ▄▀▄▄ ▄ ▄▄'}{'\n'}
          {'█▄██▀▀▀▄▄█ █▀▄▄▄▀'}{'\n'}
          {'▄▄▄▄▄▄▄ ▀▀█▄▀ ▄ █'}{'\n'}
          {'█ ▄▄▄ █ ▄▄█▄█▀▄▀▄'}{'\n'}
          {'█ ███ █ █▄ █ ▄▀▄ ▀'}{'\n'}
          {'█▄▄▄▄▄█ █▀▀█▀▄▄▀▄'}{'\n'}
          {'▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Event Attendance</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Event Info */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{event.name}</Text>
          <View style={styles.eventMeta}>
            <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
            <Text style={styles.eventMetaText}>{event.date}, {event.time}</Text>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <Text style={styles.qrTitle}>Scan QR to Mark Attendance</Text>
          <QRCodePlaceholder />
        </View>

        {/* Attendance Counter */}
        <View style={styles.counterSection}>
          <Ionicons name="people-outline" size={20} color={colors.textPrimary} />
          <Text style={styles.counterText}>Checked In: {checkedInCount} / {totalLimit}</Text>
        </View>

        {/* Manual Check-in Button */}
        <TouchableOpacity style={styles.manualButton} onPress={handleManualCheckIn}>
          <Ionicons name="person-add-outline" size={20} color={colors.primary} />
          <Text style={styles.manualButtonText}>Manual Check-in</Text>
        </TouchableOpacity>

        {/* Recent Check-ins */}
        <View style={styles.checkInsSection}>
          <Text style={styles.sectionTitle}>Recent Check-ins</Text>
          <FlatList
            data={checkIns}
            renderItem={renderCheckInItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
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
  headerTitle: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginHorizontal: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  eventInfo: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  eventName: {
    fontSize: typography.fontSize.xl,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  eventMetaText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textMuted,
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  qrTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  qrContainer: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  qrCode: {
    backgroundColor: colors.textPrimary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrText: {
    fontSize: 8,
    fontFamily: 'monospace',
    color: colors.background,
    lineHeight: 10,
    textAlign: 'center',
  },
  counterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
  },
  counterText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  manualButtonText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
  },
  checkInsSection: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  checkInItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkInName: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textPrimary,
  },
  checkInTime: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textMuted,
  },
});

