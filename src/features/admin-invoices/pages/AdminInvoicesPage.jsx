import { useState, useCallback } from 'react';
import { useAdminInvoices } from '../hooks/useAdminInvoices';
import { useInvoicesSummary } from '../hooks/useInvoicesSummary';
import { useInvoiceActions } from '../hooks/useInvoiceActions';

import { SummaryCards } from '../components/SummaryCards';
import { FilterBar } from '../components/FilterBar';
import { InvoicesTable } from '../components/InvoicesTable';
import { InvoiceMobileCard } from '../components/InvoiceMobileCard';
import { Pagination } from '../components/Pagination';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { RejectModal } from '../modals/RejectModal';

const DEFAULT_FILTERS = { status: 'admin_pending', year: '', due_from: '', due_to: '', page: 1 };

export default function AdminInvoicesPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const { data: invoicesData, isLoading: invoicesLoading, error: invoicesError } = useAdminInvoices(filters);
  const { data: summary, isLoading: summaryLoading } = useInvoicesSummary();
  const { approve, reject } = useInvoiceActions();

  const [approvingId, setApprovingId] = useState(null);
  const [rejectModal, setRejectModal] = useState(null);

  const invoices = invoicesData?.invoices || [];
  const pagination = invoicesData?.pagination;

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleApprove = useCallback(
    async (invoice) => {
      setApprovingId(invoice.id);
      try {
        await approve.mutateAsync(invoice.id);
      } catch (e) {
        alert(e?.response?.data?.message || 'تعذر قبول الفاتورة.');
      } finally {
        setApprovingId(null);
      }
    },
    [approve]
  );

  const handleReject = useCallback(
    async ({ invoiceId, notes }) => {
      try {
        await reject.mutateAsync({ invoiceId, notes });
        setRejectModal(null);

      } catch {
        // Error surfaced by mutation
      }
    },
    [reject]
  );

  const isLoading = invoicesLoading || summaryLoading;

  return (
    <div className="max-w-[1200px] mx-auto px-3 sm:px-5 py-5 sm:py-7" dir="rtl">
      {/* Reject Modal */}
      {rejectModal && (
        <RejectModal
          invoice={rejectModal}
          onClose={() => setRejectModal(null)}
          onSuccess={handleReject}
          isLoading={reject.isPending}
          error={reject.error?.response?.data?.message || reject.error?.message}
        />
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 flex items-center justify-center">
            <i className="fas fa-file-invoice-dollar" aria-hidden="true" />
          </div>
          إدارة مخصصات الصيانة التشغيلية
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          مراجعة وقبول أو رفض إيصالات تأمين الصيانة للمستثمرين
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards summary={summary} loading={summaryLoading} />

      {/* Filters */}
      <FilterBar filters={filters} onChange={handleFilterChange} onReset={handleReset} />

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-5 shadow-sm">
        {invoicesLoading ? (
          <LoadingState />
        ) : invoicesError ? (
          <ErrorState
            error={invoicesError?.message || 'تعذر تحميل الفواتير. تحقق من الاتصال وأعد المحاولة.'}
            onRetry={() => window.location.reload()}
          />
        ) : invoices.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <InvoicesTable
                invoices={invoices}
                onApprove={handleApprove}
                onReject={setRejectModal}
                approving={approvingId}
              />
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {invoices.map((invoice) => (
                <InvoiceMobileCard
                  key={invoice.id}
                  invoice={invoice}
                  onApprove={handleApprove}
                  onReject={setRejectModal}
                  approving={approvingId}
                />
              ))}
            </div>

            <Pagination
              currentPage={filters.page}
              lastPage={pagination?.last_page || 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
