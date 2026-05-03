// src/features/contracts/components/StatusBadge.jsx
import { STATUS_BADGE, STATUS_COLORS } from '../utils/constants';

export function StatusBadge({ status }) {
    const meta = STATUS_BADGE[status] || { label: status, tone: 'draft', icon: 'fa-circle-info' };
    const colorClass = STATUS_COLORS[meta.tone] || STATUS_COLORS.draft;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
            <i className={`fas ${meta.icon} text-[10px]`} aria-hidden="true" />
            {meta.label}
        </span>
    );
}