export type SessionStatus = "active" | "paused" | "completed" | "cancelled";

export interface Session {
  id: string;
  request_id: string;
  helper_id: string;
  requester_id: string;
  start_time: string;
  end_time?: string;
  status: SessionStatus;
  created_at: string;
  updated_at?: string;
}

export interface SessionFeedback {
  rating: number;
  feedback_text?: string;
  feedback_tags?: string[];
}

export interface SessionWithDetails extends Session {
  request: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  };
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
  helper_feedback?: SessionFeedback;
  requester_feedback?: SessionFeedback;
}
