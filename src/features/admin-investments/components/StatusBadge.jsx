import React from 'react';
import { STATUS_META } from '../utils/constants';

const COLOR_STYLES = {
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800',
};

export function StatusBadge({ status }) {
    const meta = STATUS_META[status] || STATUS_META.pending;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${COLOR_STYLES[meta.color]}`}>
            {meta.label}
        </span>
    );
}