// src/features/dashboard/components/ContractsBreakdown.jsx
const ITEM_COLORS = {
    default: 'bg-gray-50 border-gray-100 dark:bg-slate-800/60 dark:border-slate-700',
    green: 'bg-green-50 border-green-200 dark:bg-emerald-900/30 dark:border-emerald-700/60',
    amber: 'bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700/60',
    blue: 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700/60',
};

const NUM_COLORS = {
    default: 'text-gray-900 dark:text-slate-100',
    green: 'text-green-700 dark:text-emerald-300',
    amber: 'text-amber-700 dark:text-amber-300',
    blue: 'text-blue-700 dark:text-blue-300',
};

export function ContractsBreakdown({ contracts, isAr }) {
    const items = [
        { num: contracts.total ?? 0, label: isAr ? 'الإجمالي' : 'Total', color: 'default' },
        { num: contracts.approved ?? 0, label: isAr ? 'معتمدة' : 'Approved', color: 'green' },
        { num: contracts.pending ?? 0, label: isAr ? 'قيد المراجعة' : 'Pending', color: 'amber' },
        { num: contracts.activated ?? 0, label: isAr ? 'مُفعَّلة' : 'Active', color: 'blue' },
    ];

    return (
        <div className="mt-1 border-t border-gray-100 pt-4 dark:border-slate-700">
            <h3 className="mb-3 text-xs font-semibold text-gray-500 dark:text-slate-400">
                {isAr ? 'ملخص العقود' : 'Contracts Summary'}
            </h3>
            <div className="grid grid-cols-4 gap-2 max-[640px]:grid-cols-2 max-[480px]:gap-1.5">
                {items.map((item) => (
                    <div key={item.label} className={`rounded-[10px] border px-2 py-2.5 text-center ${ITEM_COLORS[item.color]}`}>
                        <span className={`block text-xl font-extrabold max-[480px]:text-base ${NUM_COLORS[item.color]}`}>{item.num}</span>
                        <span className="text-[11px] text-gray-500 max-[480px]:text-[10px] dark:text-slate-400">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}