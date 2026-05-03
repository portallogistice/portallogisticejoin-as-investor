import api from '../../../lib/api';

export async function getUsers(search = '') {
    const params = new URLSearchParams({ per_page: '100' });
    if (search.trim()) params.set('search', search.trim());
    const res = await api.get(`/portallogistice/admin/users?${params}`);
    return res.data?.data?.data || [];
}