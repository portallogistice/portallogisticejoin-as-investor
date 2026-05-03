// src/features/contracts/components/LoadingState.jsx
export function LoadingState() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
            <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-10 h-10 border-4 border-indigo-100 dark:border-indigo-900/30 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mb-4" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    جاري تحميل العقود...
                </p>
            </div>
        </div>
    );
}
