import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';
import { Navbar } from '../../components/Navbar';

interface Club {
  id: string;
  name: string;
  description: string;
  icon: string;
  council: string;
  members: number;
  joined: boolean;
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

type FilterType = 'all' | 'my-clubs' | 'technical' | 'sports' | 'cultural';

export default function ClubsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [clubs, setClubs] = useState<Club[]>(DEMO_CLUBS);

  const handleJoinClub = (clubId: string) => {
    setClubs(clubs.map(club => 
      club.id === clubId ? { ...club, joined: !club.joined } : club
    ));
  };

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (activeFilter) {
      case 'my-clubs':
        return club.joined;
      case 'technical':
        return club.council === 'TECHNICAL COUNCIL';
      case 'sports':
        return club.council === 'SPORTS COUNCIL';
      case 'cultural':
        return club.council === 'CULTURAL COUNCIL';
      default:
        return true;
    }
  });

  const groupedClubs = filteredClubs.reduce((acc, club) => {
    if (!acc[club.council]) {
      acc[club.council] = [];
    }
    acc[club.council].push(club);
    return acc;
  }, {} as Record<string, Club[]>);

  const sections = Object.entries(groupedClubs).map(([title, data]) => ({
    title,
    data,
  }));

  const getCouncilIcon = (council: string) => {
    if (council.includes('TECHNICAL')) return '🎯';
    if (council.includes('SPORTS')) return '⚽';
    if (council.includes('CULTURAL')) return '🎨';
    return '📋';
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'my-clubs', label: 'My Clubs' },
    { key: 'technical', label: 'Technical' },
    { key: 'sports', label: 'Sports' },
    { key: 'cultural', label: 'Cultural' },
  ];

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Clubs</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setNavbarVisible(true)}
            >
              <Ionicons name="menu" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clubs..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Chips */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterChip,
                  activeFilter === filter.key && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(filter.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilter === filter.key && styles.filterChipTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Clubs List */}
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.clubCard}
              onPress={() => router.push({ pathname: '/(tabs)/club-detail', params: { id: item.id } })}
            >
              <View style={styles.clubIconContainer}>
                <Text style={styles.clubIcon}>{item.icon}</Text>
              </View>
              <View style={styles.clubContent}>
                <Text style={styles.clubName}>{item.name}</Text>
                <Text style={styles.clubDescription}>{item.description}</Text>
                <View style={styles.clubFooter}>
                  <Ionicons name="people-outline" size={14} color={colors.textMuted} />
                  <Text style={styles.clubMembers}>{item.members} members</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.joinButton,
                  item.joined && styles.joinButtonActive,
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  handleJoinClub(item.id);
                }}
              >
                {item.joined ? (
                  <>
                    <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                    <Text style={styles.joinButtonTextActive}>Joined</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="add-circle-outline" size={16} color={colors.primary} />
                    <Text style={styles.joinButtonText}>Join</Text>
                  </>
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderIcon}>{getCouncilIcon(title)}</Text>
              <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    paddingRight: spacing.xs,
  },
  searchButton: {
    padding: spacing.sm,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    padding: spacing.sm,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    height: 44,
    gap: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textPrimary,
  },
  filterContainer: {
    marginBottom: spacing.lg,
    paddingVertical: spacing.sm,
  },
  filterContent: {
    paddingHorizontal: spacing.lg,
    paddingRight: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.lg + 2,
    paddingVertical: spacing.sm + 2,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 88,
    maxWidth: 120,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  filterChipText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.textMuted,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  filterChipTextActive: {
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  listContent: {
    paddingBottom: spacing.xxl + spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  sectionHeaderIcon: {
    fontSize: 18,
  },
  sectionHeaderText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-Bold',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  clubCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    minHeight: 80,
  },
  clubIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  clubIcon: {
    fontSize: 28,
  },
  clubContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  clubName: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    lineHeight: typography.fontSize.md * 1.2,
  },
  clubDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: typography.fontSize.sm * 1.4,
  },
  clubFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  clubMembers: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textMuted,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: `${colors.primary}20`,
    gap: spacing.xs,
    minWidth: 80,
    minHeight: 36,
  },
  joinButtonActive: {
    backgroundColor: `${colors.success}20`,
  },
  joinButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
  },
  joinButtonTextActive: {
    color: colors.success,
  },
});

