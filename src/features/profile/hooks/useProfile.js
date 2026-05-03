// TODO: React Query profile fetch hook
// src/features/profile/hooks/useProfile.js
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/getProfile';

export const PROFILE_QUERY_KEY = ['profile'];

export function useProfile() {
    return useQuery({
        queryKey: PROFILE_QUERY_KEY,
        queryFn: getProfile,
        staleTime: 2 * 60 * 1000, // 2 minutes
        retry: 2,
    });
}