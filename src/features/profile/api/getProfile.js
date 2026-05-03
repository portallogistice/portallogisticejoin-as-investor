// src/features/profile/api/getProfile.js
import api from '../../../lib/api';

export async function getProfile() {
    const { data } = await api.get('/portallogistice/profile');
    return data.data?.user ?? data.data ?? null;
}