// src/features/analytics/components/NextPaymentCard.jsx
import { fmtSAR, fmtDate } from '../utils/formatters';

export function NextPaymentCard({ nextPayment, locale, isAr }) {
    if (!nextPayment?.amount) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-calendar-check text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    {isAr ? 'الدفعة القادمة' : 'Next Payment'}
                </h2>
                <div className="flex flex-col items-center justify-center py-8 text-green-500">
                    <i className="fas fa-circle-check text-4xl mb-3" aria-hidden="true" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isAr ? 'لا توجد دفعات قادمة' : 'No upcoming payments'}
                    </p>
                </div>
            </div>
        );
    }

    const daysLeft = nextPayment.days_remaining ?? 0;
    const isOverdue = daysLeft < 0;
    const isUrgent = !isOverdue && daysLeft <= 7;

    const amountClass = isOverdue
        ? 'text-red-600 dark:text-red-400'
        : isUrgent
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-blue-700 dark:text-blue-400';

    const chipClass = isOverdue
        ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
        : isUrgent
            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
            : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';

    const chipText = isOverdue
        ? `${isAr ? 'متأخرة بـ' : 'Overdue by'} ${Math.abs(daysLeft)} ${isAr ? 'يوم' : 'days'}`
        : daysLeft === 0
            ? isAr ? 'اليوم' : 'Today'
            : `${isAr ? 'بعد' : 'In'} ${daysLeft} ${isAr ? 'يوم' : 'days'}`;

    return (
        <div className="dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <i className="fas fa-calendar-check text-blue-600 dark:text-blue-400" aria-hidden="true" />
                {isAr ? 'الدفعة القادمة' : 'Next Payment'}
            </h2>

            <div className="text-center py-2">
                <div className={`text-4xl font-extrabold mb-2 ${amountClass}`}>
                    {fmtSAR(nextPayment.amount, locale)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 mb-3">
                    <i className="fas fa-calendar-alt" aria-hidden="true" />
                    {fmtDate(nextPayment.due_date, locale)}
                </div>
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border ${chipClass}`}>
                    {chipText}
                </span>
            </div>
        </div>
    );
}