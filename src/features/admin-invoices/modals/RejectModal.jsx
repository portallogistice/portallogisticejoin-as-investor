import { useState } from 'react';

export function RejectModal({ invoice, onClose, onSuccess, isLoading, error }) {
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onSuccess({ invoiceId: invoice.id, notes });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && !isLoading && onClose()}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-start justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">رفض الفاتورة</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              سيتم رفض هذا الإيصال وإنشاء فاتورة جديدة للمستثمر تلقائياً.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            aria-label="إغلاق"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
              سبب الرفض (اختياري)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثال: الإيصال غير واضح، يرجى إعادة الرفع بصورة أوضح."
              disabled={isLoading}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none transition-all disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
              <i className="fas fa-triangle-exclamation flex-shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 p-5 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 shadow-sm transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <><i className="fas fa-spinner fa-spin text-xs" aria-hidden="true" /> جاري...</>
            ) : (
              <><i className="fas fa-circle-xmark text-xs" aria-hidden="true" /> تأكيد الرفض</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
