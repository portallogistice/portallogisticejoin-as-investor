import api from '../../../lib/api';

/**
 * Create a new user.
 * @param {{ name: string, national_id: string, phone?: string, email?: string, password: string }} body
 */
export async function createUser(body) {
  const { data } = await api.post('/portallogistice/admin/users', body);
  return data;
}
