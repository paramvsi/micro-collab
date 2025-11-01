/**
 * Type-safe localStorage wrapper for MicroCollab mock data persistence
 *
 * Features:
 * - Type-safe get/set operations with TypeScript generics
 * - JSON serialization/deserialization
 * - Error handling for quota exceeded and parse errors
 * - Consistent storage key naming convention
 */

export const storage = {
  /**
   * Get item from localStorage with type safety
   * @param key Storage key
   * @returns Parsed value or null if not found
   */
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  },

  /**
   * Set item in localStorage with type safety
   * @param key Storage key
   * @param value Value to store (will be JSON stringified)
   */
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded. Consider clearing old data.');
      } else {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  },

  /**
   * Remove item from localStorage
   * @param key Storage key
   */
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  /**
   * Clear all localStorage items
   */
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },

  /**
   * Check if key exists in localStorage
   * @param key Storage key
   * @returns True if key exists
   */
  has: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(key) !== null;
  }
};

/**
 * Storage keys for MicroCollab data
 * Using namespace prefix to avoid conflicts
 */
export const STORAGE_KEYS = {
  REQUESTS: 'microcollab:requests',
  OFFERS: 'microcollab:offers',
  SESSIONS: 'microcollab:sessions',
  MESSAGES: 'microcollab:messages',
  USERS: 'microcollab:users',
  AUTH: 'microcollab:auth',
  NOTIFICATIONS: 'microcollab:notifications',
  CURRENT_USER: 'microcollab:current-user'
} as const;

/**
 * Initialize storage with seed data if empty
 * Call this on app initialization
 */
export const initializeStorage = () => {
  // Check if already initialized
  if (storage.has(STORAGE_KEYS.REQUESTS)) {
    return;
  }

  // Initialize with empty arrays
  storage.set(STORAGE_KEYS.REQUESTS, []);
  storage.set(STORAGE_KEYS.OFFERS, []);
  storage.set(STORAGE_KEYS.SESSIONS, []);
  storage.set(STORAGE_KEYS.MESSAGES, []);
  storage.set(STORAGE_KEYS.USERS, []);
  storage.set(STORAGE_KEYS.NOTIFICATIONS, []);
};

/**
 * Clear all MicroCollab data from localStorage
 * Useful for testing and demo reset
 */
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    storage.remove(key);
  });
};
