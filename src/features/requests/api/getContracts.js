// src/features/requests/api/getContracts.js
import api from '../../../lib/api';

export async function getRentalContracts() {
  const { data } = await api.get('/contracts/me');
  return data.data || [];
}