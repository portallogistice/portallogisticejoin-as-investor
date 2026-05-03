// src/features/analytics/components/CompletionCard.jsx
import { fmtSAR } from '../utils/formatters';

export function CompletionCard({ summary, locale, isAr }) {
    const rate = summary.completion_rate || 0;
    const pendingRate = Math.max(0, 100 - rate);

    return (
        <div className=" dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <i className="fas fa-circle-check text-green-600 dark:text-green-400" aria-hidden="true" />
                {isAr ? 'نسبة الإنجاز' : 'Completion Rate'}
            </h2>

            {/* Received Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span>{isAr ? 'المُستلَم' : 'Received'}</span>
                    <strong className="text-gray-900 dark:text-white">{rate}%</strong>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${rate}%` }}
                    />
                </div>
            </div>

            {/* Pending Bar */}
            <div className="mb-5">
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span>{isAr ? 'المعلق' : 'Pending'}</span>
                    <strong className="text-gray-900 dark:text-white">{pendingRate.toFixed(1)}%</strong>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${pendingRate}%` }}
                    />
                </div>
            </div>

            {/* Totals */}
            <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span>{isAr ? 'مُستلَم' : 'Received'}</span>
                    <strong className="text-gray-900 dark:text-white">{fmtSAR(summary.total_received, locale)}</strong>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                    <span>{isAr ? 'معلق' : 'Pending'}</span>
                    <strong className="text-gray-900 dark:text-white">{fmtSAR(summary.pending_payments, locale)}</strong>
                </div>
            </div>
        </div>
    );
}