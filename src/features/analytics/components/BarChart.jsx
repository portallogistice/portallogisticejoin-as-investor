// src/features/analytics/components/BarChart.jsx
import { useMemo } from 'react';
import { fmtSAR } from '../utils/formatters';

export function BarChart({ data, isAr, locale }) {
    const { maxVal, chartData } = useMemo(() => {
        const maxReceived = Math.max(...data.map(d => d.total_amount), 1);
        const maxPending = Math.max(...data.map(d => d.pending_amount), 1);
        const max = Math.max(maxReceived, maxPending, 1);

        const currentMonth = new Date().getMonth() + 1;

        return {
            maxVal: max,
            chartData: data.map(month => ({
                ...month,
                receivedH: Math.round((month.total_amount / max) * 100),
                pendingH: Math.round((month.pending_amount / max) * 100),
                isCurrent: month.month === currentMonth,
            })),
        };
    }, [data]);

    return (
        <div className="flex items-end justify-between h-[180px] sm:h-[200px] gap-1 sm:gap-1.5 pb-7 relative">
            {chartData.map((month) => (
                <div
                    key={month.month}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative"
                >
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 bg-gray-900 dark:bg-gray-700 text-white text-[10px] sm:text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap z-10 pointer-events-none shadow-md">
                        <div className="text-green-400">{fmtSAR(month.total_amount, locale)}</div>
                        {month.pending_amount > 0 && (
                            <div className="text-gray-400">{fmtSAR(month.pending_amount, locale)}</div>
                        )}
                    </div>

                    {/* Bars */}
                    <div className="flex items-end justify-center gap-[2px] w-full h-[calc(100%-24px)]">
                        <div
                            className="w-[40%] sm:w-[45%] bg-gray-200 dark:bg-gray-700 rounded-t-[4px] transition-all duration-500"
                            style={{ height: `${month.pendingH}%`, minHeight: month.pending_amount > 0 ? 2 : 0 }}
                        />
                        <div
                            className="w-[40%] sm:w-[45%] bg-green-500 rounded-t-[4px] transition-all duration-500"
                            style={{ height: `${month.receivedH}%`, minHeight: month.total_amount > 0 ? 2 : 0 }}
                        />
                    </div>

                    {/* Label */}
                    <span className={`absolute bottom-0 text-[9px] sm:text-[10px] whitespace-nowrap
            ${month.isCurrent ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-400 dark:text-gray-500'}`}
                    >
                        {isAr ? month.month_name_ar : month.month_name}
                    </span>
                </div>
            ))}
        </div>
    );
}