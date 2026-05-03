// src/features/profile/api/updateProfile.js
import api from '../../../lib/api';

export async function updateProfile(payload) {
    const { data } = await api.put('/portallogistice/profile', payload);
    return data;
}