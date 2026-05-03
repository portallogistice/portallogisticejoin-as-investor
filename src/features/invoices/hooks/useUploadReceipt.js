// src/features/invoices/hooks/useUploadReceipt.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadReceipt } from '../api/uploadReceipt';
import { INVOICES_QUERY_KEY } from './useInvoices';
import { notify } from '../../auth/utils/notify';

export function useUploadReceipt() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadReceipt,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: INVOICES_QUERY_KEY });
            notify('تم', `${document.dir === 'rtl' ? 'تم رفع الإيصال بنجاح.' : 'Receipt uploaded successfully.'}`, 'success');
        },
        onError: (error) => {
            notify('خطأ', `${document.dir === 'rtl' ? 'فشل التحديث' : 'Update failed'}`, 'danger');
        },
    });
}