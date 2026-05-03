// src/features/analytics/hooks/useAnalytics.js
import { useQuery } from '@tanstack/react-query';
import { getAnalyticsSummary } from '../api/getAnalyticsSummary';
import { getAnalyticsPayments } from '../api/getAnalyticsPayments';

export const ANALYTICS_QUERY_KEY = ['analytics'];

export function useAnalytics() {
    return useQuery({
        queryKey: ANALYTICS_QUERY_KEY,
        queryFn: async () => {
            const [summaryRes, paymentsRes] = await Promise.allSettled([
                getAnalyticsSummary(),
                getAnalyticsPayments(),
            ]);

            return {
                summary: summaryRes.status === 'fulfilled' ? summaryRes.value : null,
                monthly: paymentsRes.status === 'fulfilled' ? paymentsRes.value : null,
            };
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}