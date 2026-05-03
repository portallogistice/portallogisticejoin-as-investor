// src/features/contracts/modals/SaleReceiptUploadModal.jsx
import { useEffect, useRef, useState } from 'react';
import { formatBytes } from '../utils/formatters';
import { MAX_FILE_MB, MAX_FILE_BYTES } from '../utils/constants';

export default function SaleReceiptUploadModal({ contractId, onClose, onSuccess }) {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);

    const handleFile = (f) => {
        if (!f) return;
        setFile(f);
        setError('');
        setPreview(f.type.startsWith('image/') ? URL.createObjectURL(f) : null);
    };

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview); };
    }, [preview]);

    const submit = async () => {
        if (!file) { setError('يرجى اختيار ملف الإيصال أولاً.'); return; }
        setSaving(true);
        setError('');
        try {
            const { uploadSaleReceipt } = await import('../api/uploadSaleReceipt');
            const data = await uploadSaleReceipt(contractId, file);
            onSuccess(data);
        } catch (e) {
            setError(e?.response?.data?.message || 'تعذر رفع الإيصال. حاول مرة أخرى.');
        } finally {
            setSaving(false);
        }
    };

    const isOversized = file && file.size > MAX_FILE_BYTES;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label="رفع إيصال الدفع"
            onClick={(e) => e.target === e.currentTarget && !saving && onClose()}
        >
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">رفع إيصال الدفع</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            ارفع إيصال التحويل لإثبات الدفع — يمكنك الرفع أكثر من مرة.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                        aria-label="إغلاق"
                    >
                        <i className="fas fa-times" aria-hidden="true" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">

                    {/* Dropzone */}
                    <div
                        className={`
              relative rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all
              ${dragOver
                                ? 'border-blue-400 bg-blue-50/40 dark:bg-blue-900/20'
                                : file
                                    ? 'border-green-400 bg-green-50/30 dark:bg-green-900/10'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'}
            `}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                            handleFile(e.dataTransfer.files?.[0]);
                        }}
                        onClick={() => inputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            className="hidden"
                            onChange={(e) => handleFile(e.target.files?.[0])}
                        />

                        {preview ? (
                            <img src={preview} alt="معاينة" className="max-h-40 mx-auto rounded-lg object-contain" />
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 flex items-center justify-center text-xl">
                                    <i className={`fas ${file ? 'fa-file-check' : 'fa-cloud-arrow-up'}`} aria-hidden="true" />
                                </div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {file ? file.name : 'اسحب الملف هنا أو انقر للاختيار'}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">PDF، JPG، PNG، WEBP - حتى {MAX_FILE_MB}MB</p>
                            </div>
                        )}
                    </div>

                    {/* Errors */}
                    {isOversized && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                            <i className="fas fa-triangle-exclamation flex-shrink-0" aria-hidden="true" />
                            <span>حجم الملف كبير جداً. الحد الأقصى {MAX_FILE_MB}MB.</span>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                            <i className="fas fa-triangle-exclamation flex-shrink-0" aria-hidden="true" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 p-5 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                        إلغاء
                    </button>
                    <button
                        type="button"
                        onClick={submit}
                        disabled={saving || !file || isOversized}
                        className={`
              w-full sm:w-auto
              px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all
              ${file && !isOversized
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }
            `}
                    >
                        {saving ? (
                            <><i className="fas fa-spinner fa-spin text-xs" aria-hidden="true" /> جاري الرفع...</>
                        ) : (
                            <><i className="fas fa-cloud-arrow-up text-xs" aria-hidden="true" /> رفع الإيصال</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}