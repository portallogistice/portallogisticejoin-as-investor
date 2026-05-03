// src/features/dashboard/components/PaymentBar.jsx
export function PaymentBar({ received, total }) {
    const pct = total > 0 ? Math.round((received / total) * 100) : 0;

    return (
        <div className="mt-1">
            <div className="mb-1.5 flex justify-between text-xs text-gray-500 max-[480px]:text-[11px] dark:text-slate-400">
                <span>الدفعات المكتملة</span>
                <span>{received} / {total}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-700/70">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-[#073491] to-blue-600 transition-all duration-500 dark:from-blue-500 dark:to-blue-400"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}