// src/features/dashboard/api/dashboard.js
import api from '../../../lib/api';

/**
 * Fetch dashboard overview data
 * GET /portallogistice/dashboard
 */
export async function getDashboardData() {
    const { data } = await api.get('/portallogistice/dashboard');
    return data.data; // Return nested data directly
}