import React from 'react';
import { useTranslation } from 'react-i18next';

function Stat({ label, value, accent }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`text-2xl font-bold tabular-nums ${accent}`}>{value}</span>
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
}

/**
 * A horizontal strip showing aggregate user counts.
 * @param {{ total: number, activeCount: number, inactiveCount: number }} props
 */
export function SummaryStrip({ total = 0, activeCount = 0, inactiveCount = 0 }) {
  const { t } = useTranslation(['common']);

  return (
    <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 px-6 py-4">
      <div className="pr-6">
        <Stat label={t('admin.users.total_users', { count: '' }).trim()} value={total} accent="text-slate-800 dark:text-slate-100" />
      </div>
      <div className="px-6">
        <Stat label={t('admin.users.active')} value={activeCount} accent="text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="pl-6">
        <Stat label={t('admin.users.inactive')} value={inactiveCount} accent="text-rose-500 dark:text-rose-400" />
      </div>
    </div>
  );
}
