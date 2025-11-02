/**
 * Mock Offer Service
 * Implements OfferService interface using localStorage
 */

import { nanoid } from 'nanoid';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { simulateNetworkDelay } from '../utils/delay';
import type {
  OfferService,
  CreateOfferDto,
  UpdateOfferDto,
  Offer,
  OfferWithHelper,
  Session
} from '@/lib/services/types';

/**
 * Get users from storage to enrich offers
 */
const getUsers = () => {
  return storage.get<any[]>(STORAGE_KEYS.USERS) || [];
};

/**
 * Get requests from storage
 */
const getRequests = () => {
  return storage.get<any[]>(STORAGE_KEYS.REQUESTS) || [];
};

/**
 * Mock Offer Service Implementation
 */
export const mockOfferService: OfferService = {
  /**
   * Get all offers for a request with helper details
   */
  async getByRequestId(requestId: string): Promise<OfferWithHelper[]> {
    await simulateNetworkDelay('read');

    const offers = storage.get<Offer[]>(STORAGE_KEYS.OFFERS) || [];
    const requestOffers = offers.filter(o => o.request_id === requestId);

    // Enrich with helper data
    const users = getUsers();
    const enrichedOffers = requestOffers
      .map(offer => {
        const helper = users.find((u: any) => u.id === offer.offered_by);
        if (!helper) return null;

        return {
          ...offer,
          helper: {
            id: helper.id,
            name: helper.name,
            avatar_url: helper.avatar_url,
            rating: helper.rating,
            skills: helper.skills
          }
        } as OfferWithHelper;
      })
      .filter((o): o is OfferWithHelper => o !== null);

    // Sort by newest first
    enrichedOffers.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return enrichedOffers;
  },

  /**
   * Create new offer
   */
  async create(data: CreateOfferDto): Promise<Offer> {
    await simulateNetworkDelay('write');

    const offers = storage.get<Offer[]>(STORAGE_KEYS.OFFERS) || [];

    const newOffer: Offer = {
      id: nanoid(),
      ...data,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    offers.push(newOffer);
    storage.set(STORAGE_KEYS.OFFERS, offers);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('offer:created', {
        detail: newOffer
      }));
    }

    return newOffer;
  },

  /**
   * Update offer
   */
  async update(id: string, data: UpdateOfferDto): Promise<Offer> {
    await simulateNetworkDelay('update');

    const offers = storage.get<Offer[]>(STORAGE_KEYS.OFFERS) || [];
    const index = offers.findIndex(o => o.id === id);

    if (index === -1) {
      throw new Error(`Offer with id ${id} not found`);
    }

    const updatedOffer: Offer = {
      ...offers[index],
      ...data,
      updated_at: new Date().toISOString()
    };

    offers[index] = updatedOffer;
    storage.set(STORAGE_KEYS.OFFERS, offers);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('offer:updated', {
        detail: updatedOffer
      }));
    }

    return updatedOffer;
  },

  /**
   * Accept offer (creates session and updates request status)
   */
  async accept(offerId: string): Promise<Session> {
    await simulateNetworkDelay('write');

    const offers = storage.get<Offer[]>(STORAGE_KEYS.OFFERS) || [];
    const offer = offers.find(o => o.id === offerId);

    if (!offer) {
      throw new Error(`Offer with id ${offerId} not found`);
    }

    // Update offer status
    const updatedOffers = offers.map(o =>
      o.id === offerId
        ? { ...o, status: 'accepted' as const, updated_at: new Date().toISOString() }
        : o.request_id === offer.request_id
        ? { ...o, status: 'declined' as const, updated_at: new Date().toISOString() }
        : o
    );
    storage.set(STORAGE_KEYS.OFFERS, updatedOffers);

    // Update request status
    const requests = getRequests();
    const updatedRequests = requests.map((r: any) =>
      r.id === offer.request_id
        ? { ...r, status: 'in_progress', updated_at: new Date().toISOString() }
        : r
    );
    storage.set(STORAGE_KEYS.REQUESTS, updatedRequests);

    // Create session
    const sessions = storage.get<Session[]>(STORAGE_KEYS.SESSIONS) || [];
    const request = requests.find((r: any) => r.id === offer.request_id);

    const newSession: Session = {
      id: nanoid(),
      request_id: offer.request_id,
      offer_id: offerId,
      helper_id: offer.offered_by,
      requester_id: request.created_by,
      status: 'scheduled',
      scheduled_start: offer.proposed_time || new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    sessions.push(newSession);
    storage.set(STORAGE_KEYS.SESSIONS, sessions);

    // Trigger custom events for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('offer:accepted', {
        detail: { offer, session: newSession }
      }));
      window.dispatchEvent(new CustomEvent('session:created', {
        detail: newSession
      }));
    }

    return newSession;
  },

  /**
   * Decline offer
   */
  async decline(offerId: string): Promise<void> {
    await simulateNetworkDelay('update');

    const offers = storage.get<Offer[]>(STORAGE_KEYS.OFFERS) || [];
    const updatedOffers = offers.map(o =>
      o.id === offerId
        ? { ...o, status: 'declined' as const, updated_at: new Date().toISOString() }
        : o
    );

    storage.set(STORAGE_KEYS.OFFERS, updatedOffers);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('offer:declined', {
        detail: { offerId }
      }));
    }
  },

  /**
   * Get offers made by user
   */
  async getMyOffers(userId: string): Promise<OfferWithHelper[]> {
    await simulateNetworkDelay('read');

    const offers = storage.get<Offer[]>(STORAGE_KEYS.OFFERS) || [];
    const userOffers = offers.filter(o => o.offered_by === userId);

    // Enrich with helper data (which is the user themselves)
    const users = getUsers();
    const helper = users.find((u: any) => u.id === userId);

    if (!helper) return [];

    const enrichedOffers: OfferWithHelper[] = userOffers.map(offer => ({
      ...offer,
      helper: {
        id: helper.id,
        name: helper.name,
        avatar_url: helper.avatar_url,
        rating: helper.rating,
        skills: helper.skills
      }
    }));

    // Sort by newest first
    enrichedOffers.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return enrichedOffers;
  }
};
