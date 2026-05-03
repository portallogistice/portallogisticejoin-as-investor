// src/features/invoices/api/getInvoices.js
import api from '../../../lib/api';

export async function getInvoices() {
    const { data } = await api.get('/portallogistice/invoices');
    return data.data || { contracts: [], summary: {} };
}