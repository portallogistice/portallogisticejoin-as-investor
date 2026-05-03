import api from '../../../lib/api';

export async function getUsers(search = '') {
    const params = new URLSearchParams({ per_page: '100' });
    if (search.trim()) params.set('search', search.trim());

    const { data } = await api.get(
        `/admin/users?${params}`,
    );
    console.log('Fetched users', data);
    return data?.data?.data || [];
}