// src/features/contracts/hooks/useContracts.js
import { useQuery } from '@tanstack/react-query';
import { getContracts } from '../api/getContracts';

export const CONTRACTS_QUERY_KEY = ['contracts'];

export function useContracts() {
  return useQuery({
    queryKey: CONTRACTS_QUERY_KEY,
    queryFn: getContracts,
    staleTime: 60 * 1000, // 1 minute
  });
}