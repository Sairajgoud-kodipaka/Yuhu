import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';
import { Navbar } from '../../components/Navbar';

interface Event {
  id: string;
  title: string;
  clubName: string;
  clubIcon: string;
  date: string;
  time: string;
  location: string;
  rsvpCount: number;
  rsvpLimit: number;
}

const DEMO_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Fest 2025',
    clubName: 'Coding Club',
    clubIcon: '💻',
    date: 'March 15, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Main Auditorium',
    rsvpCount: 150,
    rsvpLimit: 200,
  },
  {
    id: '2',
    title: 'Tech Talk by Alumni',
    clubName: 'Coding Club',
    clubIcon: '💻',
    date: 'Today',
    time: '2:00 PM',
    location: 'Auditorium',
    rsvpCount: 80,
    rsvpLimit: 100,
  },
  {
    id: '3',
    title: 'Robotics Workshop',
    clubName: 'Robotics Club',
    clubIcon: '🤖',
    date: 'Tomorrow',
    time: '10:00 AM',
    location: 'Lab 101',
    rsvpCount: 45,
    rsvpLimit: 60,
  },
];

export default function EventsScreen() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [navbarVisible, setNavbarVisible] = useState(false);

  const handleEventPress = (eventId: string) => {
    router.push({
      pathname: '/(tabs)/event-detail',
      params: { id: eventId },
    });
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => handleEventPress(item.id)}
    >
      <View style={styles.eventHeader}>
        <Text style={styles.clubIcon}>{item.clubIcon}</Text>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.clubName}>{item.clubName}</Text>
        </View>
      </View>
      <View style={styles.eventMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>{item.date}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>{item.time}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText} numberOfLines={1}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.rsvpInfo}>
        <Ionicons name="people-outline" size={14} color={colors.textMuted} />
        <Text style={styles.rsvpText}>{item.rsvpCount} / {item.rsvpLimit} RSVPed</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Events</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setNavbarVisible(true)}
            >
              <Ionicons name="menu" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {DEMO_EVENTS.length > 0 ? (
          <FlatList
            data={DEMO_EVENTS}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color={colors.textMuted} />
              <Text style={styles.emptyStateText}>No events yet</Text>
              <Text style={styles.emptyStateSubtext}>Check back later for upcoming events</Text>
            </View>
          </ScrollView>
        )}
      </View>
      <Navbar visible={navbarVisible} onClose={() => setNavbarVisible(false)} />
    </>
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
  },
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  eventCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  clubIcon: {
    fontSize: 32,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  clubName: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textSecondary,
  },
  eventMeta: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textMuted,
    flex: 1,
  },
  rsvpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  rsvpText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textMuted,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl * 2,
  },
  emptyStateText: {
    fontSize: typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginTop: spacing.lg,
  },
  emptyStateSubtext: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});

