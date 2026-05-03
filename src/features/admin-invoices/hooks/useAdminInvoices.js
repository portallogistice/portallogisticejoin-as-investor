import { useQuery } from '@tanstack/react-query';
import { getAdminInvoices } from '../api/getAdminInvoices';

export const ADMIN_INVOICES_QUERY_KEY = ['admin', 'invoices'];

export function getAdminInvoicesQueryKey(filters) {
  return [...ADMIN_INVOICES_QUERY_KEY, filters];
}

export function useAdminInvoices(filters) {
  return useQuery({
    queryKey: getAdminInvoicesQueryKey(filters),
    queryFn: () => getAdminInvoices(filters),
    staleTime: 30 * 1000,
  });
}
