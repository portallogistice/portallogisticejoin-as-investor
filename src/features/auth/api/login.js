import api from '../../../lib/api';

export async function loginUser({ login, password }, isAdmin = false) {
  const endpoint = isAdmin
    ? '/portallogistice/admin/login'
    : '/portallogistice/login';

  const requestData = isAdmin
    ? { email: login, password: password }
    : { login: login, password: password };
  const { data } = await api.post(endpoint, requestData);
  return data;
}
