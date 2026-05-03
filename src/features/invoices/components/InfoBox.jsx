// src/features/invoices/components/InfoBox.jsx
import { YEAR_META } from '../utils/constants';
import { fmtSAR } from '../utils/formatters';

export function InfoBox() {
    return (
        <div className="mt-2 rounded-2xl border border-blue-200 bg-[#f8faff] p-5 dark:border-blue-800/60 dark:bg-blue-950/20">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#073491] dark:text-blue-300">
                <i className="fas fa-circle-info" aria-hidden="true" />
                معلومات تأمين الصيانة
            </h3>
            <div className="flex flex-col gap-2">
                {Object.entries(YEAR_META).map(([y, m]) => {
                    const colorClasses = {
                        blue: 'border-r-4 border-blue-500',
                        violet: 'border-r-4 border-violet-500',
                        teal: 'border-r-4 border-teal-500',
                    };

                    return (
                        <div key={y} className={`flex flex-wrap items-center gap-3 rounded-lg  py-2 pr-3 pl-2 dark:bg-slate-900 ${colorClasses[m.color]}`}>
                            <strong className="min-w-[100px] text-sm text-gray-900 dark:text-slate-100">{m.label}</strong>
                            <span className="text-sm text-gray-700 dark:text-slate-300">{fmtSAR(m.amount)} ر.س سنوياً</span>
                            <span className="mr-auto text-[11px] text-gray-500 dark:text-slate-400">
                                ({fmtSAR(m.monthly)} ر.س / شهر)
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}