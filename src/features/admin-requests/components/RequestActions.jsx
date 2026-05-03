/**
 * Shared action buttons for admin request rows (desktop) and mobile cards.
 * Touch-friendly targets on small screens.
 */
export function RequestActions({ req, onApprove, onReject, onWhatsapp, onDeploy, onViewInvoice, actioning, className = '' }) {
  const busy = actioning === req.id;
  const canAct = ['invoice_signed'].includes(req.status);
  const isAddBike = req.type === 'add_bike';
  const hasInvoice = req.admin_invoice_path;

  const btnBase =
    'inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-0 px-3 sm:px-2.5 py-2.5 sm:py-1.5 rounded-xl sm:rounded-lg text-xs sm:text-[11px] font-bold border transition-colors disabled:opacity-50 touch-manipulation active:scale-[0.98]';

  return (
    <div className={`flex flex-wrap items-stretch sm:items-center gap-2 ${className}`} dir="rtl">
      {canAct && !isAddBike && (
        <>
          <button
            type="button"
            onClick={() => onApprove(req)}
            disabled={busy}
            className={`${btnBase} bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 flex-1 sm:flex-initial`}
          >
            {busy ? (
              <i className="fas fa-spinner fa-spin text-sm sm:text-[10px]" aria-hidden="true" />
            ) : (
              <i className="fas fa-check text-sm sm:text-[10px]" aria-hidden="true" />
            )}
            قبول
          </button>
          <button
            type="button"
            onClick={() => onReject(req)}
            disabled={busy}
            className={`${btnBase} bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 flex-1 sm:flex-initial`}
          >
            <i className="fas fa-times text-sm sm:text-[10px]" aria-hidden="true" />
            رفض
          </button>
        </>
      )}

      {isAddBike && (
        <>
          <button
            type="button"
            onClick={() => onWhatsapp(req)}
            disabled={busy}
            className={`${btnBase} bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 flex-1 sm:flex-initial`}
          >
            {busy ? (
              <i className="fas fa-spinner fa-spin text-sm sm:text-[10px]" aria-hidden="true" />
            ) : (
              <i className="fab fa-whatsapp text-sm sm:text-[10px]" aria-hidden="true" />
            )}
            واتساب
          </button>
          <button
            type="button"
            onClick={() => onReject(req)}
            disabled={busy}
            className={`${btnBase} bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 flex-1 sm:flex-initial`}
          >
            <i className="fas fa-times text-sm sm:text-[10px]" aria-hidden="true" />
            رفض
          </button>
        </>
      )}

      {req.status !== 'rejected' && (
        <button
          type="button"
          onClick={() => onDeploy(req)}
          disabled={busy}
          className={`${btnBase} bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 flex-1 sm:flex-initial`}
        >
          <i className="fas fa-file-signature text-sm sm:text-[10px]" aria-hidden="true" />
          عقد
        </button>
      )}

      {hasInvoice && (
        <button
          type="button"
          onClick={() => onViewInvoice(req.admin_invoice_path)}
          className={`${btnBase} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 flex-1 sm:flex-initial`}
          title="عرض المستند المرفق"
        >
          <i className="fas fa-eye text-sm sm:text-[10px]" aria-hidden="true" />
          عرض
        </button>
      )}

      {req.status === 'approved' && (
        <span className="inline-flex min-h-[44px] sm:min-h-0 items-center justify-center text-green-500 dark:text-green-400 text-lg sm:text-sm px-2" aria-hidden="true">
          <i className="fas fa-circle-check" />
        </span>
      )}
      {req.status === 'whatsapp_sent' && (
        <span className="inline-flex min-h-[44px] sm:min-h-0 items-center justify-center text-emerald-500 dark:text-emerald-400 text-lg sm:text-sm px-2" aria-hidden="true">
          <i className="fas fa-comment-dots" />
        </span>
      )}
    </div>
  );
}
