import { useQuery } from '@tanstack/react-query';
import { getApprovedContracts } from '../api/getApprovedContracts';

export const INVESTMENTS_QUERY_KEY = ['investments', 'approved-contracts'];

export function useInvestments() {
    return useQuery({
        queryKey: INVESTMENTS_QUERY_KEY,
        queryFn: getApprovedContracts,
        staleTime: 2 * 60 * 1000,
    });
}