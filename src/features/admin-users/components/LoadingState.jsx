import React from 'react';

/**
 * Full-page centred loading spinner with an optional label.
 */
export function LoadingState({ label = '' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      {/* Animated ring */}
      <span className="relative flex h-14 w-14">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30" />
        <span className="relative inline-flex h-14 w-14 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin dark:border-slate-700 dark:border-t-blue-400" />
      </span>
      {label && (
        <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">{label}</p>
      )}
    </div>
  );
}
