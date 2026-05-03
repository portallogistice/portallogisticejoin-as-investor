import { useState } from 'react';

export function WhatsappModal({ req, onClose, onSuccess, isLoading, error }) {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSuccess({ requestId: req.id, message });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 dark:bg-black/60 backdrop-blur-sm p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      onClick={(e) => e.target === e.currentTarget && !isLoading && onClose()}
      role="presentation"
    >
      <div
        className="w-full max-w-md max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-modal-title"
      >
        <div className="flex items-start justify-between gap-2 p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700 shrink-0">
          <div className="min-w-0 pr-2">
            <h3 id="whatsapp-modal-title" className="text-base font-bold text-gray-900 dark:text-white">
              إرسال رسالة واتساب
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-words">
              إلى: <strong className="text-gray-800 dark:text-gray-200">{req.full_name}</strong> — {req.phone}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="min-h-[44px] min-w-[44px] sm:min-h-8 sm:min-w-8 shrink-0 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors disabled:opacity-50 touch-manipulation"
            aria-label="إغلاق"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="whatsapp-message">
              نص الرسالة <span className="text-red-600 dark:text-red-400">*</span>
            </label>
            <textarea
              id="whatsapp-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالة الواتساب..."
              maxLength={4096}
              disabled={isLoading}
              className="w-full min-h-[7rem] px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-y transition-all disabled:opacity-50"
            />
            <span className="text-[11px] text-gray-500 dark:text-gray-500 mt-1 block text-left tabular-nums">
              {message.length} / 4096
            </span>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/25 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm">
              <i className="fas fa-triangle-exclamation flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="break-words">{error}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-4 sm:p-5 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 sm:py-2 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 touch-manipulation"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !message.trim()}
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 sm:py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all disabled:opacity-50 touch-manipulation"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin text-xs" aria-hidden="true" /> جاري الإرسال...
              </>
            ) : (
              <>
                <i className="fab fa-whatsapp text-xs" aria-hidden="true" /> إرسال
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
