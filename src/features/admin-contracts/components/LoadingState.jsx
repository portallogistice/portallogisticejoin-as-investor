import React from 'react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500">
      <i className="fas fa-circle-notch fa-spin text-3xl mb-4 text-indigo-500 dark:text-indigo-400"></i>
      <p className="text-sm font-medium">جاري التحميل...</p>
    </div>
  );
}