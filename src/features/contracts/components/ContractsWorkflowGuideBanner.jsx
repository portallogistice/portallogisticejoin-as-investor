// src/features/contracts/components/ContractsWorkflowGuideBanner.jsx
import { DRAFT_RENTAL_CONTRACT_HREF, DRAFT_SALE_CONTRACT_HREF } from '../utils/constants';

export function ContractsWorkflowGuideBanner({ compact = false }) {
    return (
        <div
            className={`bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-800 rounded-2xl ${compact ? 'p-4' : 'p-5'}`}
            role="region"
            aria-label="مسودات عقود الإيجار والمبايعة"
        >
            <div className={`flex ${compact ? 'items-center gap-4' : 'flex-col sm:flex-row items-start sm:items-center gap-4'}`}>
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-file-pdf text-lg" aria-hidden="true" />
                </div>

                <div className="flex-1 min-w-0">
                    <strong className="text-sm font-bold text-gray-900 dark:text-white block">
                        نماذج العقود (مسودات PDF)
                    </strong>
                    {!compact && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            راجع مسودة عقد الإيجار ومسودة عقد المبايعة قبل أو أثناء متابعة عقودك.
                        </p>
                    )}
                </div>

                <div className={`flex gap-2 ${compact ? 'flex-shrink-0' : 'flex-wrap'}`}>
                    <a
                        href={DRAFT_RENTAL_CONTRACT_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        <span>مسودة عقد إيجار</span>
                        <i className="fas fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" />
                    </a>
                    <a
                        href={DRAFT_SALE_CONTRACT_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        <span>مسودة عقد مبايعة</span>
                        <i className="fas fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    );
}