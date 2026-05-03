import { fmtDateShort, fmtSAR } from '../utils/formatters';
import { StatusPill } from './StatusPill';

function Field({ label, children, strong }) {
    return (
        <div className="min-w-0">
            <span className="text-[10px] font-semibold tracking-wide text-gray-500 dark:text-gray-400 block mb-0.5">
                {label}
            </span>
            <span
                className={`text-xs text-gray-800 dark:text-gray-200 block break-words ${strong ? 'font-extrabold text-gray-900 dark:text-white' : ''}`}
            >
                {children}
            </span>
        </div>
    );
}

/** Stacked layout for narrow viewports (no horizontal scroll). */
export function PaymentMobileCard({ row }) {
    return (
        <article
            className="rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800/80 p-3 shadow-sm"
            dir="rtl"
        >
            <div className="flex flex-wrap items-start justify-between gap-2 gap-y-1 pb-2.5 mb-2.5 border-b border-gray-100 dark:border-gray-700">
                <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 block mb-0.5">
                        الشهر
                    </span>
                    <p className="text-sm font-extrabold text-gray-900 dark:text-white leading-tight break-words">
                        {row.month}
                    </p>
                </div>
                <div className="min-w-0 shrink max-w-[58%] flex justify-end sm:max-w-none">
                    <StatusPill status={row.status} wrap className="min-h-[1.75rem] py-1.5" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <Field label="بداية الشهر">{fmtDateShort(row.start)}</Field>
                <Field label="نهاية الشهر">{fmtDateShort(row.end)}</Field>
                <Field label="قيمة الدفعة" strong>
                    {fmtSAR(row.amount)} ر.س
                </Field>
                <Field label="تاريخ الدفع">
                    {row.payment_date ? fmtDateShort(row.payment_date) : '—'}
                </Field>
            </div>
        </article>
    );
}

export function PaymentRow({ row }) {
    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <td className="px-2 py-2 sm:px-3 sm:py-2.5 text-right text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {row.month}
            </td>
            <td className="px-2 py-2 sm:px-3 sm:py-2.5 text-right text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {fmtDateShort(row.start)}
            </td>
            <td className="px-2 py-2 sm:px-3 sm:py-2.5 text-right text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {fmtDateShort(row.end)}
            </td>
            <td className="px-2 py-2 sm:px-3 sm:py-2.5 text-right text-[11px] sm:text-xs font-extrabold text-gray-900 dark:text-white whitespace-nowrap">
                {fmtSAR(row.amount)} ر.س
            </td>
            <td className="px-2 py-2 sm:px-3 sm:py-2.5 text-right text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {row.payment_date ? fmtDateShort(row.payment_date) : '—'}
            </td>
            <td className="px-2 py-2 sm:px-3 sm:py-2.5 text-right">
                <StatusPill status={row.status} />
            </td>
        </tr>
    );
}
