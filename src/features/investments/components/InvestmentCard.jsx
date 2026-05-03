import { useState } from 'react';
import { useContractPayments } from '../hooks/useContractPayments';
import { getActivationInfo } from '../utils/activation';
import { fmtDate } from '../utils/formatters';
import { CONTRACT_TYPE_CONFIG } from '../utils/constants';

import { ActivationBar } from './ActivationBar';
import { ScheduleSummary } from './ScheduleSummary';
import { PaymentTable } from './PaymentTable';

export function InvestmentCard({ contract }) {
    const [expanded, setExpanded] = useState(false);
    const { activated, activationDate, daysLeft } = getActivationInfo(contract.approved_at);

    const {
        data: paymentData,
        isLoading: scheduleLoading,
        error: scheduleError,
    } = useContractPayments(contract.id, contract, activationDate, expanded && activated);

    const rows = paymentData?.rows || [];
    const scheduleErrorMessage =
        scheduleError?.response?.data?.message ||
        (typeof scheduleError?.message === 'string' ? scheduleError.message : null) ||
        'تعذر تحميل جدول الدفعات.';

    const typeConfig = CONTRACT_TYPE_CONFIG[contract.type] || CONTRACT_TYPE_CONFIG.rental;

    const handleToggle = () => {
        if (!activated) return;
        setExpanded((prev) => !prev);
    };

    return (
        <article className="min-w-0 w-full max-w-full overflow-x-hidden  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-3 sm:p-5 transition-all hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-3">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-1.5">
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 font-mono">
                            #{contract.id}
                        </span>
                        <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${typeConfig.className}`}
                        >
                            {typeConfig.label}
                        </span>
                    </div>
                    <strong className="text-[15px] sm:text-base font-extrabold text-gray-900 dark:text-white block break-words sm:truncate">
                        {contract.title}
                    </strong>
                </div>
                <span className="w-fit max-w-full self-start sm:self-start inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 shrink-0">
                    <i className="fas fa-circle-check" aria-hidden="true" />
                    مكتمل
                </span>
            </div>

            {/* Approval date */}
            <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed break-words">
                تاريخ الاعتماد: <strong className="text-gray-700 dark:text-gray-300">{fmtDate(contract.approved_at)}</strong>
            </p>

            {/* Activation status */}
            {activated ? (
                <div
                    className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-[11px] sm:text-xs leading-relaxed"
                    role="status"
                >
                    <i className="fas fa-circle-check mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0 flex flex-wrap items-center gap-2">
                        <span className="min-w-0 break-words">
                            تاريخ تفعيل الاستثمار: <strong>{fmtDate(activationDate)}</strong>
                        </span>
                        <span className="w-fit px-2 py-1 rounded-md bg-white/70 dark:bg-black/20 text-[11px] font-extrabold sm:ms-auto">
                            مُفعَّل
                        </span>
                    </div>
                </div>
            ) : (
                <div
                    className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs leading-relaxed"
                    role="status"
                >
                    <i className="fas fa-hourglass-half mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="min-w-0 break-words">
                        سيتم تفعيل الاستثمار بتاريخ <strong>{fmtDate(activationDate)}</strong>
                        {' — '}متبقٍ <strong>{daysLeft}</strong> {daysLeft === 1 ? 'يوم' : 'أيام'}
                    </span>
                </div>
            )}

            {/* Progress bar for pending activation */}
            {!activated && daysLeft != null && (
                <ActivationBar approvedAt={contract.approved_at} daysLeft={daysLeft} activated={activated} />
            )}

            {/* Toggle button */}
            <button
                type="button"
                onClick={handleToggle}
                disabled={!activated}
                aria-expanded={activated ? expanded : false}
                aria-controls={activated ? `schedule-${contract.id}` : undefined}
                aria-busy={scheduleLoading}
                id={`toggle-${contract.id}`}
                className={`mt-4 w-full min-h-[48px] sm:min-h-[44px] flex items-center justify-center gap-2 px-3 sm:px-4 py-3.5 sm:py-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all touch-manipulation whitespace-normal text-center leading-snug
          ${activated
                        ? 'bg-gradient-to-r from-blue-700 to-blue-800 dark:from-blue-600 dark:to-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-600'
                    }`}
            >
                {scheduleLoading ? (
                    <>
                        <i className="fas fa-spinner fa-spin" aria-hidden="true" />
                        جاري تحميل الجدول...
                    </>
                ) : (
                    <>
                        <i className={`fas fa-${expanded ? 'chevron-up' : 'table-list'}`} aria-hidden="true" />
                        {expanded ? 'إخفاء جدول الدفعات' : 'عرض جدول الدفعات (12 شهراً)'}
                    </>
                )}
            </button>

            {/* Schedule panel */}
            {expanded && activated && (
                <div
                    id={`schedule-${contract.id}`}
                    role="region"
                    aria-labelledby={`toggle-${contract.id}`}
                    className="mt-4 sm:mt-5 min-w-0 max-w-full overflow-x-hidden animate-in fade-in slide-in-from-top-2 duration-300"
                >
                    {scheduleLoading && (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-6 sm:py-8 px-3 bg-gray-50 dark:bg-gray-700/30 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-center sm:text-start">
                            <div className="w-7 h-7 rounded-full border-2 border-gray-200 dark:border-gray-600 border-t-blue-600 animate-spin" />
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                جاري جلب جدول الدفعات من الخادم...
                            </span>
                        </div>
                    )}

                    {scheduleError && !rows.length && (
                        <div
                            className="flex items-start gap-2.5 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs"
                            role="alert"
                        >
                            <i className="fas fa-circle-exclamation mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>{scheduleErrorMessage}</span>
                        </div>
                    )}

                    {rows.length > 0 && (
                        <>
                            <ScheduleSummary rows={rows} />
                            <PaymentTable rows={rows} />
                        </>
                    )}
                </div>
            )}
        </article>
    );
}