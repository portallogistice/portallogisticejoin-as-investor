import { StatusPill } from './StatusPill';
import { YearBadge } from './YearBadge';
import { fmtSAR, fmtDate } from '../utils/formatters';

export function InvoiceMobileCard({ invoice, onApprove, onReject, approving }) {
  const canAct = invoice.status === 'admin_pending';
  const busy = approving === invoice.id;

  return (
    <div
      className={`rounded-xl border p-4 bg-gray-50 dark:bg-gray-700/30 ${canAct ? 'border-amber-300 dark:border-amber-700' : 'border-gray-200 dark:border-gray-700'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{invoice.user?.name || '—'}</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">{invoice.user?.national_id}</p>
        </div>
        <StatusPill status={invoice.status} />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-0.5">العقد</span>
          <span className="text-xs text-gray-700 dark:text-gray-300">#{invoice.contract?.id}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-0.5">السنة</span>
          <YearBadge year={invoice.year} />
        </div>
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-0.5">المبلغ</span>
          <span className="text-sm font-extrabold text-blue-700 dark:text-blue-400">{fmtSAR(invoice.amount)}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-0.5">الاستحقاق</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">{fmtDate(invoice.due_date)}</span>
        </div>
      </div>

      {/* Receipt */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">الإيصال</span>
        {invoice.receipt_url ? (
          <a
            href={invoice.receipt_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <i className="fas fa-eye text-[10px]" aria-hidden="true" />
            عرض
          </a>
        ) : (
          <span className="text-gray-300 dark:text-gray-600 text-xs">—</span>
        )}
      </div>

      {/* Actions */}
      {canAct && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onApprove(invoice)}
            disabled={busy}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 shadow-sm"
          >
            {busy ? (
              <i className="fas fa-spinner fa-spin text-[10px]" aria-hidden="true" />
            ) : (
              <i className="fas fa-check text-[10px]" aria-hidden="true" />
            )}
            قبول
          </button>
          <button
            type="button"
            onClick={() => onReject(invoice)}
            disabled={busy}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm"
          >
            <i className="fas fa-times text-[10px]" aria-hidden="true" />
            رفض
          </button>
        </div>
      )}

      {invoice.status === 'approved' && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400">
          <i className="fas fa-circle-check" aria-hidden="true" />
          تمت الموافقة
        </div>
      )}

      {invoice.status === 'rejected' && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400">
          <i className="fas fa-circle-xmark" aria-hidden="true" />
          مرفوض {invoice.admin_notes ? `— ${invoice.admin_notes}` : ''}
        </div>
      )}
    </div>
  );
}
