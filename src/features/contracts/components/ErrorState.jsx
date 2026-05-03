// src/features/contracts/components/ErrorState.jsx
export function ErrorState({ error, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
                <i className="fas fa-triangle-exclamation text-2xl text-red-500 dark:text-red-400" aria-hidden="true" />
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mb-4 max-w-sm">{error}</p>
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