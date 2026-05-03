import { useQuery } from '@tanstack/react-query';
import { getStatisticsData } from '../api/getStatistics';

export const DASHBOARD_QUERY_KEY = ['admin-statistics'];

export function useStatisticsData(period = 'all_time') {
    return useQuery({
        queryKey: [...DASHBOARD_QUERY_KEY, period],
        queryFn: () => getStatisticsData(period),
        staleTime: 60_000,
    });
}