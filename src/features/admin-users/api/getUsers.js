import api from '../../../lib/api';

/**
 * Fetch paginated admin users list.
 * @param {{ page?: number, per_page?: number, search?: string }} params
 */
export async function getUsers(params = {}) {
  const { data } = await api.get('/portallogistice/admin/users', { params });
  return data?.data ?? data;
}
