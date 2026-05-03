export function InvoiceViewerModal({ invoicePath, onClose }) {
  if (!invoicePath) return null;

  const isImage = /[.](jpg|jpeg|png|webp|gif)$/i.test(invoicePath);
  const isPDF = /[.]pdf$/i.test(invoicePath);
  const fullUrl = `${window.location.origin}/storage/${invoicePath}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 dark:bg-black/70 backdrop-blur-sm p-2 sm:p-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="invoice-viewer-title"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700 shrink-0 gap-y-2">
          <h3 id="invoice-viewer-title" className="text-base font-bold text-gray-900 dark:text-white min-w-0">
            عرض المستند
          </h3>
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-0 px-3 py-2 rounded-xl sm:rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors touch-manipulation flex-1 sm:flex-initial"
            >
              <i className="fas fa-download text-[10px]" aria-hidden="true" />
              تحميل
            </a>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] sm:min-h-8 sm:min-w-8 rounded-xl sm:rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors touch-manipulation"
              aria-label="إغلاق"
            >
              <i className="fas fa-times" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2 sm:p-4 bg-gray-100 dark:bg-gray-950 flex items-center justify-center min-h-[40vh] sm:min-h-0">
          {isImage && (
            <img
              src={fullUrl}
              alt="Invoice"
              className="max-w-full w-auto max-h-[55vh] sm:max-h-[70vh] rounded-lg shadow-lg object-contain"
            />
          )}
          {isPDF && (
            <iframe
              src={fullUrl}
              title="Invoice PDF"
              className="w-full h-[50vh] sm:h-[70vh] min-h-[200px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white"
            />
          )}
          {!isImage && !isPDF && (
            <div className="text-center py-10 sm:py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl mx-auto mb-4">
                <i className="fas fa-file" aria-hidden="true" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">لا يمكن عرض هذا النوع من الملفات.</p>
              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors touch-manipulation"
              >
                <i className="fas fa-download text-xs" aria-hidden="true" />
                تحميل الملف
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
