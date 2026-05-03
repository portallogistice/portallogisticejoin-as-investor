// src/features/requests/hooks/useCreateRequest.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRequest } from '../api/createRequest';
import { REQUESTS_QUERY_KEY } from './useRequests';
import { notify } from '../../auth/utils/notify';

export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEY });
      notify(
        'تم',
        `${document.dir === 'rtl' ? 'تم تقديم طلبك بنجاح. سيتواصل معك فريقنا قريباً.' : 'Your request has been submitted. Our team will contact you soon.'}`,
        'success'
      );
      return data;
    },
    onError: (error) => {
      notify('خطأ', `${document.dir === 'rtl' ? 'فشل التحديث' : 'Update failed'}`, 'danger');
    },
  });
}