// src/features/invoices/api/uploadReceipt.js
import api from '../../../lib/api';

export async function uploadReceipt({ invoiceId, file }) {
    const formData = new FormData();
    formData.append('receipt', file);

    const { data } = await api.post(
        `/portallogistice/invoices/${invoiceId}/receipt`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return data.data;
}