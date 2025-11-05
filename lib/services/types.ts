/**
 * Service Interface Definitions for MicroCollab
 *
 * These interfaces define contracts that both mock and real API services must implement.
 * This ensures type safety and enables seamless swapping between mock and real implementations.
 */

import type {
  Request,
  RequestFilters,
  RequestWithUser
} from '@/types/request';

/**
 * Re-export types from other modules for convenience
 */
export type { Request, RequestFilters, RequestWithUser } from '@/types/request';

/**
 * DTO (Data Transfer Object) types for creating/updating resources
 */

export interface CreateRequestDto {
  title: string;
  description: string;
  tags: string[];
  duration_hours: number;
  urgency: 'low' | 'normal' | 'critical';
  mode: 'async' | 'live';
  budget?: number;
  currency?: string;
  budget_type?: 'hourly' | 'fixed';
  preferred_time?: string;
  timezone?: string;
  created_by: string;
}

export interface UpdateRequestDto {
  title?: string;
  description?: string;
  tags?: string[];
  duration_hours?: number;
  urgency?: 'low' | 'normal' | 'critical';
  mode?: 'async' | 'live';
  budget?: number;
  currency?: string;
  budget_type?: 'hourly' | 'fixed';
  preferred_time?: string;
  timezone?: string;
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
}

export interface CreateOfferDto {
  request_id: string;
  offered_by: string;
  message: string;
  proposed_time?: string;
  proposed_rate?: number;
  estimated_completion?: string;
}

export interface UpdateOfferDto {
  message?: string;
  proposed_time?: string;
  proposed_rate?: number;
  status?: 'pending' | 'accepted' | 'declined';
}

export interface CreateSessionDto {
  request_id: string;
  offer_id: string;
  helper_id: string;
  requester_id: string;
  scheduled_start?: string;
}

export interface CreateMessageDto {
  session_id: string;
  sender_id: string;
  content: string;
  type?: 'text' | 'code' | 'system';
}

export interface UpdateUserDto {
  name?: string;
  bio?: string;
  skills?: string[];
  timezone?: string;
  availability_status?: 'available' | 'busy' | 'offline';
  avatar_url?: string;
  hourly_rate?: number;
}

export interface CreateFeedbackDto {
  session_id: string;
  from_user_id: string;
  to_user_id: string;
  rating: number;
  comment?: string;
}

/**
 * Offer type
 */
export interface Offer {
  id: string;
  request_id: string;
  offered_by: string;
  message: string;
  proposed_time?: string;
  proposed_rate?: number;
  estimated_completion?: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  updated_at?: string;
}

export interface OfferWithHelper extends Offer {
  helper: {
    id: string;
    name: string;
    avatar_url?: string;
    rating: number;
    skills: string[];
  };
}

/**
 * Session type
 */
export interface Session {
  id: string;
  request_id: string;
  offer_id: string;
  helper_id: string;
  requester_id: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  scheduled_start?: string;
  actual_start?: string;
  end_time?: string;
  duration_minutes?: number;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface SessionWithDetails extends Session {
  request: Request;
  helper: {
    id: string;
    name: string;
    avatar_url?: string;
    rating: number;
  };
  requester: {
    id: string;
    name: string;
    avatar_url?: string;
    rating: number;
  };
}

/**
 * Message type
 */
export interface Message {
  id: string;
  session_id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'code' | 'system';
  created_at: string;
}

export interface MessageWithSender extends Message {
  sender: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}

/**
 * User type
 */
export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  skills: string[];
  timezone: string;
  availability_status: 'available' | 'busy' | 'offline';
  avatar_url?: string;
  rating: number;
  sessions_completed: number;
  hourly_rate?: number;
  role: 'requester' | 'helper' | 'both';
  created_at: string;
}

/**
 * Feedback type
 */
export interface Feedback {
  id: string;
  session_id: string;
  from_user_id: string;
  to_user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

/**
 * Notification type
 */
export interface Notification {
  id: string;
  user_id: string;
  type: 'new_offer' | 'offer_accepted' | 'offer_declined' | 'session_starting' | 'session_completed' | 'feedback_received';
  title: string;
  content: string;
  link?: string;
  read: boolean;
  created_at: string;
}

// ============================================================================
// SERVICE INTERFACES
// ============================================================================

/**
 * Request Service Interface
 * Handles all request-related operations
 */
export interface RequestService {
  /**
   * Get all requests with optional filters
   */
  getAll(filters?: RequestFilters): Promise<Request[]>;

  /**
   * Get single request by ID
   */
  getById(id: string): Promise<RequestWithUser | null>;

  /**
   * Create new request
   */
  create(data: CreateRequestDto): Promise<Request>;

  /**
   * Update existing request
   */
  update(id: string, data: UpdateRequestDto): Promise<Request>;

  /**
   * Delete request
   */
  delete(id: string): Promise<void>;

  /**
   * Get requests created by user
   */
  getMyRequests(userId: string): Promise<Request[]>;
}

/**
 * Offer Service Interface
 * Handles all offer-related operations
 */
export interface OfferService {
  /**
   * Get all offers for a request
   */
  getByRequestId(requestId: string): Promise<OfferWithHelper[]>;

  /**
   * Create new offer
   */
  create(data: CreateOfferDto): Promise<Offer>;

  /**
   * Update offer
   */
  update(id: string, data: UpdateOfferDto): Promise<Offer>;

  /**
   * Accept offer (creates session)
   */
  accept(offerId: string): Promise<Session>;

  /**
   * Decline offer
   */
  decline(offerId: string): Promise<void>;

  /**
   * Get offers made by user
   */
  getMyOffers(userId: string): Promise<OfferWithHelper[]>;
}

/**
 * Session Service Interface
 * Handles all session-related operations
 */
export interface SessionService {
  /**
   * Get session by ID
   */
  getById(id: string): Promise<SessionWithDetails | null>;

  /**
   * Get all sessions for a user
   */
  getMySessions(userId: string, status?: Session['status']): Promise<SessionWithDetails[]>;

  /**
   * Start session
   */
  start(id: string): Promise<Session>;

  /**
   * End session
   */
  end(id: string, notes?: string): Promise<Session>;

  /**
   * Cancel session
   */
  cancel(id: string, reason?: string): Promise<Session>;

  /**
   * Update session notes
   */
  updateNotes(id: string, notes: string): Promise<Session>;
}

/**
 * Message Service Interface
 * Handles all message-related operations
 */
export interface MessageService {
  /**
   * Get all messages for a session
   */
  getBySessionId(sessionId: string): Promise<MessageWithSender[]>;

  /**
   * Send new message
   */
  send(data: CreateMessageDto): Promise<Message>;

  /**
   * Delete message
   */
  delete(id: string): Promise<void>;
}

/**
 * User Service Interface
 * Handles all user-related operations
 */
export interface UserService {
  /**
   * Get user by ID
   */
  getById(id: string): Promise<User | null>;

  /**
   * Get current user profile
   */
  getProfile(): Promise<User | null>;

  /**
   * Update user profile
   */
  updateProfile(data: UpdateUserDto): Promise<User>;

  /**
   * Search users by skills
   */
  searchBySkills(skills: string[]): Promise<User[]>;
}

/**
 * Feedback Service Interface
 * Handles all feedback-related operations
 */
export interface FeedbackService {
  /**
   * Create feedback for session
   */
  create(data: CreateFeedbackDto): Promise<Feedback>;

  /**
   * Get feedback received by user
   */
  getReceivedFeedback(userId: string): Promise<Feedback[]>;

  /**
   * Get feedback for session
   */
  getBySessionId(sessionId: string): Promise<Feedback[]>;
}

/**
 * Notification Service Interface
 * Handles all notification-related operations
 */
export interface NotificationService {
  /**
   * Get all notifications for user
   */
  getAll(userId: string): Promise<Notification[]>;

  /**
   * Mark notification as read
   */
  markAsRead(id: string): Promise<void>;

  /**
   * Mark all notifications as read
   */
  markAllAsRead(userId: string): Promise<void>;

  /**
   * Get unread count
   */
  getUnreadCount(userId: string): Promise<number>;
}
