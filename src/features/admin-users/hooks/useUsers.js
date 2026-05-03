import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/getUsers';

export const USERS_QUERY_KEY = (page, search) => ['admin-users', page, search];

/**
 * Paginated + searchable users list.
 * @param {{ page: number, search: string }} options
 */
export function useUsers({ page = 1, search = '' } = {}) {
  return useQuery({
    queryKey: USERS_QUERY_KEY(page, search),
    queryFn: () => getUsers({ page, per_page: 15, search: search || undefined }),
    keepPreviousData: true,
    staleTime: 30_000,
  });
}
