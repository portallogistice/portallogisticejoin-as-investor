import { activationProgressPercent } from '../utils/activation';

export function ActivationBar({ approvedAt, daysLeft, activated }) {
    const pct = activationProgressPercent(approvedAt, daysLeft, activated);

    return (
        <div className="mt-3">
            <div className="h-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <p className="text-[10px] sm:text-[11px] font-semibold text-amber-700 dark:text-amber-400 mt-1.5 leading-relaxed break-words">
                مراحل التفعيل: {pct}% من مدة الانتظار (35 يوماً من الاعتماد)
            </p>
        </div>
    );
}