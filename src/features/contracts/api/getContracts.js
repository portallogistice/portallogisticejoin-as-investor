// src/features/contracts/api/getContracts.js
import api from '../../../lib/api';

export async function getContracts() {
    const res = await api.get('/contracts/me');
    return res.data?.data || [];
}