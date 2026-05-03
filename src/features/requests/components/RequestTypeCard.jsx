// src/features/requests/components/RequestTypeCard.jsx
import { COLOR_MAP } from '../constants/constants';

export function RequestTypeCard({ type, onClick }) {
  const colors = COLOR_MAP[type.color];

  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-4 transition-all hover:shadow-md ${colors.bg} ${colors.border}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${colors.icon}`}>
        <i className={`fas ${type.icon}`} aria-hidden="true" />
      </div>
      <div className="flex-1">
        <h3 className={`font-bold text-base mb-1 ${colors.text}`}>{type.label}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{type.desc}</p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={`w-full py-2.5 px-4 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors ${colors.btn}`}
      >
        <i className="fas fa-plus" aria-hidden="true" />
        تقديم طلب
      </button>
    </div>
  );
}