export function EmptyState() {
    return (
        <div className="text-center py-12 sm:py-16 md:py-20 px-3 sm:px-4 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
            <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-blue-900/20 dark:to-gray-800 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-2xl sm:text-[28px]">
                <i className="fas fa-file-contract" aria-hidden="true" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white mb-2">
                لا توجد عقود معتمدة
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                عند اعتماد عقدك سيظهر هنا مع جدول الدفعات بعد تفعيل الاستثمار.
            </p>
        </div>
    );
}