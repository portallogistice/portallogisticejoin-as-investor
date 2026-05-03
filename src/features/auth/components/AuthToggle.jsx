export function AuthToggle({ isAdmin, onChange }) {
  return (
    <div className="mb-6 flex gap-1 rounded-xl bg-[#f3f6fb] p-1" role="tablist" aria-label="نوع الحساب">
      <button
        role="tab"
        aria-selected={!isAdmin}
        onClick={() => onChange(false)}
        type="button"
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-[9px] px-3 py-2.5 text-[13px] font-semibold transition-all
          ${!isAdmin
            ? 'bg-[#073491] text-white shadow-[0_2px_8px_rgba(7,52,145,0.25)]'
            : 'bg-transparent text-gray-500 hover:text-gray-700'
          }`}
      >
        <i className="fas fa-user ml-2" aria-hidden="true" />
        مستثمر
      </button>
      <button
        role="tab"
        aria-selected={isAdmin}
        onClick={() => onChange(true)}
        type="button"
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-[9px] px-3 py-2.5 text-[13px] font-semibold transition-all
          ${isAdmin
            ? 'bg-[#073491] text-white shadow-[0_2px_8px_rgba(7,52,145,0.25)]'
            : 'bg-transparent text-gray-500 hover:text-gray-700'
          }`}
      >
        <i className="fas fa-shield-halved ml-2" aria-hidden="true" />
        مدير النظام
      </button>
    </div>
  );
}
