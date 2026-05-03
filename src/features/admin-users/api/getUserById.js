import api from '../../../lib/api';

/**
 * Fetch a single user by ID.
 * @param {string|number} userId
 */
export async function getUserById(userId) {
  const { data } = await api.get(`/portallogistice/admin/users/${userId}`);
  // Support both { user } and { data: user } shapes
  return data?.data?.user ?? data?.user ?? data?.data ?? data;
}
