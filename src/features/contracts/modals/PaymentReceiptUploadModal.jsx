// src/features/contracts/components/PaymentReceiptUploadModal.jsx
import { useEffect, useRef, useState } from 'react';
import { formatBytes } from '../utils/formatters';
import { MAX_FILE_MB, MAX_FILE_BYTES } from '../utils/constants';

export default function PaymentReceiptUploadModal({
    isOpen,
    onClose,
    onSave,
    isSaving,
    error: serverError,
    contractId,
}) {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    useEffect(() => {
        if (isOpen) setFile(null);
    }, [isOpen]);

    const handleFile = (f) => {
        if (!f) return;
        setFile(f);
    };

    const isOversized = file && file.size > MAX_FILE_BYTES;
    const canSave = !!file && !isSaving && !isOversized;

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label="رفع إيصال الدفع"
            onClick={(e) => e.target === e.currentTarget && !isSaving && onClose()}
        >
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                            رفع إيصال الدفع
                        </h3>
                        {contractId && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                للعقد رقم <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">#{contractId}</span>
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
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
                                ? 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/10'
                                : file
                                    ? 'border-green-400 bg-green-50/30 dark:bg-green-900/10'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                            }
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
                            accept="image/*,application/pdf"
                            className="hidden"
                            onChange={(e) => handleFile(e.target.files?.[0])}
                            disabled={isSaving}
                        />

                        <div className="flex flex-col items-center gap-2">
                            <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-xl
                ${file
                                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                                }
              `}>
                                <i className={`fas ${file ? 'fa-file-check' : 'fa-cloud-arrow-up'}`} aria-hidden="true" />
                            </div>

                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {file ? file.name : 'اسحب الملف هنا أو انقر للاختيار'}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                PDF، JPG، PNG، WEBP - حتى {MAX_FILE_MB}MB
                            </p>
                        </div>
                    </div>

                    {/* File info */}
                    {file && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">
                                <i className="fas fa-file" aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatBytes(file.size)}</p>
                            </div>
                            {!isSaving && (
                                <button
                                    type="button"
                                    onClick={() => setFile(null)}
                                    className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    aria-label="إزالة الملف"
                                >
                                    <i className="fas fa-times text-xs" aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Errors */}
                    {isOversized && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                            <i className="fas fa-triangle-exclamation flex-shrink-0" aria-hidden="true" />
                            <span>حجم الملف كبير جداً. الحد الأقصى {MAX_FILE_MB}MB.</span>
                        </div>
                    )}

                    {serverError && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                            <i className="fas fa-triangle-exclamation flex-shrink-0" aria-hidden="true" />
                            <span>{serverError}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 p-5 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                        إلغاء
                    </button>
                    <button
                        type="button"
                        onClick={() => onSave?.(file)}
                        disabled={!canSave}
                        className={`
              w-full sm:w-auto
              px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all
              ${canSave
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md active:scale-95'
                                : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                            }
            `}
                    >
                        {isSaving ? (
                            <>
                                <i className="fas fa-spinner fa-spin text-xs" aria-hidden="true" />
                                جاري الحفظ...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-cloud-arrow-up text-xs" aria-hidden="true" />
                                حفظ
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}