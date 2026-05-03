import React from 'react';

export function ErrorState({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-red-500 dark:text-red-400" role="alert">
            <i className="fas fa-triangle-exclamation text-3xl mb-3" aria-hidden="true" />
            <p className="text-sm font-medium mb-4 text-center px-4">{message}</p>
            {onRetry && (
                <button type="button" onClick={onRetry} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium">
                    <i className="fas fa-rotate-right" aria-hidden="true" /> إعادة المحاولة
                </button>
            )}
        </div>
    );
}