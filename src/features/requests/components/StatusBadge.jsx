// src/features/requests/components/StatusBadge.jsx
import { STATUS_META, COLOR_MAP } from '../constants/constants';

export function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.pending;
  const colors = COLOR_MAP[meta.color];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.border} ${colors.text}`}>
      <i className={`fas ${meta.icon}`} aria-hidden="true" />
      {meta.label}
    </span>
  );
}