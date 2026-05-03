import api from '../../../lib/api';

export async function uploadReceipt(paymentId, file) {
    const form = new FormData();
    form.append('receipt', file);

    const { data } = await api.post(
        `/admin/payments/${paymentId}/receipt`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
}