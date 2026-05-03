import React, { useEffect, useRef, useState } from 'react';
import { fmtRial } from '../utils/formatters';

export function ReceiptModal({ payment, onClose, onSuccess, uploadMutation }) {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');

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
        setError('');
        try {
            const result = await uploadMutation.mutateAsync({ paymentId: payment.id, file });
            onSuccess(result);
        } catch (e) {
            setError(e?.response?.data?.message || (e?.response?.status === 422 ? 'تأكد من نوع الملف وحجمه (PDF أو صورة حتى 10MB).' : 'تعذر رفع الإيصال. حاول مرة أخرى.'));
        }
    };

    const saving = uploadMutation.isPending;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="رفع إيصال الدفع" onClick={(e) => e.target === e.currentTarget && !saving && onClose()}>
            <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">رفع إيصال الدفع</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{payment.contract?.title} — الشهر {payment.month_number} — {fmtRial(payment.amount)}</p>
                    </div>
                    <button type="button" onClick={onClose} disabled={saving} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="إغلاق">
                        <i className="fas fa-times text-sm" aria-hidden="true" />
                    </button>
                </div>

                <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Dropzone */}
                    <div className={`m-0 border-2 border-dashed rounded-xl p-7 text-center cursor-pointer transition-all min-h-[130px] flex flex-col items-center justify-center gap-1.5 ${file ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }} onClick={() => inputRef.current?.click()} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}>
                        <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
                        {preview ? (
                            <img src={preview} alt="معاينة الإيصال" className="max-h-40 max-w-full rounded-lg object-contain" />
                        ) : (
                            <>
                                <i className={`fas ${file ? 'fa-file-check' : 'fa-cloud-arrow-up'} text-3xl ${file ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-500'}`} aria-hidden="true" />
                                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">{file ? file.name : 'اسحب الملف هنا أو انقر للاختيار'}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">PDF، JPG، PNG، WEBP — حتى 10MB</p>
                            </>
                        )}
                    </div>

                    {file && !preview && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-700 dark:text-indigo-300 text-xs border border-indigo-200 dark:border-indigo-800">
                            <i className="fas fa-file-pdf" aria-hidden="true" />
                            <span className="flex-1 truncate">{file.name}</span>
                            <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="text-slate-400 hover:text-red-500 text-lg leading-none" aria-label="إزالة">×</button>
                        </div>
                    )}

                    {error && (
                        <div className="px-3.5 py-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2" role="alert">
                            <i className="fas fa-triangle-exclamation" aria-hidden="true" /> {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                    <button type="button" onClick={onClose} disabled={saving} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">إلغاء</button>
                    <button type="button" onClick={submit} disabled={saving || !file} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-check'}`} aria-hidden="true" />
                        {saving ? 'جاري الرفع...' : 'قبول الدفعة'}
                    </button>
                </div>
            </div>
        </div>
    );
}