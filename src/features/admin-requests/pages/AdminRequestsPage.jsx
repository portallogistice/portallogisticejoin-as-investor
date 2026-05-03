import { useState, useCallback } from 'react';
import { useAdminRequests } from '../hooks/useAdminRequests';
import { useRequestActions } from '../hooks/useRequestActions';

import { SummaryCards } from '../components/SummaryCards';
import { FeedbackBanner } from '../components/FeedbackBanner';
import { FilterBar } from '../components/FilterBar';
import { RequestsTable } from '../components/RequestsTable';
import { Pagination } from '../components/Pagination';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';

import { RejectModal } from '../modals/RejectModal.jsx';
import { WhatsappModal } from '../modals/WhatsappModal';
import { InvoiceViewerModal } from '../modals/InvoiceViewerModal';
import { DeployContractModal } from '../modals/DeployContractModal';

const DEFAULT_FILTERS = { status: 'pending', type: '', page: 1 };

export default function AdminRequestsPage() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const { data, isLoading, error } = useAdminRequests(filters);

    const { approve, reject, whatsapp, deploy } = useRequestActions();

    const [actioningId, setActioningId] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [rejectModal, setRejectModal] = useState(null);
    const [whatsappModal, setWhatsappModal] = useState(null);
    const [deployModal, setDeployModal] = useState(null);
    const [invoiceViewer, setInvoiceViewer] = useState(null);

    const requests = data?.requests || [];
    const summary = data?.summary || {};
    const pagination = data?.pagination;

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
        async (req) => {
            setActioningId(req.id);
            try {
                await approve.mutateAsync(req.id);
                setFeedback('تم قبول الطلب.');
            } catch (e) {
                alert(e?.response?.data?.message || 'تعذر قبول الطلب.');
            } finally {
                setActioningId(null);
            }
        },
        [approve]
    );

    const handleReject = useCallback(
        async ({ requestId, notes }) => {
            try {
                await reject.mutateAsync({ requestId, notes });
                setRejectModal(null);
                setFeedback('تم رفض الطلب.');
            } catch (e) {
                // Error handled by mutation
            }
        },
        [reject]
    );

    const handleWhatsapp = useCallback(
        async ({ requestId, message }) => {
            try {
                const updated = await whatsapp.mutateAsync({ requestId, message });
                setWhatsappModal(null);
                setFeedback(`تم إرسال واتساب لـ ${updated?.phone || ''}`);
            } catch (e) {
                // Error handled by mutation
            }
        },
        [whatsapp]
    );

    const handleDeploy = useCallback(
        async ({ requestId, file }) => {
            try {
                await deploy.mutateAsync({ requestId, file });
                setDeployModal(null);
                setFeedback('تم إنشاء العقد وإرفاقه بالطلب.');
            } catch (e) {
                // Error handled by mutation
            }
        },
        [deploy]
    );

    return (
        <div
            className="w-full max-w-[1200px] mx-auto min-w-0 px-3 sm:px-4 pb-6 pt-2 sm:pt-0 text-gray-900 dark:text-gray-100"
            dir="rtl"
        >
            {rejectModal && (
                <RejectModal
                    req={rejectModal}
                    onClose={() => setRejectModal(null)}
                    onSuccess={handleReject}
                    isLoading={reject.isPending}
                    error={reject.error?.response?.data?.message || reject.error?.message}
                />
            )}
            {whatsappModal && (
                <WhatsappModal
                    req={whatsappModal}
                    onClose={() => setWhatsappModal(null)}
                    onSuccess={handleWhatsapp}
                    isLoading={whatsapp.isPending}
                    error={whatsapp.error?.response?.data?.message || whatsapp.error?.message}
                />
            )}
            {deployModal && (
                <DeployContractModal
                    req={deployModal}
                    onClose={() => setDeployModal(null)}
                    onSuccess={handleDeploy}
                    isLoading={deploy.isPending}
                    error={deploy.error?.response?.data?.message || deploy.error?.message}
                />
            )}
            {invoiceViewer && (
                <InvoiceViewerModal invoicePath={invoiceViewer} onClose={() => setInvoiceViewer(null)} />
            )}

            <header className="mb-5 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <span className="inline-flex w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 items-center justify-center shrink-0">
                        <i className="fas fa-inbox" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">إدارة الطلبات</span>
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-prose">
                    مراجعة طلبات المستثمرين وإجراء اللازم
                </p>
            </header>

            <SummaryCards summary={summary} loading={isLoading} />

            <FeedbackBanner message={feedback} onDismiss={() => setFeedback('')} />

            <FilterBar filters={filters} onChange={handleFilterChange} onReset={handleReset} />

            {error && (
                <div
                    className="mb-4 p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-sm"
                    role="alert"
                >
                    {error?.message || 'تعذر تحميل الطلبات.'}
                </div>
            )}

            <section className="rounded-2xl  bg-white dark:bg-gray-900/40 p-3 sm:p-5 shadow-sm min-w-0">
                {isLoading ? (
                    <LoadingState />
                ) : requests.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <RequestsTable
                            requests={requests}
                            onApprove={handleApprove}
                            onReject={setRejectModal}
                            onWhatsapp={setWhatsappModal}
                            onDeploy={setDeployModal}
                            onViewInvoice={setInvoiceViewer}
                            actioning={actioningId}
                        />
                        <Pagination
                            currentPage={filters.page}
                            lastPage={pagination?.last_page || 1}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </section>
        </div>
    );
}
