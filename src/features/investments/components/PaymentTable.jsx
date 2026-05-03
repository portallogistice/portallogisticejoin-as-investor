import { PaymentRow, PaymentMobileCard } from './PaymentRow';

const HEADERS = ['الشهر', 'بداية الشهر', 'نهاية الشهر', 'قيمة الدفعة', 'تاريخ الدفع', 'الحالة'];

export function PaymentTable({ rows }) {
    return (
        <>
            <ul
                className="sm:hidden list-none m-0 p-0 space-y-2.5 min-w-0"
                aria-label="جدول الدفعات"
            >
                {rows.map((row) => (
                    <li key={row.month} className="min-w-0">
                        <PaymentMobileCard row={row} />
                    </li>
                ))}
            </ul>

            <div
                className="hidden sm:block -mx-0.5 sm:mx-0 overflow-x-auto overscroll-x-contain rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm [scrollbar-gutter:stable]"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                <table className="w-full min-w-[640px] border-collapse text-sm" dir="rtl">
                    <thead>
                        <tr className="bg-gradient-to-b from-blue-700 to-blue-800 dark:from-blue-600 dark:to-blue-700">
                            {HEADERS.map((h) => (
                                <th
                                    key={h}
                                    scope="col"
                                    className="px-2 py-2.5 sm:px-3 sm:py-3 text-right text-[10px] sm:text-xs font-bold text-white whitespace-nowrap tracking-wide"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {rows.map((row) => (
                            <PaymentRow key={row.month} row={row} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
