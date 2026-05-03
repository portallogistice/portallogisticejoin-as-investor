// src/features/contracts/components/ContractActions.jsx
export function ContractActions({ contract, onNafath, onSaleReceipt, onLegacyReceipt, isNafathLoading }) {
    const canVerify = contract.status === 'sent';
    const canUploadSaleReceipt = contract.type === 'sale' && contract.status === 'need_to_pay';
    const canUploadLegacyReceipt = contract.status === 'approved' && contract.type === 'sale' && !contract.payment_receipt_path;

    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/80">
            {contract.file_url && (
                <a
                    href={contract.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    <i className="fas fa-eye text-[10px]" aria-hidden="true" />
                    عرض PDF
                </a>
            )}

            {contract.sale_receipt_url && (
                <a
                    href={contract.sale_receipt_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    <i className="fas fa-receipt text-[10px]" aria-hidden="true" />
                    الإيصال المرفوع
                </a>
            )}

            {contract.payment_receipt_url && (
                <a
                    href={contract.payment_receipt_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    <i className="fas fa-receipt text-[10px]" aria-hidden="true" />
                    عرض الإيصال
                </a>
            )}

            {canUploadSaleReceipt && (
                <button
                    type="button"
                    onClick={() => onSaleReceipt(contract.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                    <i className="fas fa-cloud-arrow-up text-[10px]" aria-hidden="true" />
                    رفع إيصال الدفع
                </button>
            )}

            {canUploadLegacyReceipt && (
                <button
                    type="button"
                    onClick={() => onLegacyReceipt(contract.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                    <i className="fas fa-cloud-arrow-up text-[10px]" aria-hidden="true" />
                    رفع إيصال الدفع
                </button>
            )}

            <button
                type="button"
                onClick={() => onNafath(contract.id)}
                disabled={!canVerify || isNafathLoading}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all
            ${canVerify && !isNafathLoading
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-transparent'
                    }`}
            >
                <i className={`fas ${isNafathLoading ? 'fa-spinner fa-spin' : 'fa-shield-halved'} text-[10px]`} aria-hidden="true" />
                {isNafathLoading ? 'جاري الإرسال...' : 'توثيق عبر نفاذ'}
            </button>
        </div>
    );
}