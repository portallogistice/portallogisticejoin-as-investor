// src/features/requests/api/getRequests.js
import api from '../../../lib/api';

export async function getRequests() {
  const { data } = await api.get('/portallogistice/requests');
  return {
    requests: data.data?.requests || [],
    summary: data.data?.summary || null,
  };
}