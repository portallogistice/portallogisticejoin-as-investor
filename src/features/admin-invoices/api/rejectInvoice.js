import api from '../../../lib/api';

export async function rejectInvoice(invoiceId, notes = '') {
  const { data } = await api.post(`/admin/invoices/${invoiceId}/reject`, {
    notes: notes.trim() || 'تم رفض الإيصال. يرجى إعادة الرفع.',
  });
  return data?.data;
}
