export type RequestUrgency = "low" | "normal" | "critical";

export type RequestMode = "async" | "live";

export type RequestStatus = "open" | "in_progress" | "completed" | "cancelled";

export interface Request {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration_hours: number;
  urgency: RequestUrgency;
  mode: RequestMode;
  budget?: number;
  currency?: string;
  budget_type?: "hourly" | "fixed";
  status: RequestStatus;
  preferred_time?: string;
  timezone?: string;
  created_by: string;
  created_at: string;
  updated_at?: string;
}

export interface RequestWithUser extends Request {
  user: {
    id: string;
    name: string;
    avatar_url?: string;
    rating: number;
  };
}

export interface RequestFilters {
  tags?: string[];
  duration_min?: number;
  duration_max?: number;
  urgency?: RequestUrgency[];
  mode?: RequestMode;
  sort?: "newest" | "urgent" | "budget" | "best_match";
  search?: string;
}
