/**
 * Request Service Selector
 * Exports mock or real service based on environment variable
 */

import { mockRequestService } from '../mock/services/mock-request-service';
import type { RequestService } from './types';

// Check if we should use mock data
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

/**
 * Request Service
 * Uses mock implementation by default, will swap to real API when ready
 */
export const requestService: RequestService = USE_MOCK
  ? mockRequestService
  : mockRequestService; // TODO: Replace with apiRequestService when implemented

export default requestService;
