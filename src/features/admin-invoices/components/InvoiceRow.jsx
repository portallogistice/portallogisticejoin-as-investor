import { StatusPill } from './StatusPill';
import { YearBadge } from './YearBadge';
import { fmtSAR, fmtDate } from '../utils/formatters';

export function InvoiceRow({ invoice, onApprove, onReject, approving }) {
  const canAct = invoice.status === 'admin_pending';
  const busy = approving === invoice.id;

  return (
    <tr
      className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${canAct ? 'bg-amber-50/30 dark:bg-amber-900/5' : ''}`}
    >
      <td className="px-4 py-3.5">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{invoice.user?.name || '—'}</span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">{invoice.user?.national_id}</span>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">#{invoice.contract?.id}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">{invoice.contract?.title}</span>
        </div>
      </td>
      <td className="px-4 py-3.5 text-center">
        <YearBadge year={invoice.year} />
      </td>
      <td className="px-4 py-3.5">
        <span className="text-sm font-extrabold text-blue-700 dark:text-blue-400 tabular-nums whitespace-nowrap">
          {fmtSAR(invoice.amount)}
        </span>
      </td>
      <td className="px-4 py-3.5 text-center">
        <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{fmtDate(invoice.due_date)}</span>
      </td>
      <td className="px-4 py-3.5 text-center">
        <StatusPill status={invoice.status} />
      </td>
      <td className="px-4 py-3.5 text-center">
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
          <span className="text-gray-300 dark:text-gray-600">—</span>
        )}
      </td>
      <td className="px-4 py-3.5">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {canAct ? (
            <>
              <button
                type="button"
                onClick={() => onApprove(invoice)}
                disabled={busy}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors disabled:opacity-50"
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
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-times text-[10px]" aria-hidden="true" />
                رفض
              </button>
            </>
          ) : invoice.status === 'approved' ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400">
              <i className="fas fa-circle-check" aria-hidden="true" />
              تم
            </span>
          ) : invoice.status === 'rejected' ? (
            <span
              className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 cursor-help"
              title={invoice.admin_notes || ''}
            >
              <i className="fas fa-circle-xmark" aria-hidden="true" />
              مرفوض
            </span>
          ) : (
            <span className="text-gray-300 dark:text-gray-600">—</span>
          )}
        </div>
      </td>
    </tr>
  );
}
