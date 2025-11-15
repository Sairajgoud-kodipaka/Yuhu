import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { YuhuLogo } from '../components/YuhuLogo';
import { colors, spacing, typography } from '../constants/theme';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Official Campus Voice',
    description: 'Verified updates from campus leaders. No confusion.',
    icon: 'shield-checkmark',
    color: colors.primary,
    largeIcon: true,
  },
  {
    title: 'Stay Connected',
    description: 'Announcements, elections, events—all in one place.',
    icon: 'notifications',
    color: colors.info,
    largeIcon: true,
  },
  {
    title: 'Become a Yuhu Creator',
    description: 'Share knowledge, build roadmaps, help your campus grow.',
    icon: 'star',
    color: colors.warning,
    largeIcon: true,
    specialText: 'BE PART OF OUR VISION',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    setCurrentPage(page);
  };


  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      {currentPage < onboardingData.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Scrollable Onboarding Pages - Smooth Swipe */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
          listener: handleScroll,
        })}
        scrollEventThrottle={16}
        scrollEnabled={true}
        decelerationRate={0.8}
        snapToInterval={width}
        snapToAlignment="center"
        disableIntervalMomentum={true}
        bounces={false}
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={[styles.page, { width }]}>
            {/* Logo at Top-Left */}
            <View style={styles.logoContainer}>
              <YuhuLogo logoSize={50} />
              <View style={styles.logoTextContainer}>
                <Text style={styles.logoText}>YUHU</Text>
                <Text style={styles.tagline}>Official Campus Voice</Text>
              </View>
            </View>

            {/* Center Content - Icon + Title */}
            <View style={styles.centerContent}>
              {/* Large Icon - Prominent */}
              <View style={styles.iconSection}>
                <View style={[styles.iconContainer, { 
                  backgroundColor: `${item.color}15`,
                  borderWidth: 3,
                  borderColor: `${item.color}50`,
                  shadowColor: item.color,
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.4,
                  shadowRadius: 25,
                  elevation: 20,
                }]}>
                  <Ionicons name={item.icon as any} size={140} color={item.color} />
                </View>
              </View>

              {/* Title */}
              <Text style={styles.title}>{item.title}</Text>

              {/* Special Text (if exists) */}
              {item.specialText && (
                <Text style={styles.specialText}>{item.specialText}</Text>
              )}
            </View>

            {/* Description - Bottom - Readable */}
            <View style={styles.contentContainer}>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar - Indicators Only */}
      <View style={styles.bottomBar}>
        {/* Page Indicators */}
        <View style={styles.indicatorContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentPage === index && styles.indicatorActive,
              ]}
            />
          ))}
        </View>

        {/* Get Started Button - Only on Last Page */}
        {currentPage === onboardingData.length - 1 && (
          <Pressable 
            style={({ pressed }) => [
              styles.getStartedButton,
              pressed && styles.getStartedButtonPressed
            ]}
            onPress={() => router.replace('/(auth)/register')}
            android_ripple={{ color: colors.primaryLight, borderless: false }}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.textPrimary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  skipText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  page: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
    paddingBottom: 120,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  logoTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  tagline: {
    fontSize: 10,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    opacity: 0.8,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: spacing.lg,
  },
  iconSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.lg,
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  specialText: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.9,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    width: '100%',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    minHeight: 80,
  },
  description: {
    fontSize: typography.fontSize.lg,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    width: '100%',
    maxWidth: 320,
    paddingHorizontal: spacing.md,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg + 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    minHeight: 80,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  indicatorActive: {
    width: 32,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: spacing.sm,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.xl + spacing.md,
    borderRadius: 28,
    gap: spacing.xs + 2,
    minWidth: 180,
    maxWidth: 240,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    transform: [{ scale: 1 }],
  },
  getStartedButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  getStartedButtonText: {
    fontSize: typography.fontSize.sm + 1,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});

