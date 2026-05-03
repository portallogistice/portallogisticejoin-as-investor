import React from 'react';

export function ReviewResultBanner({ result, onDismiss }) {
  if (!result) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm animate-in slide-in-from-top-2">
      <i className="fas fa-circle-check text-lg"></i>
      <span className="font-medium flex-1">{result.message}</span>
      {result.days_left !== undefined && (
        <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1 rounded-full">
          متبقي: <strong>{result.days_left} يوم</strong>
        </span>
      )}
      <button
        type="button"
        onClick={onDismiss}
        className="p-1 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
        aria-label="إغلاق"
      >
        <i className="fas fa-times text-xs"></i>
      </button>
    </div>
  );
}