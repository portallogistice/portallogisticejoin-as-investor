// src/features/requests/components/RequestCard.jsx
import { StatusBadge } from './StatusBadge';
import { getRequestTypeMeta } from '../utils/formatters';
import { COLOR_MAP } from '../constants/constants';
import { fmtDate } from '../utils/formatters';

export function RequestCard({ request, onSign }) {
  const typeMeta = getRequestTypeMeta(request.type);
  const colors = typeMeta ? COLOR_MAP[typeMeta.color] : COLOR_MAP.blue;

  const hasInvoice = request.admin_invoice_path;
  const canSign = hasInvoice && ['invoice_sent', 'nafath_pending', 'waiting_signature'].includes(request.status);

  const handleViewInvoice = () => {
    if (!hasInvoice) return;
    const url = `${window.location.origin}/storage/${request.admin_invoice_path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 flex gap-4 transition-all hover:shadow-md">
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
        <i className={`fas ${typeMeta?.icon || 'fa-file'}`} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-semibold text-gray-900 dark:text-white text-sm">{request.type_label}</span>
          <StatusBadge status={request.status} />
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          <i className="fas fa-calendar-alt ml-1" aria-hidden="true" />
          {fmtDate(request.created_at)}
        </div>

        {request.contract_id && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            <i className="fas fa-file-contract ml-1" aria-hidden="true" />
            عقد #{request.contract_id}
          </div>
        )}

        {request.admin_notes && (
          <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2 mt-2">
            <i className="fas fa-circle-info ml-1" aria-hidden="true" />
            {request.admin_notes}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {hasInvoice && (
            <button
              type="button"
              onClick={handleViewInvoice}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <i className="fas fa-eye" aria-hidden="true" />
              عرض المستند
            </button>
          )}
          {canSign && (
            <button
              type="button"
              onClick={() => onSign(request)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              <i className="fas fa-pen-fancy" aria-hidden="true" />
              توقيع الفاتورة
            </button>
          )}
        </div>
      </div>
    </div>
  );
}