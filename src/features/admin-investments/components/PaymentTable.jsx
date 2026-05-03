import React from 'react';
import { PaymentRow } from './PaymentRow';

export function PaymentTable({ payments, onUpload }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-indigo-900 dark:bg-indigo-950">
                        <th className="text-right py-3 px-4 font-semibold text-white/90 text-xs whitespace-nowrap">المستثمر</th>
                        <th className="text-right py-3 px-4 font-semibold text-white/90 text-xs whitespace-nowrap">العقد</th>
                        <th className="text-center py-3 px-4 font-semibold text-white/90 text-xs whitespace-nowrap">الشهر</th>
                        <th className="text-right py-3 px-4 font-semibold text-white/90 text-xs whitespace-nowrap">المبلغ</th>
                        <th className="text-center py-3 px-4 font-semibold text-white/90 text-xs whitespace-nowrap">تاريخ الاستحقاق</th>
                        <th className="text-center py-3 px-4 font-semibold text-white/90 text-xs whitespace-nowrap">تاريخ الدفع</th>
                        <th className="text-center py-3 px-4 font-semibold text-white/90 text-xs whitespace-nowrap">الحالة</th>
                        <th className="text-center py-3 px-4 font-semibold text-white/90 text-xs whitespace-nowrap">الإيصال</th>
                        <th className="text-center py-3 px-4 font-semibold text-white/90 text-xs whitespace-nowrap">إجراء</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {payments.map((p) => (
                        <PaymentRow key={p.id} payment={p} onUpload={onUpload} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}