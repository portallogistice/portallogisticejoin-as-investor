// src/features/requests/components/SummaryStrip.jsx
export function SummaryStrip({ summary }) {
  if (!summary) return null;

  const items = [
    { num: summary.total || 0, label: 'إجمالي الطلبات', color: 'gray' },
    { num: summary.pending || 0, label: 'قيد المراجعة', color: 'amber' },
    { num: summary.approved || 0, label: 'تمت الموافقة', color: 'green' },
  ];

  const colorMap = {
    gray: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  };

  const numColorMap = {
    gray: 'text-gray-900 dark:text-white',
    amber: 'text-amber-700 dark:text-amber-400',
    green: 'text-green-700 dark:text-green-400',
  };

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {items.map((item) => (
        <div key={item.label} className={`rounded-xl border p-4 text-center ${colorMap[item.color]}`}>
          <span className={`block text-2xl font-extrabold ${numColorMap[item.color]}`}>{item.num}</span>
          <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}