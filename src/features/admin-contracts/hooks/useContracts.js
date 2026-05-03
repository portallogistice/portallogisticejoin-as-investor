import { useQuery } from '@tanstack/react-query';
import { getContracts } from '../api/getContracts';

export const CONTRACTS_QUERY_KEY = ['admin-contracts'];

export function getContractsQueryKey(params) {
  return [...CONTRACTS_QUERY_KEY, params];
}

export function useContracts(params = { page: 1 }) {
  return useQuery({
    queryKey: getContractsQueryKey(params),
    queryFn: () => getContracts(params),
    staleTime: 60 * 1000,
  });
}