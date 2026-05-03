import api from '../../../lib/api';

export async function getApprovedContracts() {
    const { data } = await api.get('/contracts/approved-rental');
    return data?.data || [];
}