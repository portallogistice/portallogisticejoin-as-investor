// src/features/requests/api/initiateNafath.js
import api from '../../../lib/api';

export async function initiateNafath(requestId) {
  const { data } = await api.post(`/investor-requests/${requestId}/nafath`);
  return data;
}