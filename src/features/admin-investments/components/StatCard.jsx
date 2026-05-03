import React from 'react';
import { fmtRial } from '../utils/formatters';

const COLOR_MAP = {
    indigo: 'border-r-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300',
    amber: 'border-r-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
    red: 'border-r-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
    green: 'border-r-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    violet: 'border-r-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300',
    blue: 'border-r-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
};

const ICON_BG = {
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
    violet: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
};

export function StatCard({ label, value, sub, icon, color }) {
    const isObject = typeof value === 'object' && value !== null;
    const displayValue = isObject ? fmtRial(value?.total_amount) : value;
    const displaySub = isObject ? `${value?.contracts_count ?? 0} عقد` : sub;

    return (
        <div className={`relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border-r-4 ${COLOR_MAP[color] || COLOR_MAP.indigo}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm mb-3 ${ICON_BG[color] || ICON_BG.indigo}`}>
                <i className={`fas ${icon}`} aria-hidden="true" />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{label}</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">{displayValue}</div>
            {displaySub && <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{displaySub}</div>}
        </div>
    );
}