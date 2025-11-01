/**
 * Mock Data Initialization
 * Seeds localStorage with realistic data on first load
 */

import { storage, STORAGE_KEYS, initializeStorage } from './utils/storage';
import { generateSeedData } from './data/generators';

/**
 * Check if data needs initialization
 */
export const needsInitialization = (): boolean => {
  // Check if requests array exists and has data
  const requests = storage.get<any[]>(STORAGE_KEYS.REQUESTS);
  return !requests || requests.length === 0;
};

/**
 * Initialize mock data with seed data
 */
export const initializeMockData = () => {
  // Initialize storage structure
  initializeStorage();

  // Check if already seeded
  if (!needsInitialization()) {
    console.log('[Mock] Data already initialized');
    return;
  }

  console.log('[Mock] Initializing seed data...');

  // Generate and store seed data
  const seedData = generateSeedData();

  storage.set(STORAGE_KEYS.USERS, seedData.users);
  storage.set(STORAGE_KEYS.REQUESTS, seedData.requests);
  storage.set(STORAGE_KEYS.OFFERS, seedData.offers);
  storage.set(STORAGE_KEYS.SESSIONS, seedData.sessions);
  storage.set(STORAGE_KEYS.MESSAGES, seedData.messages);
  storage.set(STORAGE_KEYS.NOTIFICATIONS, seedData.notifications);

  console.log('[Mock] Seed data initialized:', {
    users: seedData.users.length,
    requests: seedData.requests.length,
    offers: seedData.offers.length,
    sessions: seedData.sessions.length,
    messages: seedData.messages.length,
    notifications: seedData.notifications.length
  });
};

/**
 * Reset all mock data (useful for testing)
 */
export const resetMockData = () => {
  console.log('[Mock] Resetting all data...');

  // Clear all storage
  Object.values(STORAGE_KEYS).forEach(key => {
    storage.remove(key);
  });

  // Reinitialize with fresh data
  initializeMockData();

  console.log('[Mock] Data reset complete');
};

/**
 * Auto-initialize on import (client-side only)
 */
if (typeof window !== 'undefined') {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

  if (useMock) {
    initializeMockData();
  }
}
