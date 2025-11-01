/**
 * Mock Request Service
 * Implements RequestService interface using localStorage
 */

import { nanoid } from 'nanoid';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { simulateNetworkDelay } from '../utils/delay';
import type {
  RequestService,
  CreateRequestDto,
  UpdateRequestDto
} from '@/lib/services/types';
import type { Request, RequestFilters, RequestWithUser } from '@/types/request';

/**
 * Get users from storage to enrich requests
 */
const getUsers = () => {
  return storage.get<any[]>(STORAGE_KEYS.USERS) || [];
};

/**
 * Apply filters to request list
 */
const applyFilters = (requests: Request[], filters?: RequestFilters): Request[] => {
  if (!filters) return requests;

  let filtered = [...requests];

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(request =>
      filters.tags!.some(tag => request.tags.includes(tag))
    );
  }

  // Filter by duration
  if (filters.duration_min !== undefined) {
    filtered = filtered.filter(r => r.duration_hours >= filters.duration_min!);
  }
  if (filters.duration_max !== undefined) {
    filtered = filtered.filter(r => r.duration_hours <= filters.duration_max!);
  }

  // Filter by urgency
  if (filters.urgency && filters.urgency.length > 0) {
    filtered = filtered.filter(r => filters.urgency!.includes(r.urgency));
  }

  // Filter by mode
  if (filters.mode) {
    filtered = filtered.filter(r => r.mode === filters.mode);
  }

  // Filter by search query
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(searchLower) ||
      r.description.toLowerCase().includes(searchLower) ||
      r.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Sort
  if (filters.sort) {
    switch (filters.sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'urgent':
        const urgencyOrder = { critical: 0, normal: 1, low: 2 };
        filtered.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
        break;
      case 'budget':
        filtered.sort((a, b) => (b.budget || 0) - (a.budget || 0));
        break;
      case 'best_match':
        // For mock, just shuffle
        filtered.sort(() => Math.random() - 0.5);
        break;
    }
  } else {
    // Default: newest first
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return filtered;
};

/**
 * Mock Request Service Implementation
 */
export const mockRequestService: RequestService = {
  /**
   * Get all requests with optional filters
   */
  async getAll(filters?: RequestFilters): Promise<Request[]> {
    await simulateNetworkDelay('read');

    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];
    const filtered = applyFilters(requests, filters);

    return filtered;
  },

  /**
   * Get single request by ID with user details
   */
  async getById(id: string): Promise<RequestWithUser | null> {
    await simulateNetworkDelay('read');

    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];
    const request = requests.find(r => r.id === id);

    if (!request) return null;

    // Enrich with user data
    const users = getUsers();
    const user = users.find((u: any) => u.id === request.created_by);

    if (!user) return null;

    return {
      ...request,
      user: {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
        rating: user.rating
      }
    };
  },

  /**
   * Create new request
   */
  async create(data: CreateRequestDto): Promise<Request> {
    await simulateNetworkDelay('write');

    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];

    const newRequest: Request = {
      id: nanoid(),
      ...data,
      status: 'open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    requests.push(newRequest);
    storage.set(STORAGE_KEYS.REQUESTS, requests);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('request:created', {
        detail: newRequest
      }));
    }

    return newRequest;
  },

  /**
   * Update existing request
   */
  async update(id: string, data: UpdateRequestDto): Promise<Request> {
    await simulateNetworkDelay('update');

    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];
    const index = requests.findIndex(r => r.id === id);

    if (index === -1) {
      throw new Error(`Request with id ${id} not found`);
    }

    const updatedRequest: Request = {
      ...requests[index],
      ...data,
      updated_at: new Date().toISOString()
    };

    requests[index] = updatedRequest;
    storage.set(STORAGE_KEYS.REQUESTS, requests);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('request:updated', {
        detail: updatedRequest
      }));
    }

    return updatedRequest;
  },

  /**
   * Delete request
   */
  async delete(id: string): Promise<void> {
    await simulateNetworkDelay('delete');

    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];
    const filtered = requests.filter(r => r.id !== id);

    storage.set(STORAGE_KEYS.REQUESTS, filtered);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('request:deleted', {
        detail: { id }
      }));
    }
  },

  /**
   * Get requests created by user
   */
  async getMyRequests(userId: string): Promise<Request[]> {
    await simulateNetworkDelay('read');

    const requests = storage.get<Request[]>(STORAGE_KEYS.REQUESTS) || [];
    const userRequests = requests.filter(r => r.created_by === userId);

    // Sort by newest first
    userRequests.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return userRequests;
  }
};
