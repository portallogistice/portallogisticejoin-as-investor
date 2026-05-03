import React, { useState, useMemo, useCallback } from 'react';
import { useContracts } from '../hooks/useContracts';
import { useUsers } from '../hooks/useUsers';
import { useCreateContract } from '../hooks/useCreateContract';
import { useContractActions } from '../hooks/useContractActions';
import { TAB_FILTERS } from '../utils/constants';

import { SummaryStrip } from '../components/SummaryStrip';
import { CreateContractForm } from '../components/CreateContractForm';
import { Tabs } from '../components/Tabs';
import { ContractTable } from '../components/ContractTable';
import { ContractCard } from '../components/ContractCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { ReviewPaymentModal } from '../modals/ReviewPaymentModal';
import { ReviewResultBanner } from '../components/ReviewResultBanner';
import { Pagination } from '../components/Pagination';

export default function AdminContractsPage() {
  const [tab, setTab] = useState('pending');
  const [page, setPage] = useState(1);
  const [reviewModal, setReviewModal] = useState(null);
  const [reviewResult, setReviewResult] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const { data, isLoading, error, refetch } = useContracts({ page });
  const contracts = data?.contracts || [];
  const summary = data?.summary || {};
  const pagination = data?.pagination;

  const { data: users = [], isLoading: usersLoading } = useUsers();

  const createMutation = useCreateContract();
  const { send, approve, reject, review } = useContractActions();

  const filteredContracts = useMemo(
    () => contracts.filter(TAB_FILTERS[tab] || (() => true)),
    [contracts, tab]
  );

  const tabCounts = useMemo(() => ({
    all: summary.all_time?.total_count ?? 0,
    pending: summary.all_time?.admin_pending_count ?? 0,
    need_to_pay: summary.all_time?.need_to_pay_count ?? 0,
    approved: summary.all_time?.approved_count ?? 0,
    rejected: summary.all_time?.rejected_count ?? 0,
  }), [summary]);

  const handleTabChange = useCallback((nextTab) => {
    setTab(nextTab);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
  }, []);

  const handleCreate = useCallback(async (form, resetForm) => {
    try {
      await createMutation.mutateAsync(form);
      resetForm();
    } catch {
      // Error handled by mutation
    }
  }, [createMutation]);

  const handleAction = useCallback(async (action, payload) => {
    if (action === 'review') {
      setReviewModal(payload);
      return;
    }
    setActionLoadingId(payload);
    try {
      if (action === 'send') await send.mutateAsync(payload);
      if (action === 'approve') await approve.mutateAsync(payload);
      if (action === 'reject') await reject.mutateAsync(payload);
    } finally {
      setActionLoadingId(null);
    }
  }, [send, approve, reject]);

  const handleReviewSuccess = useCallback(async (amount) => {
    if (!reviewModal) return;
    const result = await review.mutateAsync({ id: reviewModal.id, amount });
    setReviewModal(null);
    setReviewResult(result);
  }, [review, reviewModal]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Review Result Banner */}
        <ReviewResultBanner result={reviewResult} onDismiss={() => setReviewResult(null)} />

        {/* Page Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <div className="mb-5">
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <i className="fas fa-file-contract text-indigo-500 dark:text-indigo-400"></i>
              إدارة العقود
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              إدارة دورة العقود من الإرسال حتى الاعتماد النهائي.
            </p>
          </div>
          <SummaryStrip summary={summary} />
        </div>

        {/* Create Form */}
        <CreateContractForm
          users={users}
          usersLoading={usersLoading}
          onSubmit={handleCreate}
          submitting={createMutation.isPending}
        />

        {/* Contracts List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
              <i className="fas fa-table-list text-indigo-500 dark:text-indigo-400"></i>
              قائمة العقود
            </h3>
            <Tabs activeTab={tab} onChange={handleTabChange} counts={tabCounts} />
          </div>

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error?.message || 'تعذر تحميل العقود.'} onRetry={refetch} />
          ) : filteredContracts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <ContractTable
                  contracts={filteredContracts}
                  onAction={handleAction}
                  actionLoadingId={actionLoadingId}
                />
              </div>
              {/* Mobile Cards */}
              <div className="md:hidden p-4 space-y-3">
                {filteredContracts.map((contract) => (
                  <ContractCard
                    key={contract.id}
                    contract={contract}
                    onAction={handleAction}
                    actionLoadingId={actionLoadingId}
                  />
                ))}
              </div>
              <Pagination
                currentPage={page}
                lastPage={pagination?.last_page || 1}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      {/* Review Payment Modal */}
      {reviewModal && (
        <ReviewPaymentModal
          contract={reviewModal}
          onClose={() => setReviewModal(null)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
}