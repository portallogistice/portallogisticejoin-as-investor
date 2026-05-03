// src/features/auth/components/ForgotForm.jsx
import { FieldError } from './FieldError';
import { Spinner } from './Spinner';

export function ForgotForm({ state, onChange, onSubmit, onCancel }) {
    const { forgotPhone, loading, error } = state;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
            <p className="m-0 text-[13px] leading-6 text-gray-500">أدخل رقم الهاتف المسجل لديك</p>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="forgot-phone" className="text-[13px] font-semibold text-gray-700">
                    رقم الهاتف
                </label>
                <input
                    id="forgot-phone"
                    type="text"
                    value={forgotPhone}
                    disabled={loading}
                    placeholder="أدخل رقم الهاتف"
                    onChange={(e) => onChange({ forgotPhone: e.target.value, error: '' })}
                    className="w-full rounded-[10px] border-[1.5px] border-gray-200 bg-[#fafafa] px-3.5 py-[11px] text-sm text-gray-900 outline-none transition
                     focus:border-[#073491] focus:bg-white focus:ring-4 focus:ring-[rgba(7,52,145,0.08)]
                     disabled:cursor-not-allowed disabled:opacity-55"
                />
            </div>

            <FieldError message={error} />

            <div className="flex gap-2.5">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex flex-1 items-center justify-center rounded-[10px] border-[1.5px] border-[#073491] bg-[#073491] px-5 py-[11px] text-sm font-bold text-white transition hover:bg-[#0a3fa3] disabled:opacity-50"
                >
                    {loading ? <Spinner size={18} /> : 'التالي'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 rounded-[10px] border-[1.5px] border-gray-300 bg-transparent px-5 py-[11px] text-sm font-bold text-gray-700 transition hover:bg-gray-100"
                >
                    إلغاء
                </button>
            </div>
        </form>
    );
}