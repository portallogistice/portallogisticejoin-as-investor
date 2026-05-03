export function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center gap-4">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-xl">
        <i className="fas fa-triangle-exclamation" aria-hidden="true" />
      </div>
      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
      >
        <i className="fas fa-rotate-right text-xs" aria-hidden="true" />
        إعادة المحاولة
      </button>
    </div>
  );
}
