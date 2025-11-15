import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

interface YuhuLogoProps {
  logoSize?: number;
  showBadge?: boolean;
  style?: ViewStyle;
}

export const YuhuLogo: React.FC<YuhuLogoProps> = ({ 
  logoSize = 80, 
  showBadge = true,
  style 
}) => {
  return (
    <View style={[styles.logoContainer, { width: logoSize, height: logoSize }, style]}>
      {/* People Icon */}
      <Ionicons name="people" size={logoSize} color={colors.textPrimary} />
      
      {/* Verification Badge */}
      {showBadge && (
        <View style={styles.badgeContainer}>
          <View style={styles.badgeCircle}>
            <Ionicons name="checkmark" size={logoSize * 0.16} color={colors.textPrimary} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

