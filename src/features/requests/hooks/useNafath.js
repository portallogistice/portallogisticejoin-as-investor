// src/features/requests/hooks/useNafath.js
import { useMutation } from '@tanstack/react-query';
import { initiateNafath } from '../api/initiateNafath';
import { notify } from '../../auth/utils/notify';

export function useNafath() {
  return useMutation({
    mutationFn: ({ requestId }) => initiateNafath(requestId),
    onError: (error) => {
      notify('خطأ', `${document.dir === 'rtl' ? 'فشل بدء التوثيق' : 'Failed to initiate Nafath'}`, 'danger');
    },
  });
}