import { FILTER_STATUS_OPTIONS, FILTER_YEAR_OPTIONS } from '../utils/constants';

export function FilterBar({ filters, onChange, onReset }) {
  return (
    <div className="flex flex-wrap items-end gap-3 mb-5 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex-1 min-w-[140px]">
        <label className="block text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
          الحالة
        </label>
        <select
          value={filters.status}
          onChange={(e) => onChange('status', e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          {FILTER_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[140px]">
        <label className="block text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
          السنة
        </label>
        <select
          value={filters.year}
          onChange={(e) => onChange('year', e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          {FILTER_YEAR_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[140px]">
        <label className="block text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
          الاستحقاق من
        </label>
        <input
          type="date"
          value={filters.due_from}
          onChange={(e) => onChange('due_from', e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex-1 min-w-[140px]">
        <label className="block text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
          إلى
        </label>
        <input
          type="date"
          value={filters.due_to}
          onChange={(e) => onChange('due_to', e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <button
        type="button"
        onClick={onReset}
        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
      >
        <i className="fas fa-rotate-right text-xs" aria-hidden="true" />
        إعادة تعيين
      </button>
    </div>
  );
}
