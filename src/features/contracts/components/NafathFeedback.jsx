// src/features/contracts/components/NafathFeedback.jsx
export function NafathFeedback({ feedback }) {
    if (!feedback?.message) return null;

    const isOk = feedback.ok;
    const baseClasses = 'mt-4 p-4 rounded-xl text-sm border transition-all animate-in fade-in slide-in-from-top-2';
    const okClasses = 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300';
    const errClasses = 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300';

    return (
        <div className={`${baseClasses} ${isOk ? okClasses : errClasses}`} role="alert">
            <div className="flex items-start gap-3">
                <i className={`fas ${isOk ? 'fa-check-circle' : 'fa-circle-exclamation'} mt-0.5 flex-shrink-0`} aria-hidden="true" />
                <div className="flex-1">
                    <p className="font-medium">{feedback.message}</p>
                    {feedback.challengeNumber && (
                        <div className="mt-2 p-2 bg-white/50 dark:bg-black/20 rounded-lg font-mono text-xs">
                            رقم التحدي: <span className="font-bold">{feedback.challengeNumber}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}