import { useQuery } from '@tanstack/react-query';
import { getAdminRequests } from '../api/getAdminRequests';

export const ADMIN_REQUESTS_QUERY_KEY = ['admin', 'requests'];

export function getAdminRequestsQueryKey(filters) {
  return [...ADMIN_REQUESTS_QUERY_KEY, filters];
}

export function useAdminRequests(filters) {
  return useQuery({
    queryKey: getAdminRequestsQueryKey(filters),
    queryFn: () => getAdminRequests(filters),
    staleTime: 30 * 1000,
  });
}
