import api from '../../../lib/api';

export async function createAdmin({ name, email, password }) {
  const { data } = await api.post('/portallogistice/admin/register', {
    name,
    email,
    password,
  });
  return data;
}
