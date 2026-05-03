import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/createUser';
import { USERS_QUERY_KEY } from './useUsers';

/**
 * Mutation: create a new user.
 * Invalidates the users list on success.
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate all pages of the users list
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
