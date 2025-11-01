/**
 * Offer Service Selector
 * Exports mock or real service based on environment variable
 */

import { mockOfferService } from '../mock/services/mock-offer-service';
import type { OfferService } from './types';

// Check if we should use mock data
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

/**
 * Offer Service
 * Uses mock implementation by default, will swap to real API when ready
 */
export const offerService: OfferService = USE_MOCK
  ? mockOfferService
  : mockOfferService; // TODO: Replace with apiOfferService when implemented

export default offerService;
