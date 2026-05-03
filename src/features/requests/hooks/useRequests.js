// src/features/requests/hooks/useRequests.js
import { useQuery } from '@tanstack/react-query';
import { getRequests } from '../api/getRequests';

export const REQUESTS_QUERY_KEY = ['requests'];

export function useRequests() {
  return useQuery({
    queryKey: REQUESTS_QUERY_KEY,
    queryFn: getRequests,
    staleTime: 30 * 1000, // 30 seconds
  });
}