import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../api/getUserById';

export const USER_QUERY_KEY = (userId) => ['admin-user', String(userId)];

/**
 * Fetch and cache a single user by ID.
 * @param {string|number} userId
 */
export function useUser(userId) {
  return useQuery({
    queryKey: USER_QUERY_KEY(userId),
    queryFn: () => getUserById(userId),
    enabled: Boolean(userId),
    staleTime: 60_000,
  });
}
