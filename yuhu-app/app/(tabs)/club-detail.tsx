import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface Club {
  id: string;
  name: string;
  description: string;
  icon: string;
  council: string;
  members: number;
  joined: boolean;
}

interface Coordinator {
  name: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  timeAgo: string;
}

const DEMO_CLUBS: Club[] = [
  {
    id: '1',
    name: 'Coding Club',
    description: 'Learn and build together',
    icon: '💻',
    council: 'TECHNICAL COUNCIL',
    members: 245,
    joined: true,
  },
  {
    id: '2',
    name: 'Robotics Club',
    description: 'Build the future',
    icon: '🤖',
    council: 'TECHNICAL COUNCIL',
    members: 180,
    joined: false,
  },
  {
    id: '3',
    name: 'Basketball Club',
    description: 'Shoot for the stars',
    icon: '🏀',
    council: 'SPORTS COUNCIL',
    members: 120,
    joined: false,
  },
  {
    id: '4',
    name: 'Football Club',
    description: 'Champions on the field',
    icon: '⚽',
    council: 'SPORTS COUNCIL',
    members: 95,
    joined: true,
  },
  {
    id: '5',
    name: 'Music Club',
    description: 'Harmony and rhythm',
    icon: '🎵',
    council: 'CULTURAL COUNCIL',
    members: 150,
    joined: false,
  },
  {
    id: '6',
    name: 'Drama Club',
    description: 'Express yourself on stage',
    icon: '🎭',
    council: 'CULTURAL COUNCIL',
    members: 80,
    joined: false,
  },
];

const COORDINATORS: Record<string, Coordinator[]> = {
  '1': [{ name: 'Ayush Kumar' }, { name: 'Priya Singh' }],
  '2': [{ name: 'Rohan Mehta' }, { name: 'Anjali Patel' }],
  '3': [{ name: 'Vikram Singh' }, { name: 'Neha Sharma' }],
  '4': [{ name: 'Arjun Reddy' }, { name: 'Sneha Das' }],
  '5': [{ name: 'Kavya Nair' }, { name: 'Rahul Joshi' }],
  '6': [{ name: 'Meera Iyer' }, { name: 'Aditya Menon' }],
};

const ANNOUNCEMENTS: Record<string, Announcement[]> = {
  '1': [
    { id: '1', title: 'Hackathon Registration Open', content: 'Join us for 48-hour coding challenge...', timeAgo: '2 hours ago' },
  ],
  '2': [
    { id: '2', title: 'Robotics Workshop Next Week', content: 'Learn Arduino and sensors...', timeAgo: '1 day ago' },
  ],
  '3': [
    { id: '3', title: 'Tournament This Weekend', content: 'Register your team now...', timeAgo: '3 hours ago' },
  ],
  '4': [
    { id: '4', title: 'Match Schedule Released', content: 'Check your fixture dates...', timeAgo: '5 hours ago' },
  ],
  '5': [
    { id: '5', title: 'Open Mic Night Coming Soon', content: 'Sign up to perform...', timeAgo: '1 day ago' },
  ],
  '6': [
    { id: '6', title: 'Auditions for Spring Play', content: 'Tryouts next Monday...', timeAgo: '4 hours ago' },
  ],
};

type TabType = 'announcements' | 'events' | 'members';

export default function ClubDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('announcements');
  const [club, setClub] = useState<Club | null>(null);

  useEffect(() => {
    const foundClub = DEMO_CLUBS.find(c => c.id === params.id);
    if (foundClub) {
      setClub({ ...foundClub });
      setActiveTab('announcements'); // Reset to announcements tab when club changes
    } else {
      setClub(null);
    }
  }, [params.id]);

  if (!club) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/clubs');
              }
            }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Club Not Found</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>
    );
  }

  const coordinators = COORDINATORS[club.id] || [];
  const announcements = ANNOUNCEMENTS[club.id] || [];

  const handleJoinToggle = () => {
    setClub({ ...club, joined: !club.joined });
    Alert.alert(
      club.joined ? 'Left Club' : 'Joined Club',
      club.joined 
        ? `You have left ${club.name}` 
        : `You have joined ${club.name}`
    );
  };

  const handleMessage = () => {
    Alert.alert('Message', `Open chat for ${club.name}`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${club.name} on Yuhu! ${club.description}`,
        title: club.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getCouncilIcon = (council: string) => {
    if (council.includes('TECHNICAL')) return '🎯';
    if (council.includes('SPORTS')) return '⚽';
    if (council.includes('CULTURAL')) return '🎨';
    return '📋';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {
            // Navigate back to clubs tab
            if (router.canGoBack()) {
              router.back();
            } else {
              // Fallback: navigate to clubs tab if no back history
              router.replace('/(tabs)/clubs');
            }
          }} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {club.name}
        </Text>
        <TouchableOpacity style={styles.menuButton}>
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
            <Text style={styles.bannerPlaceholder}>Club Banner</Text>
          </View>
        </View>

        {/* Club Info */}
        <View style={styles.clubInfo}>
          <View style={styles.clubHeader}>
            <Text style={styles.clubIcon}>{club.icon}</Text>
            <View style={styles.clubTitleContainer}>
              <Text style={styles.clubName}>{club.name}</Text>
              <View style={styles.councilBadge}>
                <Text style={styles.councilIcon}>{getCouncilIcon(club.council)}</Text>
                <Text style={styles.councilName}>{club.council}</Text>
              </View>
              <View style={styles.memberCount}>
                <Ionicons name="people-outline" size={16} color={colors.textMuted} />
                <Text style={styles.memberCountText}>{club.members} members</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                club.joined ? styles.actionButtonJoined : styles.actionButtonJoin,
              ]}
              onPress={handleJoinToggle}
            >
              {club.joined ? (
                <>
                  <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                  <Text style={styles.actionButtonTextJoined}>Joined</Text>
                </>
              ) : (
                <>
                  <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
                  <Text style={styles.actionButtonTextJoin}>Join</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
              onPress={handleMessage}
            >
              <Ionicons name="chatbubble-outline" size={18} color={colors.textPrimary} />
              <Text style={styles.actionButtonTextSecondary}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
              onPress={handleShare}
            >
              <Ionicons name="share-outline" size={18} color={colors.textPrimary} />
              <Text style={styles.actionButtonTextSecondary}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 About</Text>
            <Text style={styles.aboutText}>{club.description}</Text>
          </View>

          {/* Coordinators Section */}
          {coordinators.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👨‍💼 Coordinators</Text>
              <View style={styles.coordinatorsList}>
                {coordinators.map((coordinator, index) => (
                  <View key={index} style={styles.coordinatorItem}>
                    <Ionicons name="person-circle-outline" size={20} color={colors.textPrimary} />
                    <Text style={styles.coordinatorName}>{coordinator.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'announcements' && styles.tabActive]}
              onPress={() => setActiveTab('announcements')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'announcements' && styles.tabTextActive,
                ]}
              >
                Announcements
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'events' && styles.tabActive]}
              onPress={() => setActiveTab('events')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'events' && styles.tabTextActive,
                ]}
              >
                Events
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'members' && styles.tabActive]}
              onPress={() => setActiveTab('members')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'members' && styles.tabTextActive,
                ]}
              >
                Members
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'announcements' && (
              <View>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <View key={announcement.id} style={styles.announcementCard}>
                      <View style={styles.announcementHeader}>
                        <Ionicons name="megaphone-outline" size={20} color={colors.primary} />
                        <Text style={styles.announcementTitle}>{announcement.title}</Text>
                      </View>
                      <Text style={styles.announcementContent}>{announcement.content}</Text>
                      <Text style={styles.announcementTime}>{announcement.timeAgo}</Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Ionicons name="megaphone-outline" size={48} color={colors.textMuted} />
                    <Text style={styles.emptyStateText}>No announcements yet</Text>
                  </View>
                )}
              </View>
            )}

            {activeTab === 'events' && (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={48} color={colors.textMuted} />
                <Text style={styles.emptyStateText}>No events scheduled</Text>
              </View>
            )}

            {activeTab === 'members' && (
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={48} color={colors.textMuted} />
                <Text style={styles.emptyStateText}>Member list coming soon</Text>
              </View>
            )}
          </View>
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
    height: 180,
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
  clubInfo: {
    paddingHorizontal: spacing.lg,
  },
  clubHeader: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  clubIcon: {
    fontSize: 48,
    marginRight: spacing.md,
  },
  clubTitleContainer: {
    flex: 1,
  },
  clubName: {
    fontSize: typography.fontSize.xl,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  councilBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  councilIcon: {
    fontSize: 16,
  },
  councilName: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.textSecondary,
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  memberCountText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textMuted,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  actionButtonJoin: {
    backgroundColor: `${colors.primary}20`,
  },
  actionButtonJoined: {
    backgroundColor: `${colors.success}20`,
  },
  actionButtonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonTextJoin: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
  },
  actionButtonTextJoined: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.success,
  },
  actionButtonTextSecondary: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
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
  aboutText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    lineHeight: typography.fontSize.md * 1.5,
  },
  coordinatorsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  coordinatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  coordinatorName: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textPrimary,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.textPrimary,
  },
  tabContent: {
    minHeight: 200,
  },
  announcementCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  announcementTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    flex: 1,
  },
  announcementContent: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: typography.fontSize.sm * 1.4,
  },
  announcementTime: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Inter',
    color: colors.textMuted,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyStateText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});

