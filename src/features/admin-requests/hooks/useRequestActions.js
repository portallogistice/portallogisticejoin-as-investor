import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '../../auth/utils/notify';
import { approveRequest } from '../api/approveRequest';
import { rejectRequest } from '../api/rejectRequest';
import { sendWhatsapp } from '../api/sendWhatsapp';
import { deployContract } from '../api/deployContract';
import { ADMIN_REQUESTS_QUERY_KEY } from './useAdminRequests';

export function useRequestActions() {
  const queryClient = useQueryClient();

  const invalidateRequests = () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_REQUESTS_QUERY_KEY });
  };

  const approve = useMutation({
    mutationFn: approveRequest,
    onSuccess: () => {
      invalidateRequests();
      notify('تم', 'تمت الموافقة على الطلب بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشلت الموافقة على الطلب.', 'danger');
    },
  });

  const reject = useMutation({
    mutationFn: ({ requestId, notes }) => rejectRequest(requestId, notes),
    onSuccess: () => {
      invalidateRequests();
      notify('تم', 'تم رفض الطلب بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشل رفض الطلب.', 'danger');
    },
  });

  const whatsapp = useMutation({
    mutationFn: ({ requestId, message }) => sendWhatsapp(requestId, message),
    onSuccess: () => {
      invalidateRequests();
      notify('تم', 'تم إرسال رسالة واتساب بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشل إرسال رسالة واتساب.', 'danger');
    },
  });

  const deploy = useMutation({
    mutationFn: ({ requestId, file }) => deployContract(requestId, file),
    onSuccess: () => {
      invalidateRequests();
      notify('تم', 'تم نشر العقد بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشل نشر العقد.', 'danger');
    },
  });

  return { approve, reject, whatsapp, deploy };
}
