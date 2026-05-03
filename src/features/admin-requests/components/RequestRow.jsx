import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import { RequestActions } from './RequestActions';
import { fmtDate } from '../utils/formatters';

export function RequestRow({ req, onApprove, onReject, onWhatsapp, onDeploy, onViewInvoice, actioning }) {
  const canAct = ['invoice_signed'].includes(req.status);

  return (
    <tr
      className={`border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${canAct ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''}`}
    >
      <td className="px-3 sm:px-4 py-3 align-top">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm font-bold text-gray-900 dark:text-white truncate">{req.full_name}</span>
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-mono break-all">{req.national_id}</span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 break-all">{req.phone}</span>
        </div>
      </td>
      <td className="px-3 sm:px-4 py-3 align-top">
        <TypeBadge type={req.type} />
      </td>
      <td className="px-3 sm:px-4 py-3 text-center align-top">
        {req.contract_id ? (
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">#{req.contract_id}</span>
        ) : (
          <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
        )}
      </td>
      <td className="px-3 sm:px-4 py-3 text-center align-top">
        <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{fmtDate(req.created_at)}</span>
      </td>
      <td className="px-3 sm:px-4 py-3 text-center align-top">
        <StatusBadge status={req.status} />
      </td>
      <td className="px-3 sm:px-4 py-3 align-top">
        <RequestActions
          req={req}
          onApprove={onApprove}
          onReject={onReject}
          onWhatsapp={onWhatsapp}
          onDeploy={onDeploy}
          onViewInvoice={onViewInvoice}
          actioning={actioning}
          className="justify-center sm:justify-center"
        />
      </td>
    </tr>
  );
}
