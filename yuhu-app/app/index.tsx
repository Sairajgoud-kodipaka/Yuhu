import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { YuhuLogo } from '../components/YuhuLogo';
import { colors, spacing, typography } from '../constants/theme';
import { useAuthStore } from '../store/authStore';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 2 seconds or when auth is loaded
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Simple Logo: People Icon + Verification Badge */}
        <YuhuLogo logoSize={100} showBadge={true} />
        
        {/* Wordmark */}
        <Text style={styles.logoText}>YUHU</Text>
        
        {/* Tagline */}
        <Text style={styles.tagline}>Official Campus Voice</Text>
      </Animated.View>

      {/* Loading indicator - minimal dots */}
      <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
        <View style={styles.loadingDot} />
        <View style={styles.loadingDot} />
        <View style={styles.loadingDot} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  // Typography Styles - Clean & Premium
  logoText: {
    fontSize: 52,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    letterSpacing: 4,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
    fontWeight: '700',
  },
  tagline: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    fontWeight: '400',
    textAlign: 'center',
  },
  // Loading Indicator
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxl,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
    marginHorizontal: spacing.xs,
  },
});

