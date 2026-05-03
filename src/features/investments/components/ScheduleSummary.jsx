import { fmtSAR } from '../utils/formatters';

export function ScheduleSummary({ rows }) {
    const totalPaid = rows.filter((r) => r.status === 'received').reduce((s, r) => s + r.amount, 0);
    const totalAmount = rows.reduce((s, r) => s + r.amount, 0);
    const remaining = totalAmount - totalPaid;

    const pills = [
        { label: 'إجمالي العقد', value: fmtSAR(totalAmount), color: 'text-gray-900 dark:text-white' },
        { label: 'المدفوع', value: fmtSAR(totalPaid), color: 'text-green-700 dark:text-green-400' },
        { label: 'المتبقي', value: fmtSAR(remaining), color: 'text-amber-700 dark:text-amber-400' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            {pills.map((pill) => (
                <div
                    key={pill.label}
                    className="min-w-0 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700"
                >
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">{pill.label}</span>
                    <strong className={`text-sm sm:text-base font-extrabold break-words ${pill.color}`}>{pill.value} ر.س</strong>
                </div>
            ))}
        </div>
    );
}