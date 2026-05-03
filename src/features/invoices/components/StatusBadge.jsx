// src/features/invoices/components/StatusBadge.jsx
import { getStatusMeta } from '../utils/formatters';
import { COLOR_MAP } from '../utils/constants';

export function StatusBadge({ status }) {
    const meta = getStatusMeta(status);
    const colors = COLOR_MAP[meta.color];

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colors.pill}`}>
            <i className={`fas ${meta.icon}`} aria-hidden="true" />
            {meta.label}
        </span>
    );
}