// src/features/dashboard/components/MonthlyDepositCard.jsx
import { fmtSAR } from '../utils/formatters';

export function MonthlyDepositCard({ investment, locale, isAr }) {
    if (investment.monthlyDeposit <= 0) return null;

    return (
        <div className="mb-4 rounded-2xl border border-gray-200 p-5 max-[640px]:rounded-xl max-[640px]:p-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 max-[640px]:flex-col max-[640px]:text-center">
                <div className="flex items-center gap-3.5 max-[640px]:justify-center">
                    <i className="fas fa-arrows-rotate text-xl text-[#073491] dark:text-blue-400" aria-hidden="true" />
                    <div>
                        <p className="mb-0.5 text-xs text-gray-500 dark:text-slate-400">
                            {isAr ? 'الدفعة الشهرية الإجمالية' : 'Total Monthly Payment'}
                        </p>
                        <p className="text-lg font-bold text-gray-900 max-[480px]:text-base dark:text-slate-100">
                            {fmtSAR(investment.monthlyDeposit, locale)} / {isAr ? 'شهر' : 'mo'}
                        </p>
                    </div>
                </div>
                <div className="text-center">
                    <span className="block text-[28px] font-extrabold text-[#073491] max-[640px]:text-2xl max-[480px]:text-[20px] dark:text-blue-400">
                        {investment.monthsPassed}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-slate-400">
                        {isAr ? 'شهر مكتمل من 12' : 'months of 12 completed'}
                    </span>
                </div>
            </div>
        </div>
    );
}