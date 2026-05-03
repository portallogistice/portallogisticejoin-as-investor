export function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[220px] gap-3 sm:gap-4 px-1" role="status" aria-live="polite">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-[3px] border-gray-200 dark:border-gray-700 border-t-blue-700 dark:border-t-blue-500 animate-spin" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 text-center px-2">جاري تحميل العقود...</span>
            <div className="w-full max-w-md min-w-0 space-y-3 sm:space-y-4 mt-1 sm:mt-2">
                <div className="h-32 sm:h-40 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] animate-[shimmer_1.2s_ease-in-out_infinite]" />
                <div className="h-32 sm:h-40 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] animate-[shimmer_1.2s_ease-in-out_infinite]" />
            </div>
        </div>
    );
}