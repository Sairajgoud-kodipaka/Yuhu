import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { colors, spacing, typography } from '../constants/theme';

interface NavbarProps {
  visible: boolean;
  onClose: () => void;
}

export function Navbar({ visible, onClose }: NavbarProps) {
  const router = useRouter();
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    onClose();
    router.replace('/(auth)/login');
  };

  const menuItems = [
    {
      label: 'Home',
      icon: 'home-outline',
      route: '/(tabs)',
      roles: ['student', 'coordinator', 'council_head', 'admin'],
    },
    {
      label: 'Profile',
      icon: 'person-outline',
      route: '/(tabs)',
      roles: ['student', 'coordinator', 'council_head', 'admin'],
    },
    {
      label: 'Settings',
      icon: 'settings-outline',
      route: '/(tabs)',
      roles: ['student', 'coordinator', 'council_head', 'admin'],
    },
  ];

  if (user?.role === 'admin') {
    menuItems.push({
      label: 'Admin Dashboard',
      icon: 'shield-outline',
      route: '/(tabs)',
      roles: ['admin'],
    });
    menuItems.push({
      label: 'User Management',
      icon: 'people-outline',
      route: '/(tabs)',
      roles: ['admin'],
    });
    menuItems.push({
      label: 'Analytics',
      icon: 'stats-chart-outline',
      route: '/(tabs)',
      roles: ['admin'],
    });
  }

  if (user?.role === 'coordinator' || user?.role === 'council_head') {
    menuItems.push({
      label: 'Post Announcement',
      icon: 'megaphone-outline',
      route: '/(tabs)',
      roles: ['coordinator', 'council_head', 'admin'],
    });
    menuItems.push({
      label: 'Create Event',
      icon: 'calendar-outline',
      route: '/(tabs)',
      roles: ['coordinator', 'council_head', 'admin'],
    });
  }

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || 'student')
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
                <Text style={styles.userRole}>
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Student'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {filteredMenuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  onClose();
                  // Navigate to route if needed
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={colors.textPrimary}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={22} color={colors.error} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: colors.textPrimary,
  },
  userRole: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Inter',
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  closeButton: {
    padding: spacing.xs,
  },
  menuContainer: {
    paddingVertical: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  menuIcon: {
    width: 24,
  },
  menuLabel: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter',
    color: colors.textPrimary,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  signOutText: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: colors.error,
  },
});

