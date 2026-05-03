// src/features/invoices/components/EmptyState.jsx
export function EmptyState() {
    return (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
            <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800">
                <i className="fas fa-file-invoice text-3xl text-gray-400 dark:text-gray-500" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-bold text-gray-700 dark:text-slate-200">لا توجد فواتير</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                ستظهر فواتير تأمين الصيانة هنا بعد اعتماد عقد الاستئجار.
            </p>
        </div>
    );
}