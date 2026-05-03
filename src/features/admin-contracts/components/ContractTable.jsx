import React from 'react';
import { StatusBadge } from './StatusBadge';
import { TypePill } from './TypePill';
import { ContractActions } from './ContractActions';
import { fmtSAR } from '../utils/formatters';
import { FULL_PRICE } from '../utils/constants';

export function ContractTable({ contracts, onAction, actionLoadingId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-right py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 text-xs">#</th>
            <th className="text-right py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 text-xs">النوع</th>
            <th className="text-right py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 text-xs">العنوان</th>
            <th className="text-right py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 text-xs">الحالة</th>
            <th className="text-right py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 text-xs">المدفوع</th>
            <th className="text-right py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 text-xs">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {contracts.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
                لا توجد عقود.
              </td>
            </tr>
          )}
          {contracts.map((contract) => (
            <tr
              key={contract.id}
              className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50
                ${contract.status === 'receipt_review' ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}
            >
              <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs">#{contract.id}</td>
              <td className="py-3 px-4">
                <TypePill type={contract.type} />
              </td>
              <td className="py-3 px-4 text-slate-800 dark:text-slate-100 font-medium max-w-xs truncate">
                {contract.title}
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={contract.status} />
              </td>
              <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-xs">
                {contract.type === 'sale' && contract.total_amount_paid > 0 ? (
                  <span>
                    {fmtSAR(contract.total_amount_paid)} / {fmtSAR(FULL_PRICE)} ر.س
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500">—</span>
                )}
              </td>
              <td className="py-3 px-4">
                <ContractActions
                  contract={contract}
                  onAction={onAction}
                  isBusy={actionLoadingId === contract.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}