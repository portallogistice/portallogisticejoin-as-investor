import React from 'react';
import { TAB_CONFIG } from '../utils/constants';

export function Tabs({ activeTab, onChange, counts }) {
  return (
    <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
      {TAB_CONFIG.map((t) => {
        const isActive = activeTab === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`relative px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150
              ${isActive
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
          >
            {t.label}
            {counts[t.key] !== undefined && (
              <span className={`ml-1.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-[10px] font-bold
                ${isActive
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                }`}
              >
                {counts[t.key] ?? 0}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}