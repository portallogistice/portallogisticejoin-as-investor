import { useEffect } from 'react';

export function FeedbackBanner({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-green-50 dark:bg-green-900/25 border border-green-200 dark:border-green-800 text-green-900 dark:text-green-200 text-sm mb-4 sm:mb-5"
      role="status"
    >
      <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <i className="fas fa-circle-check flex-shrink-0 mt-0.5 sm:mt-0 text-base" aria-hidden="true" />
        <span className="flex-1 font-medium leading-relaxed break-words">{message}</span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="self-end sm:self-center min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 rounded-lg flex items-center justify-center text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors text-xl leading-none touch-manipulation"
        aria-label="إغلاق"
      >
        ×
      </button>
    </div>
  );
}
