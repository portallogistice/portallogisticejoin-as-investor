import { STATUS_META } from '../utils/constants';

export function StatusPill({ status }) {
  const meta = STATUS_META[status] || STATUS_META.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${meta.className}`}
    >
      <i className={`fas ${meta.icon} text-[10px]`} aria-hidden="true" />
      {meta.label}
    </span>
  );
}
