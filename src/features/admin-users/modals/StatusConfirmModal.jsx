import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Accessible confirmation dialog for status changes.
 *
 * @param {{
 *   open: boolean,
 *   action: 'activate' | 'deactivate' | null,
 *   loading: boolean,
 *   onConfirm: () => void,
 *   onCancel: () => void,
 * }} props
 */
export function StatusConfirmModal({ open, action, loading, onConfirm, onCancel }) {
  const { t } = useTranslation(['common']);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape' && !loading) onCancel(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, loading, onCancel]);

  if (!open) return null;

  const isDeactivate = action === 'deactivate';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="status-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => { if (!loading) onCancel(); }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-5 animate-[fadeInScale_150ms_ease-out]">
        {/* Icon */}
        <div
          className={[
            'mx-auto h-12 w-12 rounded-full flex items-center justify-center text-xl',
            isDeactivate
              ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
              : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
          ].join(' ')}
          aria-hidden="true"
        >
          {isDeactivate ? '⛔' : '✅'}
        </div>

        {/* Content */}
        <div className="text-center">
          <h2
            id="status-modal-title"
            className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1"
          >
            {isDeactivate ? t('admin.users.deactivate') : t('admin.users.activate')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isDeactivate
              ? t('admin.users.deactivate_confirm_message', 'هل أنت متأكد من إلغاء تفعيل هذا المستخدم؟')
              : t('admin.users.activate_confirm_message', 'هل أنت متأكد من تفعيل هذا المستخدم؟')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2 rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            {t('admin.users.confirm_cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={[
              'flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2',
              isDeactivate
                ? 'bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700'
                : 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700',
            ].join(' ')}
          >
            {loading && (
              <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {t('admin.users.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
