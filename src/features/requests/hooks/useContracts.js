// src/features/requests/hooks/useContracts.js
import { useQuery } from '@tanstack/react-query';
import { getRentalContracts } from '../api/getContracts';

export const RENTAL_CONTRACTS_QUERY_KEY = ['requests', 'rental-contracts'];

export function useRentalContracts() {
  return useQuery({
    queryKey: RENTAL_CONTRACTS_QUERY_KEY,
    queryFn: getRentalContracts,
    staleTime: 60 * 1000,
  });
}
