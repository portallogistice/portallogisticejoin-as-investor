import React from 'react';
import { DateCell } from './DateCell';
import { StatusBadge } from './StatusBadge';
import { formatDate, fmtRial, getDateTag } from '../utils/formatters';

export const PaymentRow = React.memo(({ payment, onUpload }) => {
    const tag = payment.status !== 'received' ? getDateTag(payment.due_date) : null;
    const rowBg = tag === 'overdue' ? 'bg-red-50/50 dark:bg-red-900/10' :
        tag === 'today' ? 'bg-amber-50/50 dark:bg-amber-900/10' :
            tag === 'tomorrow' ? 'bg-green-50/50 dark:bg-green-900/10' : '';

    return (
        <tr className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${rowBg}`}>
            <td className="py-3 px-4">
                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">{payment.user?.name || '—'}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">{payment.user?.national_id || ''}</span>
                </div>
            </td>
            <td className="py-3 px-4">
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">#{payment.contract?.id}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">{payment.contract?.title}</span>
                </div>
            </td>
            <td className="py-3 px-4 text-center text-sm text-slate-700 dark:text-slate-200">{payment.month_number}</td>
            <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400 text-sm whitespace-nowrap">{fmtRial(payment.amount)}</td>
            <td className="py-3 px-4">
                <DateCell dateStr={payment.due_date} isReceived={payment.status === 'received'} />
            </td>
            <td className="py-3 px-4 text-center text-xs text-slate-500 dark:text-slate-400">{formatDate(payment.payment_date)}</td>
            <td className="py-3 px-4 text-center">
                <StatusBadge status={payment.status} />
            </td>
            <td className="py-3 px-4 text-center">
                {payment.receipt_url ? (
                    <a href={payment.receipt_url} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:underline">
                        <i className="fas fa-eye mr-1" aria-hidden="true" /> عرض
                    </a>
                ) : (
                    <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
                )}
            </td>
            <td className="py-3 px-4 text-center">
                {payment.status !== 'received' ? (
                    <button
                        type="button"
                        onClick={() => onUpload(payment)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                    >
                        <i className="fas fa-cloud-arrow-up" aria-hidden="true" /> رفع إيصال
                    </button>
                ) : (
                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
                        <i className="fas fa-circle-check" aria-hidden="true" /> مستلم
                    </span>
                )}
            </td>
        </tr>
    );
});