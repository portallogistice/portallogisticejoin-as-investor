// src/features/analytics/api/getAnalyticsSummary.js
import api from '../../../lib/api';

export async function getAnalyticsSummary() {
    const { data } = await api.get('/portallogistice/analytics/summary');
    return data.data;
}