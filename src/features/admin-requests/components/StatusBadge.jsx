import { STATUS_META } from '../utils/constants';

export function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 max-w-full px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border ${meta.className}`}
    >
      <i className={`fas ${meta.icon} text-[10px] shrink-0`} aria-hidden="true" />
      <span className="truncate">{meta.label}</span>
    </span>
  );
}
