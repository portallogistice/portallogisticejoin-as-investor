import React, { useMemo } from 'react';
import { TAB_CONFIG } from '../utils/constants';
import { fmtSAR } from '../utils/formatters';

const PERIODS = [
  { key: 'all_time', label: 'جميع الأوقات', icon: 'fa-calendar-alt' },
  { key: 'this_week', label: 'هذا الأسبوع', icon: 'fa-calendar-week' },
  { key: 'this_month', label: 'هذا الشهر', icon: 'fa-calendar-days' },
];

const STAT_KEYS = ['total_count', 'admin_pending_count', 'need_to_pay_count', 'approved_count', 'rejected_count'];
const STAT_LABELS = ['الكل', 'قيد المراجعة', 'بانتظار الدفع', 'مقبولة', 'مرفوضة'];

export function SummaryStrip({ summary }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {PERIODS.map((period) => {
        const data = summary?.[period.key] || {};
        return (
          <div
            key={period.key}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm"
          >
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
              <i className={`fas ${period.icon} text-indigo-500 dark:text-indigo-400`}></i>
              {period.label}
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {STAT_KEYS.map((key, i) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {data[key] ?? 0}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    {STAT_LABELS[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}