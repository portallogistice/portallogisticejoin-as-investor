import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activateUser, deactivateUser } from '../api/toggleUserStatus';
import { USER_QUERY_KEY } from './useUser';

/**
 * Mutation: activate or deactivate a user.
 * @param {string|number} userId
 */
export function useToggleUserStatus(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ action }) =>
      action === 'activate' ? activateUser(userId) : deactivateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY(userId) });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}
