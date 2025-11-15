import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { YuhuLogo } from '../../components/YuhuLogo';
import { colors, spacing, typography } from '../../constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = async () => {
    if (!email) {
      // TODO: Show error toast
      return;
    }

    setIsLoading(true);
    // TODO: Implement actual password reset logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  if (isSent) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <YuhuLogo logoSize={80} showBadge={true} />
            <Text style={styles.logoText}>YUHU</Text>
            <Text style={styles.tagline}>Official Campus Voice</Text>
          </View>

          {/* Success Message */}
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={80} color={colors.success} />
            </View>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successDescription}>
              We've sent a password reset link to{'\n'}
              <Text style={styles.emailText}>{email}</Text>
            </Text>
            <Text style={styles.successNote}>
              Didn't receive the email? Check your spam folder or try again.
            </Text>

            {/* Back to Login Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
              <Text style={styles.backButtonText}>Back to Sign In</Text>
            </TouchableOpacity>

            {/* Resend Button */}
            <TouchableOpacity 
              style={styles.resendButton}
              onPress={() => handleReset()}
            >
              <Text style={styles.resendText}>Resend Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backIconButton} onPress={handleBackToLogin}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <YuhuLogo logoSize={80} showBadge={true} />
          <Text style={styles.logoText}>YUHU</Text>
          <Text style={styles.tagline}>Official Campus Voice</Text>
        </View>

        {/* Reset Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Don't worry! Enter your email address and we'll send you a link to reset your password.
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            style={[styles.resetButton, isLoading && styles.resetButtonDisabled]}
            onPress={handleReset}
            disabled={isLoading}
          >
            <Text style={styles.resetButtonText}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Text>
            {!isLoading && <Ionicons name="arrow-forward" size={20} color={colors.textPrimary} />}
          </TouchableOpacity>

          {/* Back to Login Link */}
          <TouchableOpacity style={styles.backToLogin} onPress={handleBackToLogin}>
            <Ionicons name="arrow-back" size={16} color={colors.textSecondary} />
            <Text style={styles.backToLoginText}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  backIconButton: {
    position: 'absolute',
    top: spacing.xl + spacing.md,
    left: spacing.xl,
    zIndex: 10,
    padding: spacing.xs,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xxl,
  },
  logoText: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    letterSpacing: 3,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    height: 52,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resetButtonDisabled: {
    opacity: 0.6,
  },
  resetButtonText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  backToLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  backToLoginText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textSecondary,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  successIcon: {
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontSize: typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  successDescription: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  emailText: {
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  successNote: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.textPrimary,
  },
  resendButton: {
    paddingVertical: spacing.md,
  },
  resendText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.primary,
  },
});

