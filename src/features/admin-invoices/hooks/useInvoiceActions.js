import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '../../auth/utils/notify';
import { approveInvoice } from '../api/approveInvoice';
import { rejectInvoice } from '../api/rejectInvoice';
import { ADMIN_INVOICES_QUERY_KEY } from './useAdminInvoices';
import { INVOICES_SUMMARY_QUERY_KEY } from './useInvoicesSummary';

export function useInvoiceActions() {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_INVOICES_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: INVOICES_SUMMARY_QUERY_KEY });
  };

  const approve = useMutation({
    mutationFn: approveInvoice,
    onSuccess: () => {
      invalidateAll();
      notify('تم', 'تمت الموافقة على الفاتورة بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشلت الموافقة على الفاتورة.', 'danger');
    },
  });

  const reject = useMutation({
    mutationFn: ({ invoiceId, notes }) => rejectInvoice(invoiceId, notes),
    onSuccess: () => {
      invalidateAll();
      notify('تم', 'تم رفض الفاتورة بنجاح.');
    },
    onError: () => {
      notify('خطأ', 'فشل رفض الفاتورة.', 'danger');
    },
  });

  return { approve, reject };
}
