// src/features/dashboard/pages/OverviewPage.jsx
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Watch } from 'react-loader-spinner';
import { useDashboard } from '../hooks/useDashboard';
import { STATIC_DATA, fmtSAR } from '../utils/formatters';

import { GreetingHeader } from '../components/GreetingHeader';
import { KpiCard } from '../components/KpiCard';
import { InvestmentProgress } from '../components/InvestmentProgress';
import { NextPaymentCard } from '../components/NextPaymentCard';
import { ContractsBreakdown } from '../components/ContractsBreakdown';
import { MonthlyDepositCard } from '../components/MonthlyDepositCard';



export default function DashboardPage() {
    const { i18n } = useTranslation(['common']);
    const isAr = i18n.language === 'ar';
    const locale = isAr ? 'ar' : 'en';

    const { data, isLoading, error } = useDashboard();

    // Derived data with fallbacks
    const inv = data?.investment ?? STATIC_DATA.investment;
    const cs = data?.contracts ?? STATIC_DATA.contracts;
    const ps = data?.paymentStatus ?? STATIC_DATA.paymentStatus;
    const next = data?.nextPayment ?? STATIC_DATA.nextPayment;
    const user = data?.user ?? {};

    // Sparkline data
    const sparkReceived = useMemo(() => {
        const base = Array.from({ length: 6 }, (_, i) =>
            i < (inv.monthsPassed % 6) ? (inv.monthlyDeposit || 1000) : 0
        );
        return base.some(v => v > 0) ? base : [1, 2, 3, 2, 4, 3];
    }, [inv.monthsPassed, inv.monthlyDeposit]);


    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
                <Watch height="52" width="52" radius="9" color="#073491" ariaLabel="loading" />
                <p className="text-sm font-semibold text-[#073491] dark:text-blue-400">
                    {isAr ? 'جاري التحميل...' : 'Loading...'}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-[1100px] px-5 py-6 max-[1200px]:px-4 max-[640px]:max-w-full max-[640px]:px-3 max-[480px]:px-2" dir={isAr ? 'rtl' : 'ltr'}>

            <GreetingHeader user={user} error={error?.message} isAr={isAr} />

            {/* KPI Grid */}
            <div className="mb-5 grid grid-cols-1 gap-3.5 min-[640px]:grid-cols-2 min-[900px]:grid-cols-4 max-[480px]:gap-2.5">
                <KpiCard
                    icon="fa-wallet"
                    label={isAr ? 'إجمالي الاستثمار' : 'Total Investment'}
                    value={fmtSAR(inv.total, locale)}
                    sub={`${cs.approved || 0} ${isAr ? 'عقد معتمد' : 'approved contracts'}`}
                    accent="blue"
                />
                <KpiCard
                    icon="fa-money-bill-wave"
                    label={isAr ? 'إجمالي المُستلَم' : 'Total Received'}
                    value={fmtSAR(inv.totalReceived, locale)}
                    sub={`${ps.received} ${isAr ? 'دفعة مكتملة' : 'completed payments'}`}
                    accent="green"
                    sparkData={sparkReceived}
                />
                <KpiCard
                    icon="fa-clock"
                    label={isAr ? 'المبلغ المتبقي' : 'Remaining Amount'}
                    value={fmtSAR(inv.totalPending, locale)}
                    sub={`${ps.pending} ${isAr ? 'دفعة قادمة' : 'pending payments'}`}
                    accent="amber"
                />
                <KpiCard
                    icon="fa-file-contract"
                    label={isAr ? 'العقود النشطة' : 'Active Contracts'}
                    value={cs.activated ?? cs.approved ?? 0}
                    sub={cs.pending > 0
                        ? `${cs.pending} ${isAr ? 'قيد المراجعة' : 'under review'}`
                        : isAr ? 'جميعها مكتملة' : 'all completed'
                    }
                    accent="teal"
                />
            </div>

            {/* Main Content */}
            <div className="mb-4 grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
                <InvestmentProgress
                    investment={inv}
                    paymentStatus={ps}
                    locale={locale}
                    isAr={isAr}
                />

                <div className="rounded-2xl border border-gray-200  p-6 max-[640px]:rounded-xl max-[640px]:p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="mb-[18px] flex items-center gap-2 text-[15px] font-bold text-gray-900 max-[640px]:text-sm dark:text-white">
                        <i className="fas fa-calendar-check text-[#073491] dark:text-blue-400" aria-hidden="true" />
                        {isAr ? 'الدفعة القادمة' : 'Next Payment'}
                    </h2>
                    <NextPaymentCard nextPayment={next} locale={locale} isAr={isAr} />
                    <ContractsBreakdown contracts={cs} isAr={isAr} />
                </div>
            </div>

            <MonthlyDepositCard investment={inv} locale={locale} isAr={isAr} />

        </div>
    );
}