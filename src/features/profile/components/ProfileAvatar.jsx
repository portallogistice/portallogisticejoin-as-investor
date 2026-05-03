// src/features/profile/components/ProfileAvatar.jsx
export function ProfileAvatar({ user }) {
    const initial = (user?.first_name?.[0] || user?.family_name?.[0] || user?.last_name?.[0] || '?').toUpperCase();

    return (
        <div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 
                   flex items-center justify-center text-3xl font-bold text-white shadow-lg"
            aria-hidden="true"
        >
            {initial}
        </div>
    );
}