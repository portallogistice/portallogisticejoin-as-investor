import api from '../../../lib/api';

export async function rejectRequest(requestId, notes = '') {
  const { data } = await api.post(`/admin/requests/${requestId}/reject`, {
    notes: notes.trim() || 'تم رفض الطلب.',
  });
  return data?.data;
}
