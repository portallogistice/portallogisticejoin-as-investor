import api from '../../../lib/api';

export async function getPayments(filters) {
    const params = new URLSearchParams({
        page: String(filters.page),
        per_page: '50',
    });
    if (filters.user_id) params.set('user_id', String(filters.user_id));
    if (filters.status) params.set('status', filters.status);
    if (filters.due_from) params.set('due_from', filters.due_from);
    if (filters.due_to) params.set('due_to', filters.due_to);

    const { data } = await api.get(
        `/admin/payments?${params}`,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return {
        payments: data?.data?.payments || [],
        summary: data?.data?.summary || null,
        pagination: data?.data?.pagination || null,
    }
}