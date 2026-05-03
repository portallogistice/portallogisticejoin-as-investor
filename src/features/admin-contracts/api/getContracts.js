import api from '../../../lib/api';

export async function getContracts({ page = 1, perPage = 50 } = {}) {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('per_page', String(perPage));

  const res = await api.get(`/contracts?${params}`);
  return {
    contracts: res.data?.contracts || [],
    summary: res.data?.summary || {},
    pagination: res.data?.pagination || null,
  };
}