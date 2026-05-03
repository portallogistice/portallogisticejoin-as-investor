import { FILTER_STATUS_OPTIONS, FILTER_TYPE_OPTIONS } from '../utils/constants';

const selectClass =
  'w-full min-h-[44px] sm:min-h-0 px-3 py-2.5 sm:py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none';

export function FilterBar({ filters, onChange, onReset }) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-3 sm:items-end mb-4 sm:mb-5 p-3 sm:p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 min-w-0">
      <div className="w-full sm:flex-1 sm:min-w-[160px]">
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="admin-req-filter-status">
          الحالة
        </label>
        <select
          id="admin-req-filter-status"
          value={filters.status}
          onChange={(e) => onChange('status', e.target.value)}
          className={selectClass}
        >
          {FILTER_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value || 'all-status'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:flex-1 sm:min-w-[160px]">
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="admin-req-filter-type">
          نوع الطلب
        </label>
        <select
          id="admin-req-filter-type"
          value={filters.type}
          onChange={(e) => onChange('type', e.target.value)}
          className={selectClass}
        >
          {FILTER_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value || 'all-type'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full sm:w-auto shrink-0 min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 touch-manipulation"
      >
        <i className="fas fa-rotate-right text-xs" aria-hidden="true" />
        إعادة تعيين
      </button>
    </div>
  );
}
