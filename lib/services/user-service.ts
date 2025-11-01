/**
 * User Service Selector
 * Exports mock or real service based on environment variable
 */

import { mockUserService } from '../mock/services/mock-user-service';
import type { UserService } from './types';

// Check if we should use mock data
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

/**
 * User Service
 * Uses mock implementation by default, will swap to real API when implemented
 */
export const userService: UserService = USE_MOCK
  ? mockUserService
  : mockUserService; // TODO: Replace with apiUserService when implemented

export default userService;
