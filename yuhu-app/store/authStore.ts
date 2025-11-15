import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export type UserRole = 'student' | 'coordinator' | 'council_head' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
  course?: string;
  year?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  loadSession: () => Promise<void>;
}

// Demo accounts
const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
  student: {
    password: 'student123',
    user: {
      id: '1',
      username: 'student',
      email: 'student@yuhu.edu',
      name: 'Raj Kumar',
      role: 'student',
      course: 'BS Computer Science',
      year: 2,
    },
  },
  admin: {
    password: 'admin123',
    user: {
      id: '2',
      username: 'admin',
      email: 'admin@yuhu.edu',
      name: 'Admin User',
      role: 'admin',
    },
  },
};

const SESSION_KEY = 'yuhu_session';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  signIn: async (username: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const account = DEMO_ACCOUNTS[username.toLowerCase()];
    
    if (!account || account.password !== password) {
      set({ isLoading: false });
      return false;
    }

    const user = account.user;
    
    // Save session
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(user));
    
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    });

    return true;
  },

  signOut: async () => {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  loadSession: async () => {
    try {
      const sessionData = await SecureStore.getItemAsync(SESSION_KEY);
      if (sessionData) {
        const user = JSON.parse(sessionData) as User;
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading session:', error);
      set({ isLoading: false });
    }
  },
}));

