import api from '../../../lib/api';

export async function verifyOtp({ phone, otp }) {
  const { data } = await api.post('/portallogistice/verify-otp', { phone, otp });
  return data;
}
