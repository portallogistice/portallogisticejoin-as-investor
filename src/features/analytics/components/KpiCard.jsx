// src/features/analytics/components/KpiCard.jsx
import { KPI_COLORS } from '../utils/constants';

export function KpiCard({ icon, label, value, sub, color = 'blue' }) {
    const colors = KPI_COLORS[color];

    return (
        <div className={`rounded-2xl border p-5 flex flex-col gap-2 transition-all hover:shadow-md ${colors.bg} ${colors.border}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${colors.icon}`}>
                <i className={`fas ${icon}`} aria-hidden="true" />
            </div>
            <div className="text-xl font-extrabold text-gray-900 dark:text-white">{value}</div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</div>
            {sub && <div className="text-xs text-gray-400 dark:text-gray-500">{sub}</div>}
        </div>
    );
}