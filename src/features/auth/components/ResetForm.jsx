// src/features/auth/components/ResetForm.jsx
import { FieldError } from './FieldError';
import { Spinner } from './Spinner';

export function ResetForm({ state, onChange, onSubmit }) {
    const { newPass, newPassConf, loading, error } = state;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
            <p className="m-0 text-[13px] leading-6 text-gray-500">اختر كلمة مرور جديدة لحسابك</p>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="new-pass" className="text-[13px] font-semibold text-gray-700">
                    كلمة المرور الجديدة
                </label>
                <input
                    id="new-pass"
                    type="password"
                    autoComplete="new-password"
                    value={newPass}
                    disabled={loading}
                    placeholder="6 أحرف على الأقل"
                    onChange={(e) => onChange({ newPass: e.target.value, error: '' })}
                    className="w-full rounded-[10px] border-[1.5px] border-gray-200 bg-[#fafafa] px-3.5 py-[11px] text-sm text-gray-900 outline-none transition
                     focus:border-[#073491] focus:bg-white focus:ring-4 focus:ring-[rgba(7,52,145,0.08)]
                     disabled:cursor-not-allowed disabled:opacity-55"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="new-pass-conf" className="text-[13px] font-semibold text-gray-700">
                    تأكيد كلمة المرور
                </label>
                <input
                    id="new-pass-conf"
                    type="password"
                    autoComplete="new-password"
                    value={newPassConf}
                    disabled={loading}
                    placeholder="أعد إدخال كلمة المرور"
                    onChange={(e) => onChange({ newPassConf: e.target.value, error: '' })}
                    className="w-full rounded-[10px] border-[1.5px] border-gray-200 bg-[#fafafa] px-3.5 py-[11px] text-sm text-gray-900 outline-none transition
                     focus:border-[#073491] focus:bg-white focus:ring-4 focus:ring-[rgba(7,52,145,0.08)]
                     disabled:cursor-not-allowed disabled:opacity-55"
                />
            </div>

            <FieldError message={error} />

            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-[#073491] bg-[#073491] px-5 py-[11px] text-sm font-bold text-white transition hover:bg-[#0a3fa3] disabled:opacity-50"
            >
                {loading ? (
                    <>
                        <Spinner size={18} />
                        <span>جاري الحفظ...</span>
                    </>
                ) : (
                    'حفظ والدخول'
                )}
            </button>
        </form>
    );
}