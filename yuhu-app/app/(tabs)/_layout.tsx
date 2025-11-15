import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => {
            const iconSize = typeof size === 'number' ? size : 24;
            const iconColor = color || colors.primary;
            const iconName = focused === true ? "home" : "home-outline";
            return (
              <Ionicons 
                name={iconName} 
                size={iconSize} 
                color={iconColor} 
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="clubs"
        options={{
          title: 'Clubs',
          tabBarIcon: ({ color, focused, size }) => {
            const iconSize = typeof size === 'number' ? size : 24;
            const iconColor = color || colors.primary;
            const iconName = focused === true ? "trophy" : "trophy-outline";
            return (
              <Ionicons 
                name={iconName} 
                size={iconSize} 
                color={iconColor} 
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused, size }) => {
            const iconSize = typeof size === 'number' ? size : 24;
            const iconColor = color || colors.primary;
            const iconName = focused === true ? "calendar" : "calendar-outline";
            return (
              <Ionicons 
                name={iconName} 
                size={iconSize} 
                color={iconColor} 
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused, size }) => {
            const iconSize = typeof size === 'number' ? size : 24;
            const iconColor = color || colors.primary;
            const iconName = focused === true ? "chatbubbles" : "chatbubbles-outline";
            return (
              <Ionicons 
                name={iconName} 
                size={iconSize} 
                color={iconColor} 
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => {
            const iconSize = typeof size === 'number' ? size : 24;
            const iconColor = color || colors.primary;
            const iconName = focused === true ? "person" : "person-outline";
            return (
              <Ionicons 
                name={iconName} 
                size={iconSize} 
                color={iconColor} 
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="club-detail"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="event-detail"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="chat-detail"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="qr-attendance"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

