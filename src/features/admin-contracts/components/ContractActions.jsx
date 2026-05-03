import React from 'react';
import { fmtSAR } from '../utils/formatters';
import { FULL_PRICE } from '../utils/constants';

export function ContractActions({ contract, onAction, isBusy }) {
  const canApproveReject = ['admin_pending', 'nafath_approved'].includes(contract.status);
  const isReceiptReview = contract.status === 'receipt_review';

  const btnBase = 'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="flex flex-wrap gap-2">
      {contract.file_url && (
        <a
          href={contract.file_url}
          target="_blank"
          rel="noreferrer"
          className={`${btnBase} bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600`}
        >
          <i className="fas fa-eye"></i>
          عرض PDF
        </a>
      )}

      {(contract.sale_receipt_url || isReceiptReview) && (
        <button
          type="button"
          onClick={() => onAction('review', contract)}
          className={`${btnBase} bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/50`}
        >
          <i className="fas fa-file-invoice-dollar"></i>
          {isReceiptReview ? 'مراجعة الإيصال' : 'عرض الإيصال'}
        </button>
      )}

      {contract.payment_receipt_url && (
        <a
          href={contract.payment_receipt_url}
          target="_blank"
          rel="noreferrer"
          className={`${btnBase} bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50`}
        >
          <i className="fas fa-receipt"></i>
          عرض الإيصال
        </a>
      )}

      {contract.status === 'draft' && (
        <button
          type="button"
          onClick={() => onAction('send', contract.id)}
          disabled={isBusy}
          className={`${btnBase} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50`}
        >
          <i className={`fas ${isBusy ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
          {isBusy ? 'جاري الإرسال...' : 'إرسال'}
        </button>
      )}

      {canApproveReject && (
        <>
          <button
            type="button"
            onClick={() => onAction('approve', contract.id)}
            disabled={isBusy}
            className={`${btnBase} bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50`}
          >
            <i className={`fas ${isBusy ? 'fa-spinner fa-spin' : 'fa-check'}`}></i>
            {isBusy ? '...' : 'اعتماد'}
          </button>
          <button
            type="button"
            onClick={() => onAction('reject', contract.id)}
            disabled={isBusy}
            className={`${btnBase} bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50`}
          >
            <i className={`fas ${isBusy ? 'fa-spinner fa-spin' : 'fa-xmark'}`}></i>
            {isBusy ? '...' : 'رفض'}
          </button>
        </>
      )}

      {contract.status === 'need_to_pay' && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          <i className="fas fa-coins"></i>
          {fmtSAR(contract.total_amount_paid)} / {fmtSAR(FULL_PRICE)} ر.س
          {contract.payment_window_days_left !== null && (
            <span className={`mr-1 text-[10px] px-1.5 py-0.5 rounded-full
              ${contract.payment_window_days_left <= 7
                ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
              }`}
            >
              {contract.payment_window_days_left}د
            </span>
          )}
        </span>
      )}
    </div>
  );
}