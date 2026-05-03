import api from '../../../lib/api';

export async function resetPassword({ phone, password, password_confirmation }) {
  const { data } = await api.post('/portallogistice/reset-password', {
    phone,
    password,
    password_confirmation,
  });
  return data;
}
