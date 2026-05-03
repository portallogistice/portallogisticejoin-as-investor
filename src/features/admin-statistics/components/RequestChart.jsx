import React from 'react';
import { fmtNum } from '../utils/formatters';

export default function RequestChart({ data }) {
  if (!data?.monthly_chart?.length) return null;

  const chart = data.monthly_chart;
  const maxVal = Math.max(
    ...chart.map(d => Math.max(d.renew || 0, d.sell || 0)),
    1
  );

  const totalRenew = chart.reduce((s, d) => s + (d.renew || 0), 0);
  const totalSell = chart.reduce((s, d) => s + (d.sell || 0), 0);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white">الطلبات الشهرية</h3>
      </div>

      {/* Totals */}
      <div className="flex items-center gap-4 mb-4 mt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            تجديد <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">{totalRenew}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-indigo-500" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            بيع <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">{totalSell}</span>
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {chart.map((item) => {
          const renewPct = ((item.renew || 0) / maxVal) * 100;
          const sellPct = ((item.sell || 0) / maxVal) * 100;
          const hasData = (item.renew || 0) + (item.sell || 0) > 0;

          return (
            <div key={`${item.year}-${item.month}`} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {item.month_name_ar} {item.year}
                </span>
                {!hasData && (
                  <span className="text-xs text-gray-400 dark:text-gray-600 italic">لا توجد طلبات</span>
                )}
              </div>

              {/* Renew bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 w-10 text-right shrink-0">
                  تجديد
                </span>
                <div className="flex-1 h-5 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-l from-emerald-500 to-teal-500 rounded-lg transition-all duration-700"
                    style={{ width: `${renewPct}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-6 text-left shrink-0">
                  {fmtNum(item.renew)}
                </span>
              </div>

              {/* Sell bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 w-10 text-right shrink-0">
                  بيع
                </span>
                <div className="flex-1 h-5 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-l from-indigo-500 to-violet-500 rounded-lg transition-all duration-700"
                    style={{ width: `${sellPct}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-6 text-left shrink-0">
                  {fmtNum(item.sell)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
