import React from 'react';
import { PERIOD_OPTIONS } from '../utils/constants';

export default function PeriodSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PERIOD_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border
            ${value === opt.value
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25'
              : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
