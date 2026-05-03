// src/features/dashboard/components/InvestmentProgress.jsx
import { ProgressRing } from './ProgressRing';
import { PaymentBar } from './PaymentBar';
import { fmtSAR } from '../utils/formatters';

export function InvestmentProgress({ investment, paymentStatus, locale, isAr }) {
    const completionPct = Math.min(
        Math.round((investment.totalReceived / Math.max(investment.total, 1)) * 100),
        100
    );

    const stats = [
        {
            label: isAr ? 'إجمالي الاستثمار' : 'Total Investment',
            value: fmtSAR(investment.total, locale),
            dotClass: 'bg-blue-600 dark:bg-blue-400',
            valueClass: 'text-gray-900 dark:text-white',
        },
        {
            label: isAr ? 'المُستلَم' : 'Received',
            value: fmtSAR(investment.totalReceived, locale),
            dotClass: 'bg-emerald-500 dark:bg-emerald-400',
            valueClass: 'text-emerald-700 dark:text-emerald-300',
        },
        {
            label: isAr ? 'المتبقي' : 'Remaining',
            value: fmtSAR(investment.totalPending, locale),
            dotClass: 'bg-amber-500 dark:bg-amber-400',
            valueClass: 'text-amber-700 dark:text-amber-300',
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200  p-6 max-[640px]:rounded-xl max-[640px]:p-4 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="mb-[18px] flex items-center gap-2 text-[15px] font-bold text-gray-900 max-[640px]:text-sm dark:text-slate-100">
                <i className="fas fa-chart-pie text-[#073491] dark:text-blue-400" aria-hidden="true" />
                {isAr ? 'تقدم الاستثمار' : 'Investment Progress'}
            </h2>

            <div className="mb-5 flex items-center gap-5 max-[640px]:flex-col max-[640px]:items-center max-[640px]:gap-4">
                <ProgressRing pct={completionPct} size={110} stroke={10} color="#2563eb" />

                <div className="flex flex-1 flex-col gap-2.5 max-[640px]:w-full">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex items-center gap-2 text-[13px] text-gray-700 max-[640px]:text-xs dark:text-slate-300">
                            <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${stat.dotClass}`} />
                            <span className="flex-1 text-xs text-gray-500 dark:text-slate-400">{stat.label}</span>
                            <strong className={`text-[13px] font-bold max-[640px]:text-xs ${stat.valueClass}`}>
                                {stat.value}
                            </strong>
                        </div>
                    ))}
                </div>
            </div>

            <PaymentBar received={paymentStatus.received} total={paymentStatus.total} />
        </div>
    );
}