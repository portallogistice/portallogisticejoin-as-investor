// src/features/profile/components/ProfileFormSection.jsx
export function ProfileFormSection({ title, children }) {
    return (
        <div className="space-y-4">
            <h3 className="border-b border-gray-200 pb-2 text-sm font-bold text-gray-900 dark:border-slate-700 dark:text-slate-100">
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );
}