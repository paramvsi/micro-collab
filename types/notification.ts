export type NotificationType =
  | "new_offer"
  | "offer_accepted"
  | "offer_declined"
  | "session_starting"
  | "session_completed"
  | "feedback_received"
  | "message_received";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  content: string;
  link?: string;
  read: boolean;
  created_at: string;
}
