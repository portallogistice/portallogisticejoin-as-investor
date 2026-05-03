import { useRef, useState } from 'react';
import { formatBytes } from '../utils/formatters';

const MAX_SIZE = 20 * 1024 * 1024;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

export function DeployContractModal({ req, onClose, onSuccess, isLoading, error }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [localError, setLocalError] = useState('');

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) {
      setFile(null);
      setLocalError('');
      return;
    }

    if (f.size > MAX_SIZE) {
      setLocalError('حجم الملف يجب أن يكون أقل من 20 ميجابايت.');
      return;
    }
    if (!ALLOWED_TYPES.includes(f.type)) {
      setLocalError('نوع الملف غير مدعوم. استخدم PDF أو صورة.');
      return;
    }

    setFile(f);
    setLocalError('');
  };

  const handleSubmit = () => {
    if (!file) {
      setLocalError('اختر ملف لتحميله.');
      return;
    }
    onSuccess({ requestId: req.id, file });
  };

  const displayError = localError || error;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 dark:bg-black/60 backdrop-blur-sm p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      onClick={(e) => e.target === e.currentTarget && !isLoading && onClose()}
      role="presentation"
    >
      <div
        className="w-full max-w-md max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deploy-modal-title"
      >
        <div className="flex items-start justify-between gap-2 p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700 shrink-0">
          <div className="min-w-0 pr-2">
            <h3 id="deploy-modal-title" className="text-base font-bold text-gray-900 dark:text-white">
              تحميل العقد
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-words">
              المستثمر: <strong className="text-gray-800 dark:text-gray-200">{req.full_name}</strong> — {req.national_id}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="min-h-[44px] min-w-[44px] sm:min-h-8 sm:min-w-8 shrink-0 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors disabled:opacity-50 touch-manipulation"
            aria-label="إغلاق"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
              ملف العقد (PDF أو صورة) <span className="text-red-600 dark:text-red-400">*</span>
            </label>
            <div
              className="relative rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-5 sm:p-6 text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors min-h-[8rem] flex flex-col items-center justify-center touch-manipulation"
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                onChange={handleFileChange}
                className="hidden"
                disabled={isLoading}
              />
              <div className="flex flex-col items-center gap-2 max-w-full">
                <div className="w-11 h-11 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <i className={`fas ${file ? 'fa-file-check' : 'fa-cloud-arrow-up'} text-lg`} aria-hidden="true" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200 break-all px-1">{file ? file.name : 'اختر ملف'}</p>
                {file && <p className="text-xs text-gray-500 dark:text-gray-400">{formatBytes(file.size)}</p>}
              </div>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-500 mt-1.5 block">الحد الأقصى للملف: 20 ميجابايت</span>
          </div>

          {displayError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/25 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm">
              <i className="fas fa-triangle-exclamation flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="break-words">{displayError}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-4 sm:p-5 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 sm:py-2 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 touch-manipulation"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !file}
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 sm:py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all disabled:opacity-50 touch-manipulation"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin text-xs" aria-hidden="true" /> جاري التحميل...
              </>
            ) : (
              <>
                <i className="fas fa-file-upload text-xs" aria-hidden="true" /> تحميل العقد
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
