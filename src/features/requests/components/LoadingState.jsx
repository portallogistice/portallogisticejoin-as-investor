// src/features/requests/components/LoadingState.jsx
export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin" aria-hidden="true" />
      <span className="text-sm text-gray-500 dark:text-gray-400">جاري التحميل...</span>
    </div>
  );
}