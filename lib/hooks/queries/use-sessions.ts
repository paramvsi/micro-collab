/**
 * Session Query Hooks
 * Tanstack Query hooks for session operations
 */

import { useQuery, useMutation, useQueryClient } from '@tantml:function_calls>
import { toast } from 'sonner';
import { sessionService } from '@/lib/services/session-service';
import { requestKeys } from './use-requests';

/**
 * Query key factory for sessions
 */
export const sessionKeys = {
  all: ['sessions'] as const,
  lists: () => [...sessionKeys.all, 'list'] as const,
  mySessions: (userId: string, status?: string) => [...sessionKeys.lists(), userId, status] as const,
  details: () => [...sessionKeys.all, 'detail'] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const
};

/**
 * Get session by ID
 */
export function useSession(id: string) {
  return useQuery({
    queryKey: sessionKeys.detail(id),
    queryFn: () => sessionService.getById(id),
    enabled: !!id,
    staleTime: 10 * 1000 // 10 seconds for active sessions
  });
}

/**
 * Get my sessions
 */
export function useMySessions(userId: string, status?: 'scheduled' | 'active' | 'completed' | 'cancelled') {
  return useQuery({
    queryKey: sessionKeys.mySessions(userId, status),
    queryFn: () => sessionService.getMySessions(userId, status),
    enabled: !!userId,
    staleTime: 30 * 1000
  });
}

/**
 * Start session
 */
export function useStartSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sessionService.start(id),
    onSuccess: (updatedSession) => {
      // Update session cache
      queryClient.setQueryData(sessionKeys.detail(updatedSession.id), updatedSession);

      // Invalidate my sessions
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });

      toast.success('Session started!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to start session: ${error.message}`);
    }
  });
}

/**
 * End session
 */
export function useEndSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes?: string }) =>
      sessionService.end(id, notes),
    onSuccess: (updatedSession) => {
      // Update session cache
      queryClient.setQueryData(sessionKeys.detail(updatedSession.id), updatedSession);

      // Invalidate my sessions
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });

      // Invalidate request (status changed to completed)
      queryClient.invalidateQueries({ queryKey: requestKeys.detail(updatedSession.request_id) });
      queryClient.invalidateQueries({ queryKey: requestKeys.lists() });

      toast.success('Session completed!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to end session: ${error.message}`);
    }
  });
}

/**
 * Cancel session
 */
export function useCancelSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      sessionService.cancel(id, reason),
    onSuccess: (updatedSession) => {
      // Update session cache
      queryClient.setQueryData(sessionKeys.detail(updatedSession.id), updatedSession);

      // Invalidate my sessions
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });

      // Invalidate request (status changed back to open)
      queryClient.invalidateQueries({ queryKey: requestKeys.detail(updatedSession.request_id) });
      queryClient.invalidateQueries({ queryKey: requestKeys.lists() });

      toast.success('Session cancelled');
    },
    onError: (error: Error) => {
      toast.error(`Failed to cancel session: ${error.message}`);
    }
  });
}

/**
 * Update session notes
 */
export function useUpdateSessionNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      sessionService.updateNotes(id, notes),
    onMutate: async ({ id, notes }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: sessionKeys.detail(id) });

      // Snapshot previous value
      const previousSession = queryClient.getQueryData(sessionKeys.detail(id));

      // Optimistically update
      queryClient.setQueryData(sessionKeys.detail(id), (old: any) => ({
        ...old,
        notes,
        updated_at: new Date().toISOString()
      }));

      return { previousSession };
    },
    onError: (error: Error, { id }, context) => {
      // Rollback on error
      if (context?.previousSession) {
        queryClient.setQueryData(sessionKeys.detail(id), context.previousSession);
      }
      toast.error(`Failed to update notes: ${error.message}`);
    },
    onSuccess: (updatedSession) => {
      // Update cache
      queryClient.setQueryData(sessionKeys.detail(updatedSession.id), updatedSession);

      // Note: No toast for auto-save notes
    }
  });
}
