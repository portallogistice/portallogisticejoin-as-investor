import React from 'react';
import { formatDate, getDateTag } from '../utils/formatters';
import { DATE_TAG_META } from '../utils/constants';

const TAG_STYLES = {
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800',
};

export function DateCell({ dateStr, isReceived }) {
    const tag = !isReceived ? getDateTag(dateStr) : null;
    const meta = tag ? DATE_TAG_META[tag] : null;

    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-slate-600 dark:text-slate-300">{formatDate(dateStr)}</span>
            {meta && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${TAG_STYLES[meta.color]}`}>
                    <i className={`fas ${meta.icon}`} aria-hidden="true" />
                    {meta.label}
                </span>
            )}
        </div>
    );
}