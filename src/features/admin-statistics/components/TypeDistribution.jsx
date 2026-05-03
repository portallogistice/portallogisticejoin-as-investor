import React from 'react';
import { fmtNum } from '../utils/formatters';

export default function TypeDistribution({ data }) {
  if (!data?.type_distribution) return null;

  const { rental = 0, sale = 0 } = data.type_distribution;
  const total = rental + sale || 1;

  const rentalPct = ((rental / total) * 100).toFixed(1);
  const salePct = ((sale / total) * 100).toFixed(1);

  // SVG donut math — circumference of r=15.9 ≈ 99.9
  const C = 99.9;
  const rentalDash = ((rental / total) * C).toFixed(2);
  const saleDash = ((sale / total) * C).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-1 h-5 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white">توزيع أنواع العقود</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Donut */}
        <div className="relative w-36 h-36 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {/* Track */}
            <circle
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              className="text-gray-100 dark:text-gray-800"
            />
            {/* Rental */}
            <circle
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeDasharray={`${rentalDash} ${(C - rentalDash).toFixed(2)}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              className="transition-all duration-700"
            />
            {/* Sale */}
            <circle
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="3.5"
              strokeDasharray={`${saleDash} ${(C - saleDash).toFixed(2)}`}
              strokeDashoffset={`-${rentalDash}`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white">{fmtNum(total)}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">عقد</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center justify-between p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">استئجار</span>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-emerald-700 dark:text-emerald-400">{fmtNum(rental)}</span>
              <span className="text-xs text-emerald-500 dark:text-emerald-500 mr-1.5">({rentalPct}%)</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-violet-50 dark:bg-violet-950/30 rounded-xl border border-violet-100 dark:border-violet-900/50">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-violet-800 dark:text-violet-300">مبايعة</span>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-violet-700 dark:text-violet-400">{fmtNum(sale)}</span>
              <span className="text-xs text-violet-500 dark:text-violet-500 mr-1.5">({salePct}%)</span>
            </div>
          </div>

          {/* Mini bar */}
          <div className="h-2 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${rentalPct}%` }}
            />
            <div
              className="h-full bg-violet-500 transition-all duration-700"
              style={{ width: `${salePct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
