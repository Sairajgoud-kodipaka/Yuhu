import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';

interface Event {
  id: string;
  title: string;
  clubName: string;
  clubIcon: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rsvpCount: number;
  rsvpLimit: number;
  bannerImage?: string;
  isPast: boolean;
}

type RSVPStatus = 'going' | 'maybe' | 'not-going' | null;

const DEMO_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Fest 2025',
    clubName: 'Coding Club',
    clubIcon: '💻',
    date: 'March 15, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Main Auditorium',
    description: 'Join us for our biggest tech event of the year featuring workshops, coding competitions, and tech talks from industry experts. Don\'t miss out on this opportunity to learn, network, and showcase your skills.',
    rsvpCount: 150,
    rsvpLimit: 200,
    isPast: false,
  },
  {
    id: '2',
    title: 'Tech Talk by Alumni',
    clubName: 'Coding Club',
    clubIcon: '💻',
    date: 'Today',
    time: '2:00 PM',
    location: 'Auditorium',
    description: 'An inspiring talk by our alumni about their journey in tech and industry insights.',
    rsvpCount: 80,
    rsvpLimit: 100,
    isPast: false,
  },
];

const DEMO_ATTENDEES = [
  { id: '1', name: 'Raj Kumar', avatar: '👤' },
  { id: '2', name: 'Priya Singh', avatar: '👤' },
  { id: '3', name: 'Ayush Kumar', avatar: '👤' },
  { id: '4', name: 'Anjali Patel', avatar: '👤' },
  { id: '5', name: 'Rohan Mehta', avatar: '👤' },
];

export default function EventDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthStore();
  const [event, setEvent] = useState<Event | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>(null);
  const [rsvpCount, setRsvpCount] = useState(0);

  React.useEffect(() => {
    const foundEvent = DEMO_EVENTS.find(e => e.id === params.id);
    if (foundEvent) {
      setEvent(foundEvent);
      setRsvpCount(foundEvent.rsvpCount);
    }
  }, [params.id]);

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

  const isCoordinator = user?.role === 'coordinator' || user?.role === 'admin';

  const handleRSVP = (status: RSVPStatus) => {
    if (status === rsvpStatus) {
      setRsvpStatus(null);
      setRsvpCount(prev => Math.max(0, prev - 1));
    } else {
      if (rsvpStatus) {
        // Already had a status, just change it
      } else {
        // New RSVP
        setRsvpCount(prev => Math.min(event.rsvpLimit, prev + 1));
      }
      setRsvpStatus(status);
    }
    Alert.alert(
      'RSVP Updated',
      status === 'going' ? 'You\'re going to this event!' :
      status === 'maybe' ? 'You marked as maybe' :
      'You marked as not going'
    );
  };

  const handleAddToCalendar = () => {
    Alert.alert('Add to Calendar', 'Calendar integration coming soon');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${event.title} by ${event.clubName} on ${event.date} at ${event.time}. ${event.location}`,
        title: event.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleManageAttendance = () => {
    router.push({
      pathname: '/(tabs)/qr-attendance',
      params: { eventId: event.id },
    });
  };

  const handleAttendeePress = (attendeeId: string) => {
    router.push({
      pathname: '/(tabs)/profile',
      params: { userId: attendeeId },
    });
  };

  const handleClubPress = () => {
    router.push({
      pathname: '/(tabs)/club-detail',
      params: { id: '1' },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Event Details</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            if (isCoordinator) {
              Alert.alert(
                'Event Options',
                '',
                [
                  { text: 'Manage Attendance', onPress: handleManageAttendance },
                  { text: 'Share', onPress: handleShare },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            } else {
              handleShare();
            }
          }}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <Text style={styles.bannerPlaceholder}>Event Banner Image</Text>
          </View>
        </View>

        {/* Event Info */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          
          <TouchableOpacity style={styles.clubInfo} onPress={handleClubPress}>
            <Text style={styles.clubIcon}>{event.clubIcon}</Text>
            <Text style={styles.clubName}>{event.clubName}</Text>
          </TouchableOpacity>

          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={18} color={colors.textMuted} />
              <Text style={styles.metaText}>{event.date}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={18} color={colors.textMuted} />
              <Text style={styles.metaText}>{event.time}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={18} color={colors.textMuted} />
              <Text style={styles.metaText}>{event.location}</Text>
            </View>
          </View>

          {/* RSVP Section */}
          <View style={styles.rsvpSection}>
            <View style={styles.rsvpHeader}>
              <Ionicons name="people-outline" size={18} color={colors.textPrimary} />
              <Text style={styles.rsvpText}>RSVP: {rsvpCount} / {event.rsvpLimit}</Text>
            </View>
            <View style={styles.rsvpButtons}>
              <TouchableOpacity
                style={[
                  styles.rsvpButton,
                  rsvpStatus === 'going' && styles.rsvpButtonActive,
                ]}
                onPress={() => handleRSVP('going')}
              >
                <Text
                  style={[
                    styles.rsvpButtonText,
                    rsvpStatus === 'going' && styles.rsvpButtonTextActive,
                  ]}
                >
                  Going
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.rsvpButton,
                  rsvpStatus === 'maybe' && styles.rsvpButtonActive,
                ]}
                onPress={() => handleRSVP('maybe')}
              >
                <Text
                  style={[
                    styles.rsvpButtonText,
                    rsvpStatus === 'maybe' && styles.rsvpButtonTextActive,
                  ]}
                >
                  Maybe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.rsvpButton,
                  rsvpStatus === 'not-going' && styles.rsvpButtonActive,
                ]}
                onPress={() => handleRSVP('not-going')}
              >
                <Text
                  style={[
                    styles.rsvpButtonText,
                    rsvpStatus === 'not-going' && styles.rsvpButtonTextActive,
                  ]}
                >
                  Not Going
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Calendar */}
          <TouchableOpacity style={styles.calendarButton} onPress={handleAddToCalendar}>
            <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            <Text style={styles.calendarButtonText}>Add to Calendar</Text>
          </TouchableOpacity>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Description</Text>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>

          {/* Attendees */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👥 Attendees</Text>
            <View style={styles.attendeesGrid}>
              {DEMO_ATTENDEES.map((attendee) => (
                <TouchableOpacity
                  key={attendee.id}
                  style={styles.attendeeAvatar}
                  onPress={() => handleAttendeePress(attendee.id)}
                >
                  <Text style={styles.attendeeAvatarText}>{attendee.avatar}</Text>
                </TouchableOpacity>
              ))}
              {rsvpCount > DEMO_ATTENDEES.length && (
                <View style={styles.attendeeAvatar}>
                  <Text style={styles.attendeeMoreText}>+{rsvpCount - DEMO_ATTENDEES.length}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Event Photos (if past event) */}
          {event.isPast && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📸 Event Photos</Text>
              <View style={styles.photosGrid}>
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="image-outline" size={32} color={colors.textMuted} />
                </View>
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="image-outline" size={32} color={colors.textMuted} />
                </View>
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="image-outline" size={32} color={colors.textMuted} />
                </View>
              </View>
            </View>
          )}
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
  menuButton: {
    padding: spacing.sm,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  bannerContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  banner: {
    height: 200,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  bannerPlaceholder: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textMuted,
  },
  eventInfo: {
    paddingHorizontal: spacing.lg,
  },
  eventTitle: {
    fontSize: typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  clubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  clubIcon: {
    fontSize: 24,
  },
  clubName: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  eventMeta: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textSecondary,
  },
  rsvpSection: {
    marginBottom: spacing.lg,
  },
  rsvpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  rsvpText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  rsvpButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  rsvpButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  rsvpButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rsvpButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  rsvpButtonTextActive: {
    color: colors.textPrimary,
  },
  calendarButton: {
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
  calendarButtonText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  descriptionText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    lineHeight: typography.fontSize.md * 1.5,
  },
  attendeesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  attendeeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendeeAvatarText: {
    fontSize: 24,
  },
  attendeeMoreText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.textMuted,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

