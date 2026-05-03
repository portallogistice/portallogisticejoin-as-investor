// src/features/dashboard/hooks/useDashboard.js
import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../api/dashboard';

export const DASHBOARD_QUERY_KEY = ['dashboard', 'overview'];

export function useDashboard() {
    return useQuery({
        queryKey: DASHBOARD_QUERY_KEY,
        queryFn: getDashboardData,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });
}