import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../api/updateUser';
import { USER_QUERY_KEY } from './useUser';

/**
 * Mutation: update a user's profile.
 * Invalidates the specific user cache and the list on success.
 */
export function useUpdateUser(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => updateUser(userId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY(userId) });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
