import React from 'react';
import { StatusBadge } from './StatusBadge';
import { TypePill } from './TypePill';
import { ContractActions } from './ContractActions';
import { fmtSAR } from '../utils/formatters';
import { FULL_PRICE } from '../utils/constants';

export function ContractCard({ contract, onAction, actionLoadingId }) {
  const isHighlight = contract.status === 'receipt_review';

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md
        ${isHighlight
          ? 'border-amber-400 dark:border-amber-500 ring-1 ring-amber-400/30 dark:ring-amber-500/30'
          : 'border-slate-200 dark:border-slate-700'
        }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">#{contract.id}</span>
            <TypePill type={contract.type} />
          </div>
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
            {contract.title}
          </h4>
        </div>
        <StatusBadge status={contract.status} />
      </div>

      {contract.type === 'sale' && contract.total_amount_paid > 0 && (
        <div className="flex items-center gap-2 mb-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2">
          <i className="fas fa-coins text-amber-500 dark:text-amber-400"></i>
          <span>{fmtSAR(contract.total_amount_paid)} / {fmtSAR(FULL_PRICE)} ر.س</span>
          {contract.payment_window_days_left !== null && (
            <span className={`mr-auto text-[10px] px-1.5 py-0.5 rounded-full font-medium
              ${contract.payment_window_days_left <= 7
                ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {contract.payment_window_days_left} يوم
            </span>
          )}
        </div>
      )}

      <ContractActions
        contract={contract}
        onAction={onAction}
        isBusy={actionLoadingId === contract.id}
      />
    </div>
  );
}