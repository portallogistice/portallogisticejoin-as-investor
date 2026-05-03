// src/features/invoices/components/LoadingState.jsx
export function LoadingState() {
    return (
        <div className="inv-loading flex flex-col items-center gap-3 py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-gray-200 border-t-[#073491] dark:border-slate-700 dark:border-t-blue-400" aria-hidden="true" />
            <span className="text-sm text-gray-500 dark:text-slate-400">جاري تحميل الفواتير...</span>
        </div>
    );
}