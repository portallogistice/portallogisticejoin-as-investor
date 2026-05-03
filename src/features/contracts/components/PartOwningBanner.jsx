// src/features/contracts/components/PartOwningBanner.jsx
import { useMemo } from 'react';
import { FULL_PRICE, PART_OWNING_COLORS } from '../utils/constants';
import { fmtSAR } from '../utils/formatters';

export function PartOwningBanner({ contract }) {
    const paid = contract.total_amount_paid || 0;
    const remaining = FULL_PRICE - paid;
    const daysLeft = contract.payment_window_days_left;
    const expired = contract.payment_window_expired;
    const pct = Math.min(100, Math.round((paid / FULL_PRICE) * 100));

    const colors = useMemo(() => {
        if (expired) return PART_OWNING_COLORS.expired;
        if (daysLeft !== null && daysLeft <= 10) return PART_OWNING_COLORS.urgent;
        return PART_OWNING_COLORS.normal;
    }, [expired, daysLeft]);

    const chipText = expired
        ? 'انتهت مدة السداد'
        : daysLeft === 0
            ? 'ينتهي اليوم'
            : `${daysLeft} يوم متبقي`;

    return (
        <div className={`rounded-xl border p-4 mt-4 ${colors.banner}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <i className="fas fa-coins text-amber-500" aria-hidden="true" />
                    تفاصيل الدفع
                </span>
                {daysLeft !== null && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.chip}`}>
                        <i className="fas fa-clock text-[10px]" aria-hidden="true" />
                        {chipText}
                    </span>
                )}
            </div>

            {/* Progress */}
            <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                    <span>المدفوع: <strong className="text-gray-900 dark:text-white">{fmtSAR(paid)} ر.س</strong></span>
                    <span className="font-bold text-gray-900 dark:text-white">{pct}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>

            {/* Amounts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2.5 rounded-lg bg-white/60 dark:bg-gray-800/60">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 block mb-1">إجمالي السعر</span>
                    <strong className="text-sm text-gray-900 dark:text-white">{fmtSAR(FULL_PRICE)} ر.س</strong>
                </div>
                <div className="text-center p-2.5 rounded-lg bg-green-50/80 dark:bg-green-900/20">
                    <span className="text-[10px] text-green-600 dark:text-green-400 block mb-1">المدفوع</span>
                    <strong className="text-sm text-green-700 dark:text-green-300">{fmtSAR(paid)} ر.س</strong>
                </div>
                <div className="text-center p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-900/20">
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 block mb-1">المتبقي</span>
                    <strong className="text-sm text-amber-700 dark:text-amber-300">{fmtSAR(remaining)} ر.س</strong>
                </div>
            </div>

            {/* Hints */}
            {paid > 0 && remaining > 0 && !expired && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 text-xs text-blue-700 dark:text-blue-300">
                    <i className="fas fa-circle-info mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>
                        الإيجار الشهري المتوقع إذا سددت الآن: <strong>{fmtSAR(paid * 0.1)} ر.س / شهر</strong>
                        {' '}أو إذا اكتملت القيمة: <strong>660 ر.س / شهر</strong>
                    </span>
                </div>
            )}

            {contract.status === 'receipt_review' && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50/50 dark:bg-amber-900/10 text-xs text-amber-700 dark:text-amber-300 mt-2">
                    <i className="fas fa-hourglass-half mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>الإيصال قيد المراجعة من الإدارة — سيتم تحديث حالتك قريباً.</span>
                </div>
            )}
        </div>
    );
}