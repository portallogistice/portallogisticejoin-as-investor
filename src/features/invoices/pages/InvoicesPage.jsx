// src/features/invoices/pages/InvoicesPage.jsx
import { useState, useCallback } from 'react';
import { useInvoices } from '../hooks/useInvoices';
import { useQueryClient } from '@tanstack/react-query';
import { INVOICES_QUERY_KEY } from '../hooks/useInvoices';

import { ContractSection } from '../components/ContractSection';
import { SummaryStrip } from '../components/SummaryStrip';
import { InfoBox } from '../components/InfoBox';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { ReceiptModal } from '../modals/ReceiptModal';

export default function InvoicesPage() {
    const { data, isLoading } = useInvoices();
    const queryClient = useQueryClient();
    const [modalInvoice, setModalInvoice] = useState(null);

    // Optimistic update after upload
    const handleUploadSuccess = useCallback((updated) => {
        setModalInvoice(null);

        // Update cache directly for instant UI feedback
        queryClient.setQueryData(INVOICES_QUERY_KEY, (old) => {
            if (!old) return old;
            return {
                ...old,
                contracts: old.contracts.map((group) => ({
                    ...group,
                    invoices: group.invoices.map((inv) =>
                        inv.id === updated.id ? { ...inv, ...updated } : inv
                    ),
                })),
                summary: {
                    ...old.summary,
                    pending: Math.max(0, (old.summary?.pending || 0) - 1),
                    admin_pending: (old.summary?.admin_pending || 0) + 1,
                },
            };
        });
    }, [queryClient]);

    const groups = data?.contracts || [];
    const summary = data?.summary || {};

    return (
        <div className="mx-auto max-w-7xl " dir="rtl">

            {/* Header */}
            <div className="mb-5">
                <h1 className="mb-1 flex items-center gap-2.5 text-[22px] font-bold text-gray-900 max-[640px]:text-xl dark:text-slate-100">
                    <i className="fas fa-file-invoice-dollar text-[#073491] dark:text-blue-400" aria-hidden="true" />
                    فواتير الصيانة
                </h1>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                    فواتير تأمين الصيانة السنوية لعقود الاستئجار
                </p>
            </div>

            {/* Summary */}
            {!isLoading && data && (
                <SummaryStrip summary={summary} contractCount={groups.length} />
            )}

            {/* Content */}
            {isLoading ? (
                <LoadingState />
            ) : groups.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-4">
                    {groups.map((group) => (
                        <ContractSection
                            key={group.contract_id}
                            group={group}
                            onUpload={setModalInvoice}
                        />
                    ))}
                </div>
            )}

            {/* Info Box */}
            {!isLoading && groups.length > 0 && <InfoBox />}

            {/* Modal */}
            {modalInvoice && (
                <ReceiptModal
                    invoice={modalInvoice}
                    onClose={() => setModalInvoice(null)}
                    onSuccess={handleUploadSuccess}
                />
            )}
        </div>
    );
}