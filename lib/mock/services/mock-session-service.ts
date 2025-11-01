/**
 * Mock Session Service
 * Implements SessionService interface using localStorage
 */

import { storage, STORAGE_KEYS } from '../utils/storage';
import { simulateNetworkDelay } from '../utils/delay';
import type {
  SessionService,
  Session,
  SessionWithDetails
} from '@/lib/services/types';

/**
 * Get related data from storage
 */
const getUsers = () => storage.get<any[]>(STORAGE_KEYS.USERS) || [];
const getRequests = () => storage.get<any[]>(STORAGE_KEYS.REQUESTS) || [];

/**
 * Enrich session with related data
 */
const enrichSession = (session: Session): SessionWithDetails | null => {
  const users = getUsers();
  const requests = getRequests();

  const request = requests.find((r: any) => r.id === session.request_id);
  const helper = users.find((u: any) => u.id === session.helper_id);
  const requester = users.find((u: any) => u.id === session.requester_id);

  if (!request || !helper || !requester) return null;

  return {
    ...session,
    request,
    helper: {
      id: helper.id,
      name: helper.name,
      avatar_url: helper.avatar_url
    },
    requester: {
      id: requester.id,
      name: requester.name,
      avatar_url: requester.avatar_url
    }
  };
};

/**
 * Mock Session Service Implementation
 */
export const mockSessionService: SessionService = {
  /**
   * Get session by ID with full details
   */
  async getById(id: string): Promise<SessionWithDetails | null> {
    await simulateNetworkDelay('read');

    const sessions = storage.get<Session[]>(STORAGE_KEYS.SESSIONS) || [];
    const session = sessions.find(s => s.id === id);

    if (!session) return null;

    return enrichSession(session);
  },

  /**
   * Get all sessions for a user
   */
  async getMySessions(userId: string, status?: Session['status']): Promise<SessionWithDetails[]> {
    await simulateNetworkDelay('read');

    const sessions = storage.get<Session[]>(STORAGE_KEYS.SESSIONS) || [];
    let userSessions = sessions.filter(
      s => s.helper_id === userId || s.requester_id === userId
    );

    // Filter by status if provided
    if (status) {
      userSessions = userSessions.filter(s => s.status === status);
    }

    // Enrich with related data
    const enrichedSessions = userSessions
      .map(enrichSession)
      .filter((s): s is SessionWithDetails => s !== null);

    // Sort by newest first
    enrichedSessions.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return enrichedSessions;
  },

  /**
   * Start session
   */
  async start(id: string): Promise<Session> {
    await simulateNetworkDelay('update');

    const sessions = storage.get<Session[]>(STORAGE_KEYS.SESSIONS) || [];
    const index = sessions.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error(`Session with id ${id} not found`);
    }

    const updatedSession: Session = {
      ...sessions[index],
      status: 'active',
      actual_start: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    sessions[index] = updatedSession;
    storage.set(STORAGE_KEYS.SESSIONS, sessions);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('session:started', {
        detail: updatedSession
      }));
    }

    return updatedSession;
  },

  /**
   * End session
   */
  async end(id: string, notes?: string): Promise<Session> {
    await simulateNetworkDelay('update');

    const sessions = storage.get<Session[]>(STORAGE_KEYS.SESSIONS) || [];
    const index = sessions.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error(`Session with id ${id} not found`);
    }

    const session = sessions[index];
    const startTime = session.actual_start || session.scheduled_start;
    const endTime = new Date();
    const durationMinutes = startTime
      ? Math.round((endTime.getTime() - new Date(startTime).getTime()) / 60000)
      : undefined;

    const updatedSession: Session = {
      ...session,
      status: 'completed',
      end_time: endTime.toISOString(),
      duration_minutes: durationMinutes,
      notes,
      updated_at: new Date().toISOString()
    };

    sessions[index] = updatedSession;
    storage.set(STORAGE_KEYS.SESSIONS, sessions);

    // Update request status to completed
    const requests = getRequests();
    const updatedRequests = requests.map((r: any) =>
      r.id === session.request_id
        ? { ...r, status: 'completed', updated_at: new Date().toISOString() }
        : r
    );
    storage.set(STORAGE_KEYS.REQUESTS, updatedRequests);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('session:ended', {
        detail: updatedSession
      }));
    }

    return updatedSession;
  },

  /**
   * Cancel session
   */
  async cancel(id: string, reason?: string): Promise<Session> {
    await simulateNetworkDelay('update');

    const sessions = storage.get<Session[]>(STORAGE_KEYS.SESSIONS) || [];
    const index = sessions.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error(`Session with id ${id} not found`);
    }

    const session = sessions[index];

    const updatedSession: Session = {
      ...session,
      status: 'cancelled',
      notes: reason,
      updated_at: new Date().toISOString()
    };

    sessions[index] = updatedSession;
    storage.set(STORAGE_KEYS.SESSIONS, sessions);

    // Update request status back to open
    const requests = getRequests();
    const updatedRequests = requests.map((r: any) =>
      r.id === session.request_id
        ? { ...r, status: 'open', updated_at: new Date().toISOString() }
        : r
    );
    storage.set(STORAGE_KEYS.REQUESTS, updatedRequests);

    // Trigger custom event for real-time simulation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('session:cancelled', {
        detail: updatedSession
      }));
    }

    return updatedSession;
  },

  /**
   * Update session notes
   */
  async updateNotes(id: string, notes: string): Promise<Session> {
    await simulateNetworkDelay('update');

    const sessions = storage.get<Session[]>(STORAGE_KEYS.SESSIONS) || [];
    const index = sessions.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error(`Session with id ${id} not found`);
    }

    const updatedSession: Session = {
      ...sessions[index],
      notes,
      updated_at: new Date().toISOString()
    };

    sessions[index] = updatedSession;
    storage.set(STORAGE_KEYS.SESSIONS, sessions);

    return updatedSession;
  }
};
