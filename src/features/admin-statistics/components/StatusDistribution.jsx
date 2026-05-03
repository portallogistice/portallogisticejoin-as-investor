import React from 'react';
import { STATUS_LABELS, REQUEST_STATUS_LABELS } from '../utils/constants';
import { fmtNum } from '../utils/formatters';

const colorMap = {
  emerald: 'bg-emerald-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-violet-500',
  gray: 'bg-gray-400',
};

const badgeMap = {
  emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400',
  red: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400',
  amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400',
  blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400',
  orange: 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400',
  indigo: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400',
  purple: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400',
  gray: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
};

function StatusPanel({ title, accentColor, statuses, labelMap }) {
  const total = Object.values(statuses).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <span className={`w-1 h-5 rounded-full ${accentColor}`} />
        <h3 className="text-base font-bold text-gray-900 dark:text-white">{title}</h3>
        <span className="mr-auto text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
          {fmtNum(total)} إجمالي
        </span>
      </div>
      <div className="space-y-3.5">
        {Object.entries(statuses).map(([key, count]) => {
          const meta = labelMap[key] || { text: key, color: 'gray' };
          const pct = ((count / total) * 100).toFixed(1);

          return (
            <div key={key} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{meta.text}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeMap[meta.color] || badgeMap.gray}`}>
                    {pct}%
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{fmtNum(count)}</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colorMap[meta.color] || colorMap.gray} rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function StatusDistribution({ contracts, requests }) {
  if (!contracts?.status_distribution && !requests?.status_distribution) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {contracts?.status_distribution && (
        <StatusPanel
          title="توزيع حالات العقود"
          accentColor="bg-emerald-500"
          statuses={contracts.status_distribution}
          labelMap={STATUS_LABELS}
        />
      )}
      {requests?.status_distribution && (
        <StatusPanel
          title="توزيع حالات الطلبات"
          accentColor="bg-blue-500"
          statuses={requests.status_distribution}
          labelMap={REQUEST_STATUS_LABELS}
        />
      )}
    </div>
  );
}
