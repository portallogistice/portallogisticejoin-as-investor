// src/features/requests/components/SuccessBanner.jsx
import { useEffect } from 'react';

export function SuccessBanner({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="mb-4 flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-800 dark:text-green-300">
      <i className="fas fa-circle-check text-lg" aria-hidden="true" />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 text-lg leading-none"
        aria-label={`${document.dir === 'rtl' ? 'إغلاق' : 'Close'}`}
      >
        ×
      </button>
    </div>
  );
}