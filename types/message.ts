export interface Message {
  id: string;
  session_id: string;
  sender_id: string;
  text: string;
  created_at: string;
}

export interface MessageWithSender extends Message {
  sender: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}
