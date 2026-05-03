export function ErrorState({ error, onRetry }) {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs sm:text-sm mb-4 sm:mb-5 min-w-0" role="alert">
            <i className="fas fa-triangle-exclamation flex-shrink-0 self-center sm:self-auto text-lg sm:text-base" aria-hidden="true" />
            <span className="flex-1 min-w-0 text-center sm:text-start break-words">{error}</span>
            <button
                type="button"
                onClick={onRetry}
                className="w-full sm:w-auto min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 rounded-xl bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 text-xs font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95 touch-manipulation"
            >
                إعادة المحاولة
            </button>
        </div>
    );
}