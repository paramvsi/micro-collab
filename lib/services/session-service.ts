/**
 * Session Service Selector
 * Exports mock or real service based on environment variable
 */

import { mockSessionService } from '../mock/services/mock-session-service';
import type { SessionService } from './types';

// Check if we should use mock data
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

/**
 * Session Service
 * Uses mock implementation by default, will swap to real API when ready
 */
export const sessionService: SessionService = USE_MOCK
  ? mockSessionService
  : mockSessionService; // TODO: Replace with apiSessionService when implemented

export default sessionService;
