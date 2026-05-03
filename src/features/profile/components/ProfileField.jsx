// src/features/profile/components/ProfileField.jsx
export function ProfileField({ label, value, highlight }) {
    const valueClass = highlight
        ? 'text-green-600 dark:text-green-400 font-semibold'
        : 'text-gray-900 dark:text-white';

    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</span>
            <span className={`block text-sm ${valueClass}`}>{value || '—'}</span>
        </div>
    );
}