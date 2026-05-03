// src/features/contracts/pages/ContractsWorkflowPage.jsx
import { useState, useCallback } from 'react';
import { useContracts } from '../hooks/useContracts';
import { useNafathVerify } from '../hooks/useNafathVerify';
import { useReceiptUpload } from '../hooks/useReceiptUpload';
import { nafathErrorMessage } from '../utils/formatters';

import { ContractsWorkflowGuideBanner } from '../components/ContractsWorkflowGuideBanner';
import { ContractCard } from '../components/ContractCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import PaymentReceiptUploadModal from '../modals/PaymentReceiptUploadModal';
import SaleReceiptUploadModal from '../modals/SaleReceiptUploadModal';

export default function ContractsPage() {
    // Queries & Mutations
    const { data: contracts = [], isLoading, error, refetch } = useContracts();
    const nafathMutation = useNafathVerify();
    const { legacyUpload, saleUpload } = useReceiptUpload();

    // Local UI state
    const [submittingId, setSubmittingId] = useState(null);
    const [nafathFeedback, setNafathFeedback] = useState({});
    const [saleReceiptModal, setSaleReceiptModal] = useState(null);
    const [receiptModal, setReceiptModal] = useState({ open: false, contractId: null });

    // ── Handlers ───────────────────────────────────────────────────────────────

    const handleNafath = useCallback(async (contractId) => {
        setSubmittingId(contractId);
        setNafathFeedback((prev) => ({ ...prev, [contractId]: null }));

        try {
            const result = await nafathMutation.mutateAsync(contractId);
            setNafathFeedback((prev) => ({
                ...prev,
                [contractId]: {
                    ok: true,
                    message: result.message || 'تم إرسال الطلب إلى تطبيق نفاذ 📱 يرجى فتح التطبيق واختيار الرقم للموافقة',
                    challengeNumber: result.challengeNumber,
                },
            }));
        } catch (err) {
            const isExpected = err?.response?.status === 503 || /Sadq config missing/i.test(String(err?.response?.data?.message || ''));
            if (!isExpected) console.error('Nafath failed', err);
            setNafathFeedback((prev) => ({
                ...prev,
                [contractId]: { ok: false, message: nafathErrorMessage(err), challengeNumber: null },
            }));
        } finally {
            setSubmittingId(null);
        }
    }, [nafathMutation]);

    const handleLegacyReceiptSave = useCallback(async (file) => {
        if (!receiptModal.contractId || !file) return;
        try {
            await legacyUpload.mutateAsync({ contractId: receiptModal.contractId, file });
            setReceiptModal({ open: false, contractId: null });
        } catch {
            // Error is surfaced via legacyUpload.error
        }
    }, [receiptModal.contractId, legacyUpload]);

    const handleSaleReceiptSuccess = useCallback((updatedContract) => {
        setSaleReceiptModal(null);
        // Note: saleUpload hook already optimistically updates the cache
    }, []);

    // ── Render ─────────────────────────────────────────────────────────────────

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-5 py-4 sm:py-6 space-y-4 sm:space-y-5" dir="rtl">
                <ContractsWorkflowGuideBanner compact />
                <LoadingState />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-5 py-4 sm:py-6 space-y-4 sm:space-y-5" dir="rtl">
                <ContractsWorkflowGuideBanner compact />
                <ErrorState error={error.message} onRetry={refetch} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-5 py-4 sm:py-6 space-y-4 sm:space-y-5" dir="rtl">
            <ContractsWorkflowGuideBanner />

            {/* Modals */}
            <PaymentReceiptUploadModal
                isOpen={receiptModal.open}
                onClose={() => {
                    if (!legacyUpload.isPending) {
                        setReceiptModal({ open: false, contractId: null });
                    }
                }}
                onSave={handleLegacyReceiptSave}
                isSaving={legacyUpload.isPending}
                error={legacyUpload.error?.response?.data?.message || legacyUpload.error?.message}
                contractId={receiptModal.contractId}
            />

            {saleReceiptModal && (
                <SaleReceiptUploadModal
                    contractId={saleReceiptModal}
                    onClose={() => setSaleReceiptModal(null)}
                    onSuccess={handleSaleReceiptSuccess}
                />
            )}

            {/* Header */}
            <div className="flex items-start justify-between gap-3 sm:gap-4 flex-wrap">
                <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5 sm:gap-3 leading-tight">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-file-contract" aria-hidden="true" />
                        </div>
                        <span className="truncate">عقودي</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-6">
                        متابعة حالة العقود بدءًا من الإرسال حتى التفعيل.
                    </p>
                </div>
            </div>

            {/* Content */}
            {contracts.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl">
                    <EmptyState />
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4">
                    {contracts.map((contract) => (
                        <ContractCard
                            key={contract.id}
                            contract={contract}
                            onNafath={handleNafath}
                            onSaleReceipt={setSaleReceiptModal}
                            onLegacyReceipt={(id) => setReceiptModal({ open: true, contractId: id })}
                            nafathFeedback={nafathFeedback[contract.id]}
                            isNafathLoading={submittingId === contract.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}