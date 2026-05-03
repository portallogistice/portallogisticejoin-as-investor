export function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;

  const btnClass =
    'inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 px-4 sm:px-3 py-2.5 sm:py-2 rounded-xl sm:rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation active:scale-[0.98]';

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 px-1">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={btnClass}
      >
        <i className="fas fa-chevron-right text-xs" aria-hidden="true" />
        <span>السابق</span>
      </button>

      <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tabular-nums px-4 py-2.5 sm:py-1 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 min-w-[5.5rem] text-center">
        {currentPage} / {lastPage}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
        className={btnClass}
      >
        <span>التالي</span>
        <i className="fas fa-chevron-left text-xs" aria-hidden="true" />
      </button>
    </div>
  );
}
