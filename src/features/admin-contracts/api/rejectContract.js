import api from '../../../lib/api';

export async function rejectContract(id) {
    const res = await api.post(`/contracts/${id}/reject`);
    return res.data;
}