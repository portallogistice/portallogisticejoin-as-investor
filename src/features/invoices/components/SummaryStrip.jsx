// src/features/invoices/components/SummaryStrip.jsx
export function SummaryStrip({ summary, contractCount }) {
    const items = [
        { num: contractCount, label: 'عقود', color: 'gray' },
        { num: summary.pending || 0, label: 'بانتظار الدفع', color: 'amber' },
        { num: summary.admin_pending || 0, label: 'قيد المراجعة', color: 'blue' },
        { num: summary.approved || 0, label: 'مقبول', color: 'green' },
    ];

    if (summary.rejected > 0) {
        items.push({ num: summary.rejected, label: 'مرفوض', color: 'red' });
    }

    const colorClasses = {
        gray: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white',
        amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400',
        blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400',
        green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400',
        red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400',
    };

    return (
        <div className="mb-5 flex flex-wrap gap-3 max-[640px]:gap-2">
            {items.map((item) => (
                <div
                    key={item.label}
                    className={`min-w-[90px] rounded-xl border px-[18px] py-3 text-center ${colorClasses[item.color]}`}
                >
                    <span className="block text-2xl font-extrabold">{item.num}</span>
                    <span className="mt-1 block text-[11px] opacity-80">{item.label}</span>
                </div>
            ))}
        </div>
    );
}