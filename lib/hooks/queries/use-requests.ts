/**
 * Request Query Hooks
 * Tanstack Query hooks for request operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { requestService } from '@/lib/services/request-service';
import type { RequestFilters } from '@/types/request';
import type { CreateRequestDto, UpdateRequestDto } from '@/lib/services/types';

/**
 * Query key factory for requests
 */
export const requestKeys = {
  all: ['requests'] as const,
  lists: () => [...requestKeys.all, 'list'] as const,
  list: (filters?: RequestFilters) => [...requestKeys.lists(), filters] as const,
  details: () => [...requestKeys.all, 'detail'] as const,
  detail: (id: string) => [...requestKeys.details(), id] as const,
  myRequests: (userId: string) => [...requestKeys.all, 'my', userId] as const
};

/**
 * Get all requests with optional filters
 */
export function useRequests(filters?: RequestFilters) {
  return useQuery({
    queryKey: requestKeys.list(filters),
    queryFn: () => requestService.getAll(filters),
    staleTime: 30 * 1000 // 30 seconds
  });
}

/**
 * Get single request by ID
 */
export function useRequest(id: string) {
  return useQuery({
    queryKey: requestKeys.detail(id),
    queryFn: () => requestService.getById(id),
    enabled: !!id,
    staleTime: 30 * 1000
  });
}

/**
 * Get my requests
 */
export function useMyRequests(userId: string) {
  return useQuery({
    queryKey: requestKeys.myRequests(userId),
    queryFn: () => requestService.getMyRequests(userId),
    enabled: !!userId,
    staleTime: 30 * 1000
  });
}

/**
 * Create new request
 */
export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRequestDto) => requestService.create(data),
    onSuccess: (newRequest) => {
      // Invalidate all request lists
      queryClient.invalidateQueries({ queryKey: requestKeys.lists() });

      // Add to detail cache
      queryClient.setQueryData(requestKeys.detail(newRequest.id), newRequest);

      // Invalidate my requests
      queryClient.invalidateQueries({ queryKey: requestKeys.myRequests(newRequest.created_by) });

      toast.success('Request posted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to post request: ${error.message}`);
      console.error('Create request error:', error);
    }
  });
}

/**
 * Update existing request
 */
export function useUpdateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRequestDto }) =>
      requestService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: requestKeys.detail(id) });

      // Snapshot previous value
      const previousRequest = queryClient.getQueryData(requestKeys.detail(id));

      // Optimistically update
      queryClient.setQueryData(requestKeys.detail(id), (old: any) => ({
        ...old,
        ...data,
        updated_at: new Date().toISOString()
      }));

      return { previousRequest };
    },
    onError: (error: Error, { id }, context) => {
      // Rollback on error
      if (context?.previousRequest) {
        queryClient.setQueryData(requestKeys.detail(id), context.previousRequest);
      }
      toast.error(`Failed to update request: ${error.message}`);
    },
    onSuccess: (updatedRequest, { id }) => {
      // Update cache
      queryClient.setQueryData(requestKeys.detail(id), updatedRequest);

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: requestKeys.lists() });
      queryClient.invalidateQueries({ queryKey: requestKeys.myRequests(updatedRequest.created_by) });

      toast.success('Request updated successfully!');
    }
  });
}

/**
 * Delete request
 */
export function useDeleteRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => requestService.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: requestKeys.detail(id) });

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: requestKeys.lists() });
      queryClient.invalidateQueries({ queryKey: requestKeys.all });

      toast.success('Request deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete request: ${error.message}`);
    }
  });
}
