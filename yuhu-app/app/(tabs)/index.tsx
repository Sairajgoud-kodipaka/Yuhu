import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YuhuLogo } from '../../components/YuhuLogo';
import { colors, spacing, typography } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';
import { Navbar } from '../../components/Navbar';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [navbarVisible, setNavbarVisible] = useState(false);
  const isAdmin = user?.role === 'admin';

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi {user?.name || 'Student'}!</Text>
            <Text style={styles.subtitle}>Welcome to Yuhu</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setNavbarVisible(true)}
            >
              <Ionicons name="menu" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Clubs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Events</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Unread</Text>
        </View>
      </View>

      {/* Upcoming Events */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.eventCard}>
          <View style={styles.eventIcon}>
            <Ionicons name="calendar-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>Tech Talk by Alumni</Text>
            <View style={styles.eventMeta}>
              <Ionicons name="location-outline" size={14} color={colors.textMuted} />
              <Text style={styles.eventMetaText}>Auditorium</Text>
              <Text style={styles.eventMetaText}>•</Text>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text style={styles.eventMetaText}>2 PM</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Recent Announcements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Announcements</Text>
        </View>
        
        <TouchableOpacity style={styles.announcementCard}>
          <View style={styles.announcementHeader}>
            <View style={styles.clubBadge}>
              <Ionicons name="code-slash-outline" size={16} color={colors.primary} />
              <Text style={styles.clubName}>Coding Club</Text>
              <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
            </View>
            <Text style={styles.timeAgo}>2h ago</Text>
          </View>
          <Text style={styles.announcementTitle}>Hackathon Registration Open</Text>
          <Text style={styles.announcementPreview}>
            Registration for the annual hackathon is now open. Sign up before...
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.announcementCard}>
          <View style={styles.announcementHeader}>
            <View style={styles.clubBadge}>
              <Ionicons name="football-outline" size={16} color={colors.success} />
              <Text style={styles.clubName}>Sports Club</Text>
              <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
            </View>
            <Text style={styles.timeAgo}>5h ago</Text>
          </View>
          <Text style={styles.announcementTitle}>Football Tournament Next Week</Text>
          <Text style={styles.announcementPreview}>
            The inter-department football tournament will begin next week. All teams...
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
    <Navbar visible={navbarVisible} onClose={() => setNavbarVisible(false)} />
    </>
  );
}

function AdminDashboard() {
  const { user } = useAuthStore();
  const [navbarVisible, setNavbarVisible] = useState(false);

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Admin Dashboard</Text>
            <Text style={styles.subtitle}>Welcome back, {user?.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setNavbarVisible(true)}
            >
              <Ionicons name="menu" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3,847</Text>
              <Text style={styles.statLabel}>Total Users</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>245</Text>
              <Text style={styles.statLabel}>Active Today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Clubs</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
          </View>
        </View>

        {/* Pending Approvals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Approvals (5)</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.approvalCard}>
            <View style={styles.approvalHeader}>
              <Ionicons name="megaphone-outline" size={20} color={colors.primary} />
              <Text style={styles.approvalTitle}>Workshop Announcement</Text>
            </View>
            <Text style={styles.approvalSubtext}>By: Coding Club • 2h ago</Text>
            <View style={styles.approvalActions}>
              <TouchableOpacity style={styles.approveButton}>
                <Text style={styles.approveButtonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectButton}>
                <Text style={styles.rejectButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.approvalCard}>
            <View style={styles.approvalHeader}>
              <Ionicons name="calendar-outline" size={20} color={colors.info} />
              <Text style={styles.approvalTitle}>Hackathon Event</Text>
            </View>
            <Text style={styles.approvalSubtext}>By: Tech Council • 5h ago</Text>
            <View style={styles.approvalActions}>
              <TouchableOpacity style={styles.approveButton}>
                <Text style={styles.approveButtonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectButton}>
                <Text style={styles.rejectButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="people-outline" size={24} color={colors.primary} />
              <Text style={styles.actionLabel}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="document-text-outline" size={24} color={colors.primary} />
              <Text style={styles.actionLabel}>View Logs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="stats-chart-outline" size={24} color={colors.primary} />
              <Text style={styles.actionLabel}>Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="settings-outline" size={24} color={colors.primary} />
              <Text style={styles.actionLabel}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuButton: {
    padding: spacing.xs,
  },
  greeting: {
    fontSize: typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textSecondary,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
  },
  seeAll: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.primary,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
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
  announcementCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  clubBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  clubName: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  timeAgo: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Inter',
    color: colors.textMuted,
  },
  announcementTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  announcementPreview: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  approvalCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  approvalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  approvalTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  approvalSubtext: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  approvalActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  approveButton: {
    flex: 1,
    backgroundColor: colors.success,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  approveButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
