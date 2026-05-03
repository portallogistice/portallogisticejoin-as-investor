// src/features/analytics/api/getAnalyticsPayments.js
import api from '../../../lib/api';

export async function getAnalyticsPayments() {
    const { data } = await api.get('/portallogistice/analytics/payments');
    return data.data?.monthly_data;
}