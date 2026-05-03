// src/features/profile/hooks/useUpdateProfile.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/updateProfile';
import { PROFILE_QUERY_KEY } from './useProfile';
import { notify } from '../../../features/auth/utils/notify';

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,

        onSuccess: (data) => {
            // Invalidate and refetch profile
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });

            const message = data?.message || (document.dir === 'rtl' ? 'تم تحديث الملف الشخصي' : 'Profile updated');
            notify(document.dir === 'rtl' ? 'تم' : 'Success', message, 'success');

            return data;
        },

        onError: (error) => {
            const message = `${document.dir === 'rtl' ? 'فشل التحديث' : 'Update failed'}`;
            notify('Error', message, 'danger');
            throw error;
        },
    });
}