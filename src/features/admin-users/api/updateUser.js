import api from '../../../lib/api';

/**
 * Update an existing user's profile.
 * @param {string|number} userId
 * @param {object} body — only editable fields (backend ignores unchanged unique fields)
 */
export async function updateUser(userId, body) {
  // Try PUT first; fall back to POST with _method override if server doesn't support PUT
  try {
    const { data } = await api.put(`/portallogistice/admin/users/${userId}`, body);
    return data;
  } catch (err) {
    if (err?.response?.status === 405) {
      const { data } = await api.post(`/portallogistice/admin/users/${userId}`, {
        ...body,
        _method: 'PUT',
      });
      return data;
    }
    throw err;
  }
}
