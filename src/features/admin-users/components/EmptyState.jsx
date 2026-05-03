import React from 'react';

/**
 * Empty-state placeholder shown when a list or resource has no data.
 * @param {{ icon?: string, title: string, subtitle?: string }} props
 */
export function EmptyState({ icon = '👤', title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <span className="text-5xl opacity-40 select-none">{icon}</span>
      <p className="text-base font-semibold text-slate-600 dark:text-slate-300">{title}</p>
      {subtitle && (
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">{subtitle}</p>
      )}
    </div>
  );
}
