import React, { useEffect, useRef, useState } from 'react';
import { fmtSAR } from '../utils/formatters';
import { FULL_PRICE } from '../utils/constants';

export function ReviewPaymentModal({ contract, onClose, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  const paid = contract.total_amount_paid || 0;
  const remaining = FULL_PRICE - paid;

  const handleSubmit = async () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      setError('يرجى إدخال مبلغ صحيح.');
      return;
    }
    if (val > FULL_PRICE) {
      setError(`المبلغ لا يمكن أن يتجاوز ${fmtSAR(FULL_PRICE)} ر.س.`);
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSuccess(val);
    } catch (e) {
      setError(e?.response?.data?.message || 'تعذر تسجيل الدفعة.');
    } finally {
      setSaving(false);
    }
  };

  const inputBase = 'w-full px-3 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20';
  const inputNormal = `${inputBase} bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`;
  const inputError = `${inputBase} bg-white dark:bg-slate-800 border-red-300 dark:border-red-600 text-slate-800 dark:text-slate-100`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && !saving && onClose()}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">مراجعة الإيصال</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              #{contract.id} — {contract.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="إغلاق"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Receipt Preview */}
          {contract.sale_receipt_url && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
              {contract.sale_receipt_url.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                <img
                  src={contract.sale_receipt_url}
                  alt="إيصال الدفع"
                  className="w-full max-h-64 object-contain"
                />
              ) : (
                <a
                  href={contract.sale_receipt_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-8 text-red-600 dark:text-red-400 hover:underline text-sm font-medium"
                >
                  <i className="fas fa-file-pdf text-xl"></i>
                  فتح الإيصال (PDF)
                </a>
              )}
            </div>
          )}

          {/* Payment Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">إجمالي السعر</div>
              <div className="text-base font-bold text-slate-800 dark:text-slate-100">{fmtSAR(FULL_PRICE)} ر.س</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mb-1">المدفوع حتى الآن</div>
              <div className="text-base font-bold text-emerald-700 dark:text-emerald-300">{fmtSAR(paid)} ر.س</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
              <div className="text-[10px] text-amber-600 dark:text-amber-400 mb-1">المتبقي</div>
              <div className="text-base font-bold text-amber-700 dark:text-amber-300">{fmtSAR(remaining)} ر.س</div>
            </div>
            {contract.payment_window_days_left !== null && (
              <div className={`rounded-xl p-3 text-center
                ${contract.payment_window_days_left <= 5
                  ? 'bg-red-50 dark:bg-red-900/20'
                  : 'bg-slate-50 dark:bg-slate-700/50'
                }`}
              >
                <div className={`text-[10px] mb-1
                  ${contract.payment_window_days_left <= 5
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  أيام متبقية من الـ 60
                </div>
                <div className={`text-base font-bold
                  ${contract.payment_window_days_left <= 5
                    ? 'text-red-700 dark:text-red-300'
                    : 'text-slate-800 dark:text-slate-100'
                  }`}
                >
                  {contract.payment_window_days_left} يوم
                </div>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              المبلغ الذي دفعه المستثمر (ر.س) *
            </label>
            <input
              ref={inputRef}
              type="number"
              min="1"
              max={FULL_PRICE}
              step="0.01"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setError(''); }}
              className={error ? inputError : inputNormal}
              placeholder="مثال: 3300"
            />
            {amount && !isNaN(parseFloat(amount)) && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                إجمالي بعد هذه الدفعة:{" "}
                <strong className="text-slate-700 dark:text-slate-200">
                  {fmtSAR(paid + parseFloat(amount))} ر.س
                </strong>
                {' '}
                {(paid + parseFloat(amount)) >= FULL_PRICE ? (
                  <span className="text-green-600 dark:text-green-400 font-medium">— سيتم إغلاق العقد ✓</span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 font-medium">— سيبقى مفتوحاً (جزئي)</span>
                )}
              </p>
            )}
            {error && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                <i className="fas fa-triangle-exclamation"></i>
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || !amount}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-check'}`}></i>
            {saving ? 'جاري التسجيل...' : 'قبول الدفعة'}
          </button>
        </div>
      </div>
    </div>
  );
}