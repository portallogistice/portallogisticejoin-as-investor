export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-xl mb-4">
        <i className="fas fa-inbox" aria-hidden="true" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد فواتير تطابق الفلتر المحدد.</p>
    </div>
  );
}
