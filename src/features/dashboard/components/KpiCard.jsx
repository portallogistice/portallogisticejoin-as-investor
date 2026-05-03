// src/features/dashboard/components/KpiCard.jsx
import { Sparkline } from './Sparkline';

const ACCENT_COLORS = {
    blue: {
        bg: 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800/60',
        icon: 'bg-blue-100 text-blue-700 dark:bg-blue-800/50 dark:text-blue-300',
        spark: '#2563eb',
    },
    green: {
        bg: 'bg-green-50 border-green-200 dark:bg-emerald-900/30 dark:border-emerald-800/60',
        icon: 'bg-green-100 text-green-700 dark:bg-emerald-800/50 dark:text-emerald-300',
        spark: '#10b981',
    },
    amber: {
        bg: 'bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800/60',
        icon: 'bg-amber-100 text-amber-700 dark:bg-amber-800/50 dark:text-amber-300',
        spark: '#f59e0b',
    },
    teal: {
        bg: 'bg-teal-50 border-teal-200 dark:bg-cyan-900/30 dark:border-cyan-800/60',
        icon: 'bg-teal-100 text-teal-700 dark:bg-cyan-800/50 dark:text-cyan-300',
        spark: '#14b8a6',
    },
};

export function KpiCard({ icon, label, value, sub, accent = 'blue', sparkData }) {
    const colors = ACCENT_COLORS[accent];

    return (
        <div className={`flex flex-col gap-1.5 rounded-[14px] border p-[18px] ${colors.bg} max-[640px]:p-4`}>
            <div className="flex justify-between items-start">
                <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-sm ${colors.icon}`}>
                    <i className={`fas ${icon}`} aria-hidden="true" />
                </div>
                {sparkData && <Sparkline data={sparkData} color={colors.spark} />}
            </div>
            <div className="text-[20px] font-extrabold leading-tight text-gray-900 max-[900px]:text-[18px] max-[480px]:text-[16px] dark:text-slate-100">{value}</div>
            <div className="text-xs font-medium text-gray-500 dark:text-slate-300">{label}</div>
            {sub && <div className="text-xs text-gray-400 dark:text-slate-400">{sub}</div>}
        </div>
    );
}