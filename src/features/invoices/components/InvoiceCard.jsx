// src/features/invoices/components/InvoiceCard.jsx
import { useMemo } from 'react';
import { StatusBadge } from './StatusBadge';
import { YearBadge } from './YearBadge';
import { getYearMeta } from '../utils/formatters';
import { fmtSAR, fmtDate, daysUntil } from '../utils/formatters';

export function InvoiceCard({ invoice, contractActivated, onUpload }) {
    const yearMeta = useMemo(() => getYearMeta(invoice.year), [invoice.year]);
    const days = useMemo(() => daysUntil(invoice.due_date), [invoice.due_date]);

    const isOverdue = days !== null && days < 0 && invoice.status === 'pending';
    const canUpload = invoice.status === 'pending' && contractActivated;

    return (
        <div className={`relative rounded-xl border  p-4 transition-all hover:shadow-md dark:bg-slate-900
      ${isOverdue ? 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10' :
                invoice.status === 'approved' ? 'border-green-200 dark:border-green-800' :
                    'border-gray-200 dark:border-gray-700'}`}
        >
            {/* Year Badge */}
            <div className="absolute top-4 right-4">
                <YearBadge year={invoice.year} />
            </div>

            <div className="space-y-3 pt-7">
                {/* Amounts */}
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">المبلغ السنوي</span>
                        <span className="text-[20px] font-extrabold text-gray-900 dark:text-slate-100">
                            {fmtSAR(invoice.amount)} <small className="text-sm font-normal text-gray-500">ر.س</small>
                        </span>
                    </div>
                    <div className="text-left">
                        <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">شهرياً</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {fmtSAR(invoice.monthly_amount)} ر.س
                        </span>
                    </div>
                </div>

                {/* Due Date */}
                <div className={`flex flex-wrap items-center gap-2 text-[13px]
          ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    <i className="fas fa-calendar-alt" aria-hidden="true" />
                    <span>{fmtDate(invoice.due_date)}</span>
                    {days !== null && invoice.status === 'pending' && (
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold
              ${isOverdue ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                                days <= 30 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                                    'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
                        >
                            {isOverdue ? `متأخر ${Math.abs(days)} يوم` :
                                days === 0 ? 'اليوم' :
                                    `بعد ${days} يوم`}
                        </span>
                    )}
                </div>

                {/* Status */}
                <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={invoice.status} />
                    {invoice.status === 'rejected' && invoice.admin_notes && (
                        <span className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                            <i className="fas fa-circle-info" aria-hidden="true" />
                            {invoice.admin_notes}
                        </span>
                    )}
                </div>

                {/* Not Activated Hint */}
                {!contractActivated && invoice.status === 'pending' && (
                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-2.5 text-sm text-gray-500 dark:bg-slate-800 dark:text-slate-400">
                        <i className="fas fa-lock" aria-hidden="true" />
                        سيتم تفعيل هذه الفاتورة بعد تفعيل العقد
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-1">
                    {invoice.receipt_url && (
                        <a
                            href={invoice.receipt_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            <i className="fas fa-eye" aria-hidden="true" />
                            عرض الإيصال
                        </a>
                    )}

                    {canUpload && (
                        <button
                            type="button"
                            onClick={() => onUpload(invoice)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            <i className="fas fa-cloud-arrow-up" aria-hidden="true" />
                            رفع إيصال الدفع
                        </button>
                    )}

                    {invoice.status === 'admin_pending' && (
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">
                            <i className="fas fa-hourglass-half" aria-hidden="true" />
                            بانتظار موافقة الإدارة
                        </span>
                    )}

                    {invoice.status === 'approved' && (
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20">
                            <i className="fas fa-circle-check" aria-hidden="true" />
                            تم القبول
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}