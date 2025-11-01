/**
 * Mock User Service
 * Implements UserService interface using localStorage
 */

import { storage, STORAGE_KEYS } from '../utils/storage';
import { simulateNetworkDelay } from '../utils/delay';
import type {
  UserService,
  UpdateUserDto,
  User
} from '@/lib/services/types';

/**
 * Mock User Service Implementation
 */
export const mockUserService: UserService = {
  /**
   * Get user by ID
   */
  async getById(id: string): Promise<User | null> {
    await simulateNetworkDelay('read');

    const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.id === id);

    return user || null;
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User | null> {
    await simulateNetworkDelay('read');

    const currentUser = storage.get<User>(STORAGE_KEYS.CURRENT_USER);

    if (!currentUser) return null;

    // Get full user details from users array
    const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.id === currentUser.id);

    return user || null;
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateUserDto): Promise<User> {
    await simulateNetworkDelay('update');

    const currentUser = storage.get<User>(STORAGE_KEYS.CURRENT_USER);

    if (!currentUser) {
      throw new Error('No current user found');
    }

    const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const index = users.findIndex(u => u.id === currentUser.id);

    if (index === -1) {
      throw new Error(`User with id ${currentUser.id} not found`);
    }

    const updatedUser: User = {
      ...users[index],
      ...data
    };

    users[index] = updatedUser;
    storage.set(STORAGE_KEYS.USERS, users);

    // Update current user in storage
    storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('user:updated', {
        detail: updatedUser
      }));
    }

    return updatedUser;
  },

  /**
   * Search users by skills
   */
  async searchBySkills(skills: string[]): Promise<User[]> {
    await simulateNetworkDelay('read');

    const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];

    // Filter users who have at least one matching skill
    const matchingUsers = users.filter(user =>
      user.skills.some(skill =>
        skills.some(searchSkill =>
          skill.toLowerCase().includes(searchSkill.toLowerCase())
        )
      )
    );

    // Sort by number of matching skills (descending)
    matchingUsers.sort((a, b) => {
      const aMatches = a.skills.filter(skill =>
        skills.some(s => skill.toLowerCase().includes(s.toLowerCase()))
      ).length;
      const bMatches = b.skills.filter(skill =>
        skills.some(s => skill.toLowerCase().includes(s.toLowerCase()))
      ).length;
      return bMatches - aMatches;
    });

    return matchingUsers;
  }
};
