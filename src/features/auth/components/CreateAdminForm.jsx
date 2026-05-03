// src/features/auth/components/CreateAdminForm.jsx
import { FieldError } from './FieldError';
import { Spinner } from './Spinner';

export function CreateAdminForm({ state, onChange, onSubmit, onCancel }) {
    const { adminName, adminEmail, adminPass, loading, error } = state;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
            <p className="m-0 text-[13px] leading-6 text-gray-500">إنشاء حساب مدير النظام (لأول مرة فقط)</p>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="admin-name" className="text-[13px] font-semibold text-gray-700">
                    الاسم
                </label>
                <input
                    id="admin-name"
                    type="text"
                    value={adminName}
                    disabled={loading}
                    placeholder="مدير النظام"
                    onChange={(e) => onChange({ adminName: e.target.value, error: '' })}
                    className="w-full rounded-[10px] border-[1.5px] border-gray-200 bg-[#fafafa] px-3.5 py-[11px] text-sm text-gray-900 outline-none transition
                     focus:border-[#073491] focus:bg-white focus:ring-4 focus:ring-[rgba(7,52,145,0.08)]
                     disabled:cursor-not-allowed disabled:opacity-55"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="admin-email" className="text-[13px] font-semibold text-gray-700">
                    البريد الإلكتروني
                </label>
                <input
                    id="admin-email"
                    type="email"
                    value={adminEmail}
                    disabled={loading}
                    placeholder="admin@example.com"
                    onChange={(e) => onChange({ adminEmail: e.target.value, error: '' })}
                    className="w-full rounded-[10px] border-[1.5px] border-gray-200 bg-[#fafafa] px-3.5 py-[11px] text-sm text-gray-900 outline-none transition
                     focus:border-[#073491] focus:bg-white focus:ring-4 focus:ring-[rgba(7,52,145,0.08)]
                     disabled:cursor-not-allowed disabled:opacity-55"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="admin-pass" className="text-[13px] font-semibold text-gray-700">
                    كلمة المرور
                </label>
                <input
                    id="admin-pass"
                    type="password"
                    value={adminPass}
                    disabled={loading}
                    placeholder="••••••••"
                    onChange={(e) => onChange({ adminPass: e.target.value, error: '' })}
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
                    className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-[#073491] bg-[#073491] px-5 py-[11px] text-sm font-bold text-white transition hover:bg-[#0a3fa3] disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Spinner size={18} />
                            <span>جاري الإنشاء...</span>
                        </>
                    ) : (
                        'إنشاء الحساب'
                    )}
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