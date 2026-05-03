// src/features/invoices/hooks/useInvoices.js
import { useQuery } from '@tanstack/react-query';
import { getInvoices } from '../api/getInvoices';

export const INVOICES_QUERY_KEY = ['invoices'];

export function useInvoices() {
    return useQuery({
        queryKey: INVOICES_QUERY_KEY,
        queryFn: getInvoices,
        staleTime: 30 * 1000,
    });
}