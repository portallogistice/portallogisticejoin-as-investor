// src/features/dashboard/components/NextPaymentCard.jsx
import { fmtSAR, formatDate } from '../utils/formatters';

export function NextPaymentCard({ nextPayment, locale, isAr }) {
    const daysLeft = nextPayment?.days_remaining ?? 0;
    const isOverdue = daysLeft < 0;
    const isUrgent = !isOverdue && daysLeft <= 7;

    const amountClass = isOverdue
        ? 'text-red-600 dark:text-red-300'
        : isUrgent
            ? 'text-amber-600 dark:text-amber-300'
            : 'text-[#073491] dark:text-blue-300';

    const chipClass = isOverdue
        ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/60'
        : isUrgent
            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/60'
            : 'bg-green-50 text-green-700 border-green-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/60';

    const chipText = isOverdue
        ? `${isAr ? 'متأخرة بـ' : 'Overdue by'} ${Math.abs(daysLeft)} ${isAr ? 'يوم' : 'days'}`
        : daysLeft === 0
            ? isAr ? 'اليوم' : 'Today'
            : `${isAr ? 'بعد' : 'In'} ${daysLeft} ${isAr ? 'يوم' : 'days'}`;

    if (!nextPayment?.amount) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 py-6 text-green-500 dark:text-emerald-300">
                <i className="fas fa-circle-check text-[32px]" aria-hidden="true" />
                <p className="m-0 text-sm text-gray-500 dark:text-slate-400">
                    {isAr ? 'لا توجد دفعات قادمة' : 'No upcoming payments'}
                </p>
            </div>
        );
    }

    return (
        <div className="pb-5 pt-2.5 text-center">
            <div className={`mb-2 text-[34px] font-extrabold max-[640px]:text-[26px] max-[480px]:text-[22px] ${amountClass}`}>
                {fmtSAR(nextPayment.amount, locale)}
            </div>
            <div className="mb-3 flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-slate-400">
                <i className="fas fa-calendar-alt" aria-hidden="true" />
                {formatDate(nextPayment.due_date, locale)}
            </div>
            <span className={`inline-block rounded-full border px-[18px] py-[5px] text-[13px] font-semibold ${chipClass}`}>
                {chipText}
            </span>
        </div>
    );
}