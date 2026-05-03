// src/features/auth/components/OtpForm.jsx
import { FieldError } from './FieldError';
import { Spinner } from './Spinner';

export function OtpForm({ state, onChange, onVerify, onBack }) {
    const { otp, loading, error } = state;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-[#f0f4ff] p-4 text-center">
                <i className="fas fa-mobile-screen-button text-[32px] text-[#073491]" aria-hidden="true" />
                <p className="m-0 text-[13px] text-gray-700">تم إرسال رمز التحقق إلى جوالك</p>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="otp" className="text-[13px] font-semibold text-gray-700">
                    رمز التحقق (OTP)
                </label>
                <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    disabled={loading}
                    placeholder="أدخل الرمز المكون من 6 أرقام"
                    dir="ltr"
                    onChange={(e) => onChange({ otp: e.target.value, error: '' })}
                    className="w-full rounded-[10px] border-[1.5px] border-gray-200 bg-[#fafafa] px-3.5 py-[11px] text-center text-lg tracking-widest text-gray-900 outline-none transition
                     focus:border-[#073491] focus:bg-white focus:ring-4 focus:ring-[rgba(7,52,145,0.08)]
                     disabled:cursor-not-allowed disabled:opacity-55"
                />
            </div>

            <FieldError message={error} />

            <button
                type="button"
                disabled={loading || !otp}
                onClick={onVerify}
                className="flex w-full items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-[#073491] bg-[#073491] px-5 py-[11px]
                   text-sm font-bold text-white transition hover:bg-[#0a3fa3]
                   disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Spinner size={18} />
                        <span>جاري التحقق...</span>
                    </>
                ) : (
                    'تحقق'
                )}
            </button>

            <button
                type="button"
                onClick={onBack}
                className="w-full text-center text-[13px] text-[#073491] underline underline-offset-[3px] transition-colors hover:text-[#0a3fa3]"
            >
                العودة لتسجيل الدخول
            </button>
        </div>
    );
}