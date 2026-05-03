import api from '../../../lib/api';

export async function getAdminRequests({ status = '', type = '', page = 1, perPage = 50 } = {}) {
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  if (type) params.set('type', type);
  params.set('page', String(page));
  params.set('per_page', String(perPage));

  const { data } = await api.get(`/admin/requests?${params}`);
  return {
    requests: data?.data?.requests || [],
    summary: data?.data?.summary || {},
    pagination: data?.data?.pagination || null,
  };
}
