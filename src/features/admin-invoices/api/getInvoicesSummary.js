import api from '../../..//lib/api';

export async function getInvoicesSummary() {
  const { data } = await api.get('/admin/invoices/summary');
  return data?.data || null;
}
