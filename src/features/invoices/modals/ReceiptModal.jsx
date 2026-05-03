// src/features/invoices/modals/ReceiptModal.jsx
import { Watch } from 'react-loader-spinner';
import { useUploadReceipt } from '../hooks/useUploadReceipt';
import { useInvoiceForm } from '../hooks/useInvoiceForm';
import { getYearMeta } from '../utils/formatters';
import { fmtSAR, fmtDate } from '../utils/formatters';

export function ReceiptModal({ invoice, onClose, onSuccess }) {
    const yearMeta = getYearMeta(invoice.year);
    const uploadMutation = useUploadReceipt();
    const { inputRef, file, preview, error, setError, handleFile, clearFile, validate } = useInvoiceForm();

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            const result = await uploadMutation.mutateAsync({
                invoiceId: invoice.id,
                file,
            });
            onSuccess(result);
        } catch {
            // Error handled by mutation
        }
    };

    const isSubmitting = uploadMutation.isPending;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && !isSubmitting && onClose()}
        >
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200  shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-200 p-6 dark:border-slate-700">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">رفع إيصال الدفع</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                            {yearMeta.label} — {fmtSAR(invoice.amount)} ر.س
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-slate-200"
                        aria-label="إغلاق"
                    >
                        <i className="fas fa-times text-lg" aria-hidden="true" />
                    </button>
                </div>

                {/* Info Strip */}
                <div className="p-6 pb-0">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="rounded-xl bg-gray-50 p-3 text-center dark:bg-slate-800">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">المبلغ السنوي</span>
                            <strong className="text-sm text-gray-900 dark:text-white">{fmtSAR(invoice.amount)} ر.س</strong>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-3 text-center dark:bg-slate-800">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">الشهري</span>
                            <strong className="text-sm text-gray-900 dark:text-white">{fmtSAR(invoice.monthly_amount)} ر.س</strong>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-3 text-center dark:bg-slate-800">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">تاريخ الاستحقاق</span>
                            <strong className="text-sm text-gray-900 dark:text-slate-100">{fmtDate(invoice.due_date)}</strong>
                        </div>
                    </div>
                </div>

                {/* Drop Zone */}
                <div className="px-6 pb-6">
                    <div
                        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all
              ${file
                                ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                                : 'border-gray-300 dark:border-slate-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                            }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            handleFile(e.dataTransfer.files?.[0]);
                        }}
                        onClick={() => inputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            className="hidden"
                            onChange={(e) => handleFile(e.target.files?.[0])}
                        />

                        {preview ? (
                            <img src={preview} alt="معاينة" className="max-h-48 mx-auto rounded-xl" />
                        ) : (
                            <>
                                <i className={`fas ${file ? 'fa-file-check text-green-500' : 'fa-cloud-arrow-up text-gray-400'} text-4xl mb-3`} aria-hidden="true" />
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {file ? file.name : 'اسحب الملف هنا أو انقر للاختيار'}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">PDF، JPG، PNG، WEBP — حتى 10MB</p>
                            </>
                        )}
                    </div>

                    {/* File Chip (PDF) */}
                    {file && !preview && (
                        <div className="mt-3 flex items-center gap-2 rounded-xl bg-gray-100 p-3 dark:bg-slate-800">
                            <i className="fas fa-file-pdf text-red-500" aria-hidden="true" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">{file.name}</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFile();
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="إزالة"
                            >
                                <i className="fas fa-times" aria-hidden="true" />
                            </button>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                            <i className="fas fa-triangle-exclamation" aria-hidden="true" />
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 border-t border-gray-200 p-6 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        إلغاء
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !file}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#073491] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#052870] disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                        {isSubmitting ? (
                            <>
                                <Watch height={18} width={18} color="#fff" ariaLabel="loading" />
                                جاري الرفع...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-cloud-arrow-up" aria-hidden="true" />
                                رفع الإيصال
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}