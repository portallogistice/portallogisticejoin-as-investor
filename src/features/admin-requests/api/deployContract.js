import api from '../../../lib/api';

export async function deployContract(requestId, file) {
  const formData = new FormData();
  formData.append('invoice', file);

  const { data } = await api.post(`/admin/requests/${requestId}/deploy-contract`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data?.data;
}
