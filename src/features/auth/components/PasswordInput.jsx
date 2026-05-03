import { useState } from 'react';

export function PasswordInput({ id, value, onChange, placeholder, disabled, autoComplete }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-[10px] border-[1.5px] border-gray-200 bg-[#fafafa] px-3.5 py-[11px] pr-11 text-sm text-gray-900 outline-none transition
                   focus:border-[#073491] focus:bg-white focus:ring-4 focus:ring-[rgba(7,52,145,0.08)]
                   disabled:cursor-not-allowed disabled:opacity-55"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 transition-colors hover:text-[#073491]"
        aria-label={show ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
      >
        <i className={`fas ${show ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true" />
      </button>
    </div>
  );
}
