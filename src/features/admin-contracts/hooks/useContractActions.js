import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '../../auth/utils/notify';
import { sendContract } from '../api/sendContract';
import { approveContract } from '../api/approveContract';
import { rejectContract } from '../api/rejectContract';
import { reviewPayment } from '../api/reviewPayment';
import { CONTRACTS_QUERY_KEY } from './useContracts';

export function useContractActions() {
  const queryClient = useQueryClient();

  const invalidateContracts = () => {
    queryClient.invalidateQueries({ queryKey: CONTRACTS_QUERY_KEY });
  };

  const send = useMutation({
    mutationFn: sendContract,
    onSuccess: () => {
      invalidateContracts();
      notify('تم', 'تم إرسال العقد بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشل إرسال العقد.', 'danger');
    },
  });

  const approve = useMutation({
    mutationFn: approveContract,
    onSuccess: () => {
      invalidateContracts();
      notify('تم', 'تمت الموافقة على العقد بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشلت الموافقة على العقد.', 'danger');
    },
  });

  const reject = useMutation({
    mutationFn: rejectContract,
    onSuccess: () => {
      invalidateContracts();
      notify('تم', 'تم رفض العقد بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشل رفض العقد.', 'danger');
    },
  });

  const review = useMutation({
    mutationFn: ({ id, amount }) => reviewPayment(id, amount),
    onSuccess: () => {
      invalidateContracts();
      notify('تم', 'تمت مراجعة الدفع بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشلت مراجعة الدفع.', 'danger');
    },
  });

  return { send, approve, reject, review };
}
