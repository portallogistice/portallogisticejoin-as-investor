// src/features/contracts/components/EmptyState.jsx
export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <i className="fas fa-file-contract text-2xl text-gray-400 dark:text-gray-500" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">لا توجد عقود</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">سيظهر عقدك هنا بعد إنشائه.</p>
        </div>
    );
}