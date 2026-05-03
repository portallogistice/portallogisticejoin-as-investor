import { RequestRow } from './RequestRow';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import { RequestActions } from './RequestActions';
import { fmtDate } from '../utils/formatters';

const HEADERS = ['المستثمر', 'نوع الطلب', 'العقد', 'التاريخ', 'الحالة', 'إجراء'];

function MobileRequestCard({ req, onApprove, onReject, onWhatsapp, onDeploy, onViewInvoice, actioning }) {
  const canAct = ['invoice_signed'].includes(req.status);

  return (
    <article
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 p-4 shadow-sm ${canAct ? 'ring-1 ring-blue-200/60 dark:ring-blue-800/40' : ''}`}
    >
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug break-words">{req.full_name}</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono mt-0.5 break-all">{req.national_id}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 break-all">{req.phone}</p>
          </div>
          <div className="flex-shrink-0">
            <TypeBadge type={req.type} />
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] sm:text-xs border-t border-gray-100 dark:border-gray-700 pt-3">
          <div>
            <dt className="text-gray-500 dark:text-gray-400 font-medium mb-1">الحالة</dt>
            <dd>
              <StatusBadge status={req.status} />
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400 font-medium mb-1">التاريخ</dt>
            <dd className="text-gray-700 dark:text-gray-300 tabular-nums">{fmtDate(req.created_at)}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-gray-500 dark:text-gray-400 font-medium mb-1">العقد</dt>
            <dd className="text-gray-700 dark:text-gray-300 font-mono">
              {req.contract_id ? `#${req.contract_id}` : '—'}
            </dd>
          </div>
        </dl>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
          <RequestActions
            req={req}
            onApprove={onApprove}
            onReject={onReject}
            onWhatsapp={onWhatsapp}
            onDeploy={onDeploy}
            onViewInvoice={onViewInvoice}
            actioning={actioning}
          />
        </div>
      </div>
    </article>
  );
}

export function RequestsTable({ requests, onApprove, onReject, onWhatsapp, onDeploy, onViewInvoice, actioning }) {
  return (
    <>
      {/* Mobile: stacked cards — no horizontal table scroll */}
      <div className="md:hidden space-y-3" role="list">
        {requests.map((req) => (
          <MobileRequestCard
            key={req.id}
            req={req}
            onApprove={onApprove}
            onReject={onReject}
            onWhatsapp={onWhatsapp}
            onDeploy={onDeploy}
            onViewInvoice={onViewInvoice}
            actioning={actioning}
          />
        ))}
      </div>

      {/* Desktop: full table */}
      <div
        className="hidden md:block bg-white dark:bg-gray-800 -mx-1 sm:mx-0 overflow-x-auto overscroll-x-contain rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm [scrollbar-gutter:stable]"
        role="region"
        aria-label="جدول الطلبات"
      >
        <table className="w-full min-w-[860px] border-collapse text-sm  dark:bg-gray-800" dir="rtl">
          <thead>
            <tr className="bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800">
              {HEADERS.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-3 lg:px-4 py-3 text-right text-xs font-bold text-white whitespace-nowrap tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800   ">
            {requests.map((req) => (
              <RequestRow
                key={req.id}
                req={req}
                onApprove={onApprove}
                onReject={onReject}
                onWhatsapp={onWhatsapp}
                onDeploy={onDeploy}
                onViewInvoice={onViewInvoice}
                actioning={actioning}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
