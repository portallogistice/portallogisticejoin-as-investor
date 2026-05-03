// src/features/profile/components/ProfileModal.jsx
import { useEffect } from 'react';

export function ProfileModal({ isOpen, onClose, title, subtitle, children }) {
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed top-10 left-0 right-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm dark:bg-black/60"
            onClick={(e) => e.target === e.currentTarget && onClose?.()}
        >
            <div
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 z-10 flex items-start justify-between rounded-t-2xl border-b border-gray-200 bg-white/95 p-6 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">{title}</h2>
                        {subtitle && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{subtitle}</p>
                        )}
                    </div>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            aria-label="Close"
                        >
                            <i className="fas fa-times text-lg" aria-hidden="true" />
                        </button>
                    )}
                </div>
                <div className="p-6 dark:bg-slate-900">{children}</div>
            </div>
        </div>
    );
}