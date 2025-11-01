/**
 * Offer Query Hooks
 * Tanstack Query hooks for offer operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { offerService } from '@/lib/services/offer-service';
import type { CreateOfferDto, UpdateOfferDto } from '@/lib/services/types';
import { requestKeys } from './use-requests';

/**
 * Query key factory for offers
 */
export const offerKeys = {
  all: ['offers'] as const,
  lists: () => [...offerKeys.all, 'list'] as const,
  list: (requestId: string) => [...offerKeys.lists(), requestId] as const,
  myOffers: (userId: string) => [...offerKeys.all, 'my', userId] as const
};

/**
 * Get offers for a request
 */
export function useOffers(requestId: string) {
  return useQuery({
    queryKey: offerKeys.list(requestId),
    queryFn: () => offerService.getByRequestId(requestId),
    enabled: !!requestId,
    staleTime: 30 * 1000
  });
}

/**
 * Get my offers
 */
export function useMyOffers(userId: string) {
  return useQuery({
    queryKey: offerKeys.myOffers(userId),
    queryFn: () => offerService.getMyOffers(userId),
    enabled: !!userId,
    staleTime: 30 * 1000
  });
}

/**
 * Create new offer
 */
export function useCreateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOfferDto) => offerService.create(data),
    onSuccess: (newOffer) => {
      // Invalidate offers list for this request
      queryClient.invalidateQueries({ queryKey: offerKeys.list(newOffer.request_id) });

      // Invalidate my offers
      queryClient.invalidateQueries({ queryKey: offerKeys.myOffers(newOffer.offered_by) });

      toast.success('Offer submitted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to submit offer: ${error.message}`);
      console.error('Create offer error:', error);
    }
  });
}

/**
 * Update offer
 */
export function useUpdateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOfferDto }) =>
      offerService.update(id, data),
    onSuccess: (updatedOffer) => {
      // Invalidate offers list
      queryClient.invalidateQueries({ queryKey: offerKeys.list(updatedOffer.request_id) });

      // Invalidate my offers
      queryClient.invalidateQueries({ queryKey: offerKeys.myOffers(updatedOffer.offered_by) });

      toast.success('Offer updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update offer: ${error.message}`);
    }
  });
}

/**
 * Accept offer (creates session)
 */
export function useAcceptOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offerId: string) => offerService.accept(offerId),
    onSuccess: (session, offerId) => {
      // Invalidate offers for this request
      queryClient.invalidateQueries({ queryKey: offerKeys.list(session.request_id) });

      // Invalidate request details (status changed)
      queryClient.invalidateQueries({ queryKey: requestKeys.detail(session.request_id) });

      // Invalidate all request lists
      queryClient.invalidateQueries({ queryKey: requestKeys.lists() });

      toast.success('Offer accepted! Session created.');
    },
    onError: (error: Error) => {
      toast.error(`Failed to accept offer: ${error.message}`);
    }
  });
}

/**
 * Decline offer
 */
export function useDeclineOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offerId: string) => offerService.decline(offerId),
    onMutate: async (offerId) => {
      // We need to find the request ID, but we don't have it directly
      // This is a limitation - in real API, the response would include it
      // For now, we'll invalidate all offer queries
      return { offerId };
    },
    onSuccess: () => {
      // Invalidate all offer queries
      queryClient.invalidateQueries({ queryKey: offerKeys.lists() });

      toast.success('Offer declined');
    },
    onError: (error: Error) => {
      toast.error(`Failed to decline offer: ${error.message}`);
    }
  });
}
