import { useQuery } from '@tanstack/react-query';
import { getPayments } from '../api/getPayments';

export const PAYMENTS_QUERY_KEY = ['admin-payments'];

export function usePayments(filters) {
    return useQuery({
        queryKey: [...PAYMENTS_QUERY_KEY, filters],
        queryFn: () => getPayments(filters),
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
    });
}