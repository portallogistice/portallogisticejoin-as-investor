import api from '../../../lib/api';

/**
 * Activate a user.
 * @param {string|number} userId
 */
export async function activateUser(userId) {
  const { data } = await api.post(`/portallogistice/admin/users/${userId}/activate`);
  return data;
}

/**
 * Deactivate a user.
 * @param {string|number} userId
 */
export async function deactivateUser(userId) {
  const { data } = await api.post(`/portallogistice/admin/users/${userId}/deactivate`);
  return data;
}
