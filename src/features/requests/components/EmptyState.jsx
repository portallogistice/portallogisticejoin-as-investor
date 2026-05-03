// src/features/requests/components/EmptyState.jsx
export function EmptyState() {
  return (
    <div className="text-center py-16 text-gray-400 dark:text-gray-500">
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
        <i className="fas fa-inbox text-2xl" aria-hidden="true" />
      </div>
      <p className="text-sm">{document.dir === 'rtl' ? 'لم تقدّم أي طلبات بعد.' : 'No requests yet.'}</p>
    </div>
  );
}