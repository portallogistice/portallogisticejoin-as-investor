import { useMemo } from 'react';
import { STAT_CARDS } from '../utils/constants';
import { fmtNum, fmtSAR } from '../utils/formatters';
import { StatCard } from './StatCard';

export function SummaryCards({ summary, loading }) {
  const cards = useMemo(() => {
    if (!summary) return [];

    return STAT_CARDS.map((card) => ({
      ...card,
      value: summary[card.key] || 0,
    }));
  }, [summary]);

  const extraCards = useMemo(() => {
    if (!summary) return [];
    const extras = [];

    if (summary.pending_last_7_days) {
      extras.push({
        label: 'انتظار (٧ أيام)',
        value: summary.pending_last_7_days.total_amount || 0,
        sub: `${fmtNum(summary.pending_last_7_days.count)} فاتورة`,
        icon: 'fa-calendar-week',
        color: 'amber',
        isCurrency: true,
      });
    }

    if (summary.approved_last_7_days) {
      extras.push({
        label: 'مقبولة (٧ أيام)',
        value: summary.approved_last_7_days.total_amount || 0,
        sub: `${fmtNum(summary.approved_last_7_days.count)} فاتورة`,
        icon: 'fa-calendar-check',
        color: 'green',
        isCurrency: true,
      });
    }

    return extras;
  }, [summary]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!summary) return null;

  const allCards = [...cards, ...extraCards];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-5">
      {allCards.map((card) => (
        <StatCard
          key={card.label}
          label={card.label}
          value={card.value}
          sub={card.sub}
          icon={card.icon}
          color={card.color}
          isCurrency={card.isCurrency}
        />
      ))}
    </div>
  );
}
