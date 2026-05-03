import { SUMMARY_CARDS } from '../utils/constants';

const COLOR_MAP = {
  amber: 'bg-amber-50 dark:bg-amber-900/25 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
  blue: 'bg-blue-50 dark:bg-blue-900/25 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
  green: 'bg-green-50 dark:bg-green-900/25 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  red: 'bg-red-50 dark:bg-red-900/25 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
  purple: 'bg-purple-50 dark:bg-purple-900/25 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300',
  orange: 'bg-orange-50 dark:bg-orange-900/25 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300',
};

export function SummaryCards({ summary, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[4.5rem] sm:h-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!summary || Object.keys(summary).length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-5">
      {SUMMARY_CARDS.map((card) => {
        const value = summary[card.key] ?? 0;
        const colorClass = COLOR_MAP[card.color];

        return (
          <div
            key={card.key}
            className={`min-w-0 p-3 sm:p-3.5 rounded-xl border transition-all hover:shadow-md active:scale-[0.99] ${colorClass}`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 min-w-0">
              <i className={`fas ${card.icon} text-[10px] sm:text-xs opacity-80 shrink-0`} aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-semibold opacity-90 leading-tight line-clamp-2">
                {card.label}
              </span>
            </div>
            <strong className="text-lg sm:text-xl font-extrabold tabular-nums block truncate">
              {value.toLocaleString('ar-SA')}
            </strong>
          </div>
        );
      })}
    </div>
  );
}
