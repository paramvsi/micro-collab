/**
 * Auth Store
 * Manages authentication state with Zustand + localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { User } from '../services/types';
import { storage, STORAGE_KEYS } from '../mock/utils/storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setUser: (user: User) => void;
}

/**
 * Create mock user for demo/development
 */
const createMockUser = (email: string, name?: string): User => {
  const firstName = name?.split(' ')[0] || email.split('@')[0];
  const lastName = name?.split(' ')[1] || 'User';

  return {
    id: nanoid(),
    email,
    name: name || `${firstName} ${lastName}`,
    bio: 'Software developer passionate about building great products.',
    skills: ['React', 'TypeScript', 'Node.js'],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    availability_status: 'available',
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
    rating: 5.0,
    sessions_completed: 0,
    hourly_rate: 50,
    role: 'both',
    created_at: new Date().toISOString()
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      /**
       * Mock login - creates a user and stores in localStorage
       */
      login: async (email: string, name?: string) => {
        set({ isLoading: true });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if user already exists
        const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];
        let user = users.find(u => u.email === email);

        if (!user) {
          // Create new user
          user = createMockUser(email, name);
          users.push(user);
          storage.set(STORAGE_KEYS.USERS, users);
        }

        // Set as current user
        storage.set(STORAGE_KEYS.CURRENT_USER, user);

        set({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      },

      /**
       * Logout - clears user from state
       */
      logout: () => {
        storage.remove(STORAGE_KEYS.CURRENT_USER);
        set({
          user: null,
          isAuthenticated: false
        });
      },

      /**
       * Update current user data
       */
      updateUser: (data: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = { ...user, ...data };

        // Update in users array
        const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          users[index] = updatedUser;
          storage.set(STORAGE_KEYS.USERS, users);
        }

        // Update current user
        storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser);

        set({ user: updatedUser });
      },

      /**
       * Set user directly (for testing or external auth)
       */
      setUser: (user: User) => {
        storage.set(STORAGE_KEYS.CURRENT_USER, user);
        set({
          user,
          isAuthenticated: true
        });
      }
    }),
    {
      name: 'microcollab-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
