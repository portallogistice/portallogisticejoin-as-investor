import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/getUsers';

export const USERS_QUERY_KEY = ['admin-users'];

export function useUsers(search = '') {
    return useQuery({
        queryKey: [...USERS_QUERY_KEY, search],
        queryFn: () => getUsers(search),
        enabled: true,
        staleTime: 30 * 1000,
    });
}