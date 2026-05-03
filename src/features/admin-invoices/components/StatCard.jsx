import { fmtNum, fmtSAR } from '../utils/formatters';

const COLOR_MAP = {
  amber: {
    stripe: 'bg-amber-500',
    icon: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  blue: {
    stripe: 'bg-blue-500',
    icon: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  green: {
    stripe: 'bg-green-500',
    icon: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  red: {
    stripe: 'bg-red-500',
    icon: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
  purple: {
    stripe: 'bg-purple-500',
    icon: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  },
};

export function StatCard({ label, value, sub, icon, color, isCurrency }) {
  const colors = COLOR_MAP[color] || COLOR_MAP.blue;
  const displayValue = isCurrency ? fmtSAR(value) : fmtNum(value);

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className={`absolute top-0 right-0 w-1 h-full ${colors.stripe}`} />
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm mb-2.5 ${colors.icon}`}>
        <i className={`fas ${icon}`} aria-hidden="true" />
      </div>
      <div className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-xl font-extrabold text-gray-900 dark:text-white tabular-nums leading-none">
        {displayValue}
      </div>
      {sub && <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5">{sub}</div>}
    </div>
  );
}
