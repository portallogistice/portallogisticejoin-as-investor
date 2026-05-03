import api from '../../../lib/api';

export async function approveRequest(requestId) {
  const { data } = await api.post(`/admin/requests/${requestId}/approve`);
  return data?.data;
}
