import { TYPE_META } from '../utils/constants';

export function TypeBadge({ type }) {
  const meta = TYPE_META[type];
  if (!meta) {
    return (
      <span className="inline-flex items-center gap-1.5 max-w-full px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600">
        <i className="fas fa-file text-[10px] shrink-0" aria-hidden="true" />
        <span className="truncate">{type}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 max-w-full px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border ${meta.bg} ${meta.color} ${meta.border}`}
    >
      <i className={`fas ${meta.icon} text-[10px] shrink-0 ${meta.iconColor}`} aria-hidden="true" />
      <span className="truncate">{meta.label}</span>
    </span>
  );
}
