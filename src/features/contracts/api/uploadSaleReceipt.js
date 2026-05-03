// src/features/contracts/api/uploadSaleReceipt.js
import api from '../../../lib/api';

export async function uploadSaleReceipt(contractId, file) {
    const form = new FormData();
    form.append('payment_receipt', file);
    const { data } = await api.post(
        `/contracts/${contractId}/upload-sale-receipt`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data?.data;
}