import React, { useCallback, useEffect, useState } from 'react';
import { usePayments } from '../hooks/usePayments';
import { useUsers } from '../hooks/useUsers';
import { useUploadReceipt } from '../hooks/useUploadReceipt';
import { STAT_CONFIG } from '../utils/constants';
import { fmtRial } from '../utils/formatters';

import { StatCard } from '../components/StatCard';
import { PaymentFilters } from '../components/PaymentFilters';
import { PaymentTable } from '../components/PaymentTable';
import { PaymentCard } from '../components/PaymentCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { ReceiptModal } from '../modals/ReceiptModal';

export default function AdminInvestmentsPage() {


    const [modalPayment, setModalPayment] = useState(null);
    const [filters, setFilters] = useState({
        user_id: '', status: '', due_from: '', due_to: '', page: 1,
    });
    const [userSearch, setUserSearch] = useState('');

    const setFilter = useCallback((key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    }, []);

    const resetFilters = useCallback(() => {
        setUserSearch('');
        setFilters({ user_id: '', status: '', due_from: '', due_to: '', page: 1 });
    }, []);

    // Queries
    const { data, isLoading, error, refetch } = usePayments(filters);
    const payments = data?.payments || [];
    const summary = data?.summary;
    const pagination = data?.pagination;

    const { data: users = [], isLoading: usersLoading } = useUsers(userSearch);

    // Mutations
    const uploadMutation = useUploadReceipt();



    // Handlers
    const handleUploadSuccess = useCallback(() => {
        setModalPayment(null);
    }, []);

    const handlePageChange = useCallback((delta) => {
        setFilters((prev) => ({
            ...prev,
            page: Math.max(1, Math.min(pagination?.last_page || 1, prev.page + delta)),
        }));
    }, [pagination?.last_page]);

    // Render stats
    const renderStats = () => {
        if (!summary) return null;
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {STAT_CONFIG.map((cfg) => {
                    const value = summary[cfg.key];
                    const isPeriod = typeof value === 'object';
                    return (
                        <StatCard
                            key={cfg.key}
                            label={cfg.label}
                            value={isPeriod ? value : (cfg.key === 'total_amount' ? fmtRial(value) : value)}
                            sub={isPeriod ? `${value?.contracts_count ?? 0} عقد` : undefined}
                            icon={cfg.icon}
                            color={cfg.color}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300" dir="rtl">
            {/* Receipt Modal */}
            {modalPayment && (
                <ReceiptModal
                    payment={modalPayment}
                    onClose={() => setModalPayment(null)}
                    onSuccess={handleUploadSuccess}
                    uploadMutation={uploadMutation}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                            <i className="fas fa-chart-line text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                            جدولة المستحقات الإيجارية
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            رفع إيصالات الدفع وتتبع حالة الدفعات الشهرية لجميع عقود الاستثمار.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                {!isLoading && renderStats()}

                {/* Filters */}
                <PaymentFilters
                    filters={filters}
                    onChange={setFilter}
                    users={users}
                    usersLoading={usersLoading}
                    userSearch={userSearch}
                    onUserSearch={setUserSearch}
                    onReset={resetFilters}
                />

                {/* Content */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    {isLoading ? (
                        <LoadingState />
                    ) : error ? (
                        <ErrorState
                            message={error?.message || 'تعذر تحميل الدفعات. تحقق من الاتصال وأعد المحاولة.'}
                            onRetry={refetch}
                        />
                    ) : payments.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden lg:block">
                                <PaymentTable payments={payments} onUpload={setModalPayment} />
                            </div>

                            {/* Mobile Cards */}
                            <div className="lg:hidden p-4 space-y-3">
                                {payments.map((p) => (
                                    <PaymentCard key={p.id} payment={p} onUpload={setModalPayment} />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Pagination */}
                    {pagination && pagination.last_page > 1 && (
                        <div className="flex items-center justify-center gap-4 py-4 border-t border-slate-100 dark:border-slate-700">
                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-40"
                                disabled={filters.page <= 1}
                                onClick={() => handlePageChange(-1)}
                            >
                                <i className="fas fa-chevron-right" aria-hidden="true" /> السابق
                            </button>
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                {filters.page} / {pagination.last_page}
                            </span>
                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-40"
                                disabled={filters.page >= pagination.last_page}
                                onClick={() => handlePageChange(1)}
                            >
                                التالي <i className="fas fa-chevron-left" aria-hidden="true" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}