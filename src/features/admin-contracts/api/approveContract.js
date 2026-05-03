import api from '../../../lib/api';

export async function approveContract(id) {
    const res = await api.post(`/contracts/${id}/admin-approve`);
    return res.data;
}