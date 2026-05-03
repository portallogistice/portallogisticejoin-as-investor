// src/features/requests/api/createRequest.js
import api from '../../../lib/api';

export async function createRequest(payload) {
  const { data } = await api.post('/portallogistice/requests', payload);
  return data.data;
}