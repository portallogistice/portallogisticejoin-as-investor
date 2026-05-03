import { YEAR_META } from '../utils/constants';

export function YearBadge({ year }) {
  const meta = YEAR_META[year] || YEAR_META[1];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}
