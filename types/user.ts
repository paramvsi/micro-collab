export type UserRole = "requester" | "helper" | "both";

export type AvailabilityStatus = "available" | "busy" | "offline";

export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  skills: string[];
  timezone: string;
  role: UserRole;
  rating: number;
  avatar_url?: string;
  availability_status: AvailabilityStatus;
  created_at: string;
  updated_at?: string;
}

export interface UserProfile extends User {
  total_requests?: number;
  total_sessions_as_helper?: number;
  total_sessions_as_requester?: number;
  total_earnings?: number;
}
