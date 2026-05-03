export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4" role="status">
      <div className="w-10 h-10 rounded-full border-[3px] border-gray-200 dark:border-gray-700 border-t-blue-700 dark:border-t-blue-500 animate-spin" aria-hidden="true" />
      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">جاري تحميل الفواتير...</span>
    </div>
  );
}
