import { QueryErrorResetBoundary } from '@tanstack/react-query';
import api from '../../../lib/api';

export async function getAdminInvoices({ status = '', year = '', due_from = '', due_to = '', page = 1, perPage = 50 } = {}) {
  const params = new URLSearchParams({ page: String(page), per_page: String(perPage) });
  if (status) params.set('status', status);
  if (year) params.set('year', year);
  if (due_from) params.set('due_from', due_from);
  if (due_to) params.set('due_to', due_to);

  const { data } = await api.get(`/admin/invoices?${params}`);
  return {
    invoices: data?.data?.invoices || [],
    pagination: data?.data?.pagination || null,
  };

}
