import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadReceipt } from '../api/uploadReceipt';
import { PAYMENTS_QUERY_KEY } from './usePayments';
import { notify } from '../../auth/utils/notify';

export function useUploadReceipt() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ paymentId, file }) => uploadReceipt(paymentId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PAYMENTS_QUERY_KEY });
            notify('تم', `${document.dir === 'rtl' ? 'تم رفع الإيصال بنجاح.' : 'Receipt uploaded successfully.'}`, 'success');
        },
        onError: (error) => {
            notify('خطأ', `${document.dir === 'rtl' ? 'فشل التحديث' : 'Update failed'}`, 'danger');
        },
    });
}