export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[12rem] sm:min-h-[200px] gap-4 px-2" role="status">
      <div
        className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border-[3px] border-gray-200 dark:border-gray-700 border-t-indigo-600 dark:border-t-indigo-400 animate-spin"
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">
        جاري تحميل الطلبات...
      </span>
    </div>
  );
}
