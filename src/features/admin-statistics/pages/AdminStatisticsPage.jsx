import React, { useState } from 'react';
import { useStatisticsData } from '../hooks/useStatisticsData';
import PeriodSelector from '../components/PeriodSelector';
import SummaryCards from '../components/SummaryCards';
import FinancialChart from '../components/FinancialChart';
import StatusDistribution from '../components/StatusDistribution';
import TypeDistribution from '../components/TypeDistribution';
import RequestChart from '../components/RequestChart';
import DuesChart from '../components/DuesChart';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function AdminStatisticsPage() {
  const [period, setPeriod] = useState('all_time');
  const { data, isLoading, error, refetch } = useStatisticsData(period);

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              لوحة التحكم
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
              نظرة عامة على أداء النظام والإحصائيات
            </p>
          </div>
          <PeriodSelector value={period} onChange={setPeriod} />
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : data ? (
          <div className="space-y-8">

            {/* Summary stat cards */}
            <SummaryCards data={data} />

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-800" />

            {/* Financial + Dues charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <FinancialChart data={data.financial} />
              <DuesChart data={data.dues} />
            </div>

            {/* Status distributions */}
            <StatusDistribution
              contracts={data.contracts}
              requests={data.requests}
            />

            {/* Type distribution + Request chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <TypeDistribution data={data.contracts} />
              <RequestChart data={data.requests} />
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}