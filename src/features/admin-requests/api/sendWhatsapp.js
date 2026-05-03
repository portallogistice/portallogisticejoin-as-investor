import api from '../../../lib/api';

export async function sendWhatsapp(requestId, message) {
  const { data } = await api.post(`/admin/requests/${requestId}/send-whatsapp`, {
    message: message.trim(),
  });
  return data?.data;
}
