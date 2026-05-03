import React from 'react';
import { DateCell } from './DateCell';
import { StatusBadge } from './StatusBadge';
import { formatDate, fmtRial, getDateTag } from '../utils/formatters';

export const PaymentCard = React.memo(({ payment, onUpload }) => {
    const tag = payment.status !== 'received' ? getDateTag(payment.due_date) : null;
    const cardBorder = tag === 'overdue' ? 'border-red-300 dark:border-red-700 ring-1 ring-red-200 dark:ring-red-900/30' :
        tag === 'today' ? 'border-amber-300 dark:border-amber-700 ring-1 ring-amber-200 dark:ring-amber-900/30' :
            tag === 'tomorrow' ? 'border-green-300 dark:border-green-700 ring-1 ring-green-200 dark:ring-green-900/30' :
                'border-slate-200 dark:border-slate-700';

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-xl border p-4 shadow-sm ${cardBorder}`}>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">#{payment.id}</span>
                        <StatusBadge status={payment.status} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{payment.user?.name || '—'}</h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">{payment.user?.national_id || ''}</p>
                </div>
            </div>

            {/* Contract */}
            <div className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">#{payment.contract?.id}</span>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{payment.contract?.title}</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-0.5">الشهر</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{payment.month_number}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-0.5">المبلغ</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{fmtRial(payment.amount)}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-0.5">الاستحقاق</span>
                    <DateCell dateStr={payment.due_date} isReceived={payment.status === 'received'} />
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-0.5">تاريخ الدفع</span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">{formatDate(payment.payment_date)}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
                {payment.receipt_url && (
                    <a href={payment.receipt_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <i className="fas fa-eye" aria-hidden="true" /> عرض الإيصال
                    </a>
                )}
                {payment.status !== 'received' ? (
                    <button type="button" onClick={() => onUpload(payment)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                        <i className="fas fa-cloud-arrow-up" aria-hidden="true" /> رفع إيصال
                    </button>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-2 text-green-600 dark:text-green-400 text-xs font-medium">
                        <i className="fas fa-circle-check" aria-hidden="true" /> مستلم
                    </span>
                )}
            </div>
        </div>
    );
});