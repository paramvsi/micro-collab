/**
 * React Query hooks for user operations
 */

import { useQuery } from '@tanstack/react-query';
import { userService } from '@/lib/services/user-service';

/**
 * Query key factory for user-related queries
 */
export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
};

/**
 * Hook to get user by ID
 */
export function useUser(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => userService.getById(userId),
    enabled: !!userId,
  });
}

/**
 * Hook to get current user profile
 */
export function useProfile() {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: () => userService.getProfile(),
  });
}
