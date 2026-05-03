// src/features/analytics/pages/AnalyticsPage.jsx
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '../hooks/useAnalytics';
import { STATIC_SUMMARY, STATIC_MONTHLY } from '../utils/constants';
import { fmtSAR } from '../utils/formatters';

import { KpiCard } from '../components/KpiCard';
import { CompletionCard } from '../components/CompletionCard';
import { NextPaymentCard } from '../components/NextPaymentCard';
import { BarChart } from '../components/BarChart';
import { ChartLegend } from '../components/ChartLegend';
import { LoadingState } from '../components/LoadingState';

export default function AnalyticsPage() {
    const { i18n } = useTranslation(['common']);
    const isAr = i18n.language === 'ar';
    const locale = isAr ? 'ar' : 'en';

    const { data, isLoading } = useAnalytics();

    // Data with fallbacks
    const summary = data?.summary ?? STATIC_SUMMARY;
    const monthly = data?.monthly ?? STATIC_MONTHLY;

    // Chart totals
    const { totalReceivedChart, totalPendingChart } = useMemo(() => ({
        totalReceivedChart: monthly.reduce((a, m) => a + m.total_amount, 0),
        totalPendingChart: monthly.reduce((a, m) => a + m.pending_amount, 0),
    }), [monthly]);

    if (isLoading) {
        return <LoadingState isAr={isAr} />;
    }

    return (
        <div className="max-w-[1100px] mx-auto px-4 sm:px-5 py-6" dir={isAr ? 'rtl' : 'ltr'}>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <i className="fas fa-chart-bar" aria-hidden="true" />
                    </div>
                    {isAr ? 'التحليلات' : 'Analytics'}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isAr ? 'نظرة شاملة على أداء استثماراتك وحركة الدفعات' : 'Comprehensive overview of your investments and payment activity'}
                </p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
                <KpiCard
                    icon="fa-wallet"
                    label={isAr ? 'إجمالي الاستثمار' : 'Total Investment'}
                    value={fmtSAR(summary.total_invested, locale)}
                    sub={`${summary.total_contracts} ${isAr ? 'عقد' : 'contracts'}`}
                    color="blue"
                />
                <KpiCard
                    icon="fa-money-bill-wave"
                    label={isAr ? 'إجمالي المُستلَم' : 'Total Received'}
                    value={fmtSAR(summary.total_received, locale)}
                    sub={`${isAr ? 'نسبة الإنجاز' : 'Completion'} ${summary.completion_rate}%`}
                    color="green"
                />
                <KpiCard
                    icon="fa-clock"
                    label={isAr ? 'المبالغ المعلقة' : 'Pending Amounts'}
                    value={fmtSAR(summary.pending_payments, locale)}
                    sub={`${summary.active_contracts} ${isAr ? 'عقد نشط' : 'active contracts'}`}
                    color="amber"
                />
                <KpiCard
                    icon="fa-file-contract"
                    label={isAr ? 'العقود' : 'Contracts'}
                    value={summary.total_contracts}
                    sub={summary.pending_contracts > 0
                        ? `${summary.pending_contracts} ${isAr ? 'قيد المراجعة' : 'pending'}`
                        : isAr ? 'جميعها معتمدة' : 'all approved'
                    }
                    color="teal"
                />
            </div>

            {/* Mid Grid: Completion + Next Payment */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-5">
                <div className="lg:col-span-3">
                    <CompletionCard summary={summary} locale={locale} isAr={isAr} />
                </div>
                <div className="lg:col-span-2">
                    <NextPaymentCard nextPayment={summary.next_payment} locale={locale} isAr={isAr} />
                </div>
            </div>

            {/* Bar Chart */}
            <div className="dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i className="fas fa-chart-column text-blue-600 dark:text-blue-400" aria-hidden="true" />
                            {isAr ? 'حركة الدفعات الشهرية' : 'Monthly Payment Activity'}
                        </h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{new Date().getFullYear()}</p>
                    </div>
                    <ChartLegend
                        totalReceived={totalReceivedChart}
                        totalPending={totalPendingChart}
                        locale={locale}
                        isAr={isAr}
                    />
                </div>
                <BarChart data={monthly} isAr={isAr} locale={locale} />
            </div>

        </div>
    );
}