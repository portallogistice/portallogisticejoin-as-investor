// src/features/invoices/components/YearBadge.jsx
import { getYearMeta } from '../utils/formatters';
import { COLOR_MAP } from '../utils/constants';

export function YearBadge({ year }) {
    const meta = getYearMeta(year);
    const colors = COLOR_MAP[meta.color];

    return (
        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white ${colors.badge}`}>
            {meta.label}
        </span>
    );
}