import React from 'react';

export function LoadingState({ message = 'جاري تحميل الدفعات...' }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500" role="status" aria-live="polite">
            <i className="fas fa-circle-notch fa-spin text-3xl mb-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
}