import React from 'react';
import StatCard from './StatCard';
import { fmtSAR, fmtNum, fmtPercent } from '../utils/formatters';

function SectionHeading({ color, children }) {
  const dotColors = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
  };
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className={`w-1 h-5 rounded-full ${dotColors[color] || 'bg-gray-400'}`} />
      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {children}
      </h3>
    </div>
  );
}

export default function SummaryCards({ data }) {
  if (!data) return null;

  const { financial, contracts, requests, dues } = data;

  return (
    <div className="space-y-8">
      {/* Financial */}
      <div>
        <SectionHeading color="indigo">المالية</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="الهدف الكلي"
            value={fmtSAR(financial?.total_target)}
            subtitle="ريال سعودي"
            icon="💰"
            color="indigo"
          />
          <StatCard
            title="المحصّل"
            value={fmtSAR(financial?.total_collected)}
            subtitle="ريال سعودي"
            icon="✅"
            color="emerald"
          />
          <StatCard
            title="المعلّق"
            value={fmtSAR(financial?.total_pending)}
            subtitle="ريال سعودي"
            icon="⏳"
            color="amber"
          />
          <StatCard
            title="نسبة التحصيل"
            value={fmtPercent(financial?.collection_rate)}
            subtitle="من الهدف الكلي"
            icon="📊"
            color="blue"
          />
        </div>
      </div>

      {/* Contracts */}
      <div>
        <SectionHeading color="emerald">العقود</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="عقود جديدة"
            value={fmtNum(contracts?.new_contracts_count)}
            subtitle="في الفترة المحددة"
            icon="📝"
            color="emerald"
          />
          <StatCard
            title="نشطة"
            value={fmtNum(contracts?.active_contracts)}
            subtitle="عقد"
            icon="🟢"
            color="emerald"
          />
          <StatCard
            title="منتهية"
            value={fmtNum(contracts?.ended_contracts)}
            subtitle="عقد"
            icon="🔴"
            color="red"
          />
          <StatCard
            title="تجديد / بيع"
            value={`${fmtNum(requests?.renew_contract_count)} / ${fmtNum(requests?.sell_bike_count)}`}
            subtitle="طلبات"
            icon="🔄"
            color="blue"
          />
        </div>
      </div>

      {/* Dues */}
      <div>
        <SectionHeading color="amber">الاستحقاقات</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="مستحق اليوم"
            value={fmtSAR(dues?.due_today?.total_amount)}
            subtitle={`${fmtNum(dues?.due_today?.count)} مدفوعات`}
            icon="📅"
            color="amber"
          />
          <StatCard
            title="مستحق هذا الأسبوع"
            value={fmtSAR(dues?.due_this_week?.total_amount)}
            subtitle={`${fmtNum(dues?.due_this_week?.count)} مدفوعات`}
            icon="📆"
            color="amber"
          />
          <StatCard
            title="نسبة السداد"
            value={fmtPercent(dues?.payment_rate)}
            subtitle=""
            icon="💳"
            color="emerald"
          />
          <StatCard
            title="متوسط SLA"
            value={requests?.avg_sla_days ? `${fmtNum(requests.avg_sla_days)} يوم` : '—'}
            subtitle="حل الطلبات"
            icon="⏱️"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}
