// src/features/profile/components/ProfileFormField.jsx
export function ProfileFormField({ id, label, error, children, required }) {
    return (
        <div id={`profile-field-${id}`} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                {label}
                {required && <span className="mr-1 text-red-500 dark:text-red-400">*</span>}
            </label>
            {children}
            {error && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-300">{error}</p>
            )}
        </div>
    );
}