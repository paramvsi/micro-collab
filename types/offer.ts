export type OfferStatus = "pending" | "accepted" | "declined";

export interface Offer {
  id: string;
  request_id: string;
  offered_by: string;
  message: string;
  proposed_time?: string;
  status: OfferStatus;
  created_at: string;
  updated_at?: string;
}

export interface OfferWithUser extends Offer {
  user: {
    id: string;
    name: string;
    avatar_url?: string;
    rating: number;
    skills: string[];
  };
}
