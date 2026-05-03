import api from '../../../lib/api';

export async function approveInvoice(invoiceId) {
  const { data } = await api.post(`/admin/invoices/${invoiceId}/approve`);
  return data?.data;
}
