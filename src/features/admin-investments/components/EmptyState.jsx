import React from 'react';

export function EmptyState({ message = 'لا توجد دفعات تطابق الفلتر المحدد.' }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500">
            <i className="fas fa-inbox text-4xl mb-3 opacity-50" aria-hidden="true" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
}