import React from 'react';
import { fmtSAR } from '../utils/formatters';

export default function FinancialChart({ data }) {
  if (!data?.monthly_chart?.length) return null;

  const chart = data.monthly_chart;
  const maxVal = Math.max(...chart.map(d => d.target || 0), 1);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white">التحصيل المالي الشهري</h3>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-500 dark:text-gray-400">الهدف</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-indigo-500" />
          <span className="text-xs text-gray-500 dark:text-gray-400">المحصّل</span>
        </div>
      </div>

      <div className="space-y-4">
        {chart.map((item) => {
          const targetPct = ((item.target || 0) / maxVal) * 100;
          const collectedPct = ((item.collected || 0) / maxVal) * 100;
          const rate = item.target ? ((item.collected / item.target) * 100).toFixed(0) : 0;
          const isGood = rate >= 75;

          return (
            <div key={`${item.year}-${item.month}`} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {item.month_name_ar} {item.year}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isGood
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                  }`}>
                    {rate}%
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {fmtSAR(item.collected)} / {fmtSAR(item.target)} ر.س
                  </span>
                </div>
              </div>
              <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative">
                {/* Target bg bar */}
                <div
                  className="absolute top-0 right-0 h-full bg-gray-200 dark:bg-gray-700 rounded-xl transition-all duration-700"
                  style={{ width: `${targetPct}%` }}
                />
                {/* Collected bar */}
                <div
                  className="absolute top-0 right-0 h-full rounded-xl transition-all duration-700 flex items-center justify-end pr-3"
                  style={{
                    width: `${collectedPct}%`,
                    background: 'linear-gradient(to left, #4f46e5, #7c3aed)',
                  }}
                >
                  {collectedPct > 18 && (
                    <span className="text-white text-xs font-bold">{fmtSAR(item.collected)}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
