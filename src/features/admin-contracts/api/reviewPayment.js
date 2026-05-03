import api from '../../../lib/api';

export async function reviewPayment(id, amountPaid) {
    const res = await api.post(
        `/admin/contracts/${id}/review-payment`,
        { amount_paid: amountPaid },
        { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data;
}