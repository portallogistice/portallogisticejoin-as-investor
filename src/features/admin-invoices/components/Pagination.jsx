export function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <i className="fas fa-chevron-right text-xs" aria-hidden="true" />
        السابق
      </button>

      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 tabular-nums px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700">
        {currentPage} / {lastPage}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        التالي
        <i className="fas fa-chevron-left text-xs" aria-hidden="true" />
      </button>
    </div>
  );
}
