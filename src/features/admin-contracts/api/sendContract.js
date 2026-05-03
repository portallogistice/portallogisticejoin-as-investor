import api from '../../../lib/api';

export async function sendContract(id) {
    const res = await api.post(`/contracts/${id}/send`);
    return res.data;
}