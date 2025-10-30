// Demo Mode Type Definitions
// These types are specifically for the demo marketplace simulation

// Re-export shared types from request module
import type { RequestUrgency, RequestMode } from "./request";

// Demo-specific status type (uses hyphenated form)
export type DemoRequestStatus = "open" | "in-progress" | "completed";

export interface DemoRequest {
  id: string;
  title: string;
  description: string;
  tags: string[];
  urgency: RequestUrgency;
  mode: RequestMode;
  duration: number; // hours (1-4)
  budget?: { amount: number; currency: string };
  createdAt: Date;
  status: DemoRequestStatus;
  requester: DemoUser;
  offers: DemoOffer[];
}

// Offer Types
export interface DemoOffer {
  id: string;
  requestId: string;
  helper: DemoUser;
  message: string;
  availability: string; // "Available now", "In 2 hours", etc.
  createdAt: Date;
  status: "pending" | "accepted" | "declined";
}

// User Types
export interface DemoUser {
  id: string;
  name: string;
  avatar: string; // emoji or URL
  rating: number; // 1-5
  sessionsCompleted: number;
  skills: string[];
}

// Session Types
export interface DemoSession {
  id: string;
  requestId: string;
  requester: DemoUser;
  helper: DemoUser;
  startedAt: Date;
  completedAt?: Date;
  duration: number; // minutes
  rating?: number;
  feedback?: string;
}

// Activity Event Types
export type DemoEventType =
  | "request_posted"
  | "offer_sent"
  | "offer_accepted"
  | "session_started"
  | "session_completed";

export interface DemoEvent {
  id: string;
  type: DemoEventType;
  timestamp: Date;
  data: {
    request?: DemoRequest;
    offer?: DemoOffer;
    session?: DemoSession;
  };
  message: string; // "Sarah posted a new React request"
}

// Stats Types
export interface DemoStats {
  totalRequests: number;
  activeRequests: number;
  totalOffers: number;
  activeSessions: number;
  completedSessions: number;
  availableHelpers: number;
}
