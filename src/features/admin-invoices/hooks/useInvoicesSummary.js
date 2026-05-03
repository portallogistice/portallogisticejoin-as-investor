import { useQuery } from '@tanstack/react-query';
import { getInvoicesSummary } from '../api/getInvoicesSummary';

export const INVOICES_SUMMARY_QUERY_KEY = ['admin', 'invoices', 'summary'];

export function useInvoicesSummary() {
  return useQuery({
    queryKey: INVOICES_SUMMARY_QUERY_KEY,
    queryFn: getInvoicesSummary,
    staleTime: 60 * 1000,
  });
}
