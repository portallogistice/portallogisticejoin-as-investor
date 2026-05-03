import React from 'react';

const gradientMap = {
  indigo: 'from-indigo-500 to-violet-600',
  emerald: 'from-emerald-500 to-teal-600',
  amber: 'from-amber-500 to-orange-500',
  red: 'from-red-500 to-rose-600',
  blue: 'from-blue-500 to-cyan-600',
  purple: 'from-violet-500 to-purple-600',
};

const bgMap = {
  indigo: 'bg-indigo-50 dark:bg-indigo-950/30',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/30',
  amber: 'bg-amber-50 dark:bg-amber-950/30',
  red: 'bg-red-50 dark:bg-red-950/30',
  blue: 'bg-blue-50 dark:bg-blue-950/30',
  purple: 'bg-violet-50 dark:bg-violet-950/30',
};

const textMap = {
  indigo: 'text-indigo-600 dark:text-indigo-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  amber: 'text-amber-600 dark:text-amber-400',
  red: 'text-red-600 dark:text-red-400',
  blue: 'text-blue-600 dark:text-blue-400',
  purple: 'text-violet-600 dark:text-violet-400',
};

export default function StatCard({ title, value, subtitle, icon, color = 'indigo', trend }) {
  const gradient = gradientMap[color] || gradientMap.indigo;
  const textColor = textMap[color] || textMap.indigo;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 group min-w-0 w-full">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide sm:tracking-wider mb-1.5 sm:mb-2 leading-snug line-clamp-2 sm:line-clamp-none">
            {title}
          </p>
          <p
            className={`text-xl sm:text-2xl font-bold tabular-nums leading-tight sm:leading-none ${textColor} break-words [overflow-wrap:anywhere] sm:truncate sm:overflow-ellipsis`}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1 leading-snug line-clamp-2">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={`
          w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br ${gradient}
          flex items-center justify-center text-white text-base sm:text-lg shadow-lg shrink-0
          sm:group-hover:scale-110 active:scale-95 sm:active:scale-100 transition-transform duration-200
        `}
        >
          {icon}
        </div>
      </div>

      {trend !== undefined && (
        <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-x-1.5 gap-y-1 sm:gap-2">
          <span
            className={`
            inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full shrink-0
            ${trend >= 0
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
              : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
            }
          `}
          >
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 min-w-0 leading-snug">
            عن الفترة السابقة
          </span>
        </div>
      )}
    </div>
  );
}
