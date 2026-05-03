import React, { useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

const EMPTY = { name: '', national_id: '', phone: '', email: '', password: '' };

function reducer(state, { field, value, type }) {
  if (type === 'RESET') return EMPTY;
  return { ...state, [field]: value };
}

/**
 * Slide-up modal with the "create user" form.
 * Keeps the list page clean by separating form concerns here.
 *
 * @param {{
 *   open: boolean,
 *   loading: boolean,
 *   onSubmit: (form: object) => void,
 *   onClose: () => void,
 * }} props
 */
export function CreateUserModal({ open, loading, onSubmit, onClose }) {
  const { t, i18n } = useTranslation(['common']);
  const isRTL = i18n.language === 'ar';
  const [form, dispatch] = useReducer(reducer, EMPTY);

  // Reset form when modal opens
  useEffect(() => { if (open) dispatch({ type: 'RESET' }); }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === 'Escape' && !loading) onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, loading, onClose]);

  if (!open) return null;

  const set = (field) => (e) => dispatch({ field, value: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass = `
    w-full rounded-xl border border-slate-200 dark:border-slate-600
    bg-white dark:bg-slate-700/60
    text-slate-800 dark:text-slate-100
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    px-4 py-2.5 text-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
    transition-colors
  `.trim();

  const labelClass = 'block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => { if (!loading) onClose(); }}
        aria-hidden="true"
      />

      {/* Panel — slides up from bottom on mobile, centred on desktop */}
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="
          relative w-full sm:max-w-lg
          bg-white dark:bg-slate-800
          rounded-t-3xl sm:rounded-2xl
          shadow-2xl border border-slate-100 dark:border-slate-700
          p-6 flex flex-col gap-5
        "
      >
        {/* Handle (mobile) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-slate-200 dark:bg-slate-600 sm:hidden" />

        <h2 id="create-modal-title" className="text-base font-semibold text-slate-800 dark:text-slate-100 mt-2 sm:mt-0">
          {isRTL ? 'إنشاء مستخدم جديد' : 'Create New User'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Name */}
          <div>
            <label className={labelClass}>{isRTL ? 'الاسم' : 'Name'} *</label>
            <input className={inputClass} value={form.name} onChange={set('name')} required />
          </div>

          {/* National ID */}
          <div>
            <label className={labelClass}>{t('national_id')} *</label>
            <input className={inputClass} value={form.national_id} onChange={set('national_id')} required />
          </div>

          {/* Phone + Email in a row on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t('phone_number')}</label>
              <input className={inputClass} value={form.phone} onChange={set('phone')} inputMode="tel" />
            </div>
            <div>
              <label className={labelClass}>{t('email')}</label>
              <input className={inputClass} type="email" value={form.email} onChange={set('email')} />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>{isRTL ? 'كلمة السر' : 'Password'} *</label>
            <input
              className={inputClass}
              type="password"
              value={form.password}
              onChange={set('password')}
              minLength={6}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
            >
              {t('admin.users.confirm_cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              {isRTL ? 'إنشاء' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
