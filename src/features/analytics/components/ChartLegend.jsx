// src/features/analytics/components/ChartLegend.jsx
import { fmtSAR } from '../utils/formatters';

export function ChartLegend({ totalReceived, totalPending, locale, isAr }) {
    return (
        <div className="flex flex-wrap gap-4 sm:gap-6">
            <span className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
                {isAr ? 'مُستلَم' : 'Received'} — {fmtSAR(totalReceived, locale)}
            </span>
            <span className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-600 flex-shrink-0" />
                {isAr ? 'معلق' : 'Pending'} — {fmtSAR(totalPending, locale)}
            </span>
        </div>
    );
}