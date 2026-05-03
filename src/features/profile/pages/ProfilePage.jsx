// src/features/profile/pages/ProfilePage.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Watch } from 'react-loader-spinner';
import { useProfile } from '../hooks/useProfile';
import { isProfileComplete } from '../utils/formatters';

import { ProfileAvatar } from '../components/ProfileAvatar';
import { ProfileGrid } from '../components/ProfileGrid';
import { SupportSection } from '../components/SupportSection';
import ProfileCompletionModal from '../modals/ProfileCompletionModal';

export default function ProfilePage() {
    const { i18n } = useTranslation(['common']);
    const isAr = i18n.language === 'ar';

    const { data: profile, isLoading, error, refetch } = useProfile();
    const [showModal, setShowModal] = useState(false);

    const incomplete = profile ? !isProfileComplete(profile) : false;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3" dir={isAr ? 'rtl' : 'ltr'}>
                <Watch height="60" width="60" radius="9" color="#2563eb" ariaLabel="loading" />
                <p className="text-gray-500 dark:text-gray-400">{isAr ? 'جاري التحميل...' : 'Loading...'}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6" dir={isAr ? 'rtl' : 'ltr'}>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
                    <i className="fas fa-exclamation-circle text-red-600 dark:text-red-400" aria-hidden="true" />
                    <span className="text-red-800 dark:text-red-300">{error.message || (isAr ? 'فشل في جلب البيانات' : 'Failed to load data')}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6" dir={isAr ? 'rtl' : 'ltr'}>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {isAr ? 'الملف الشخصي' : 'Profile'}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isAr ? 'معلومات حسابك الشخصية' : 'Your personal account information'}
                </p>
            </div>

            {/* Incomplete Profile Alert + Button */}
            {incomplete && (
                <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                            <i className="fas fa-exclamation-triangle text-amber-600 dark:text-amber-400" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                                {isAr ? 'الملف الشخصي غير مكتمل' : 'Profile Incomplete'}
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-400">
                                {isAr ? 'يرجى إكمال بياناتك للاستفادة من جميع الخدمات' : 'Please complete your data to access all services'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                        <i className="fas fa-edit" aria-hidden="true" />
                        {isAr ? 'إكمال البيانات' : 'Complete Profile'}
                    </button>
                </div>
            )}

            {/* Profile Card */}
            {profile && (
                <div className=" border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                        <ProfileAvatar user={profile} />
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {(profile.first_name && profile.family_name)
                                    ? `${profile.first_name} ${profile.family_name}`
                                    : (profile.full_name || (isAr ? 'مستخدم' : 'User'))}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email || (isAr ? 'لا يوجد بريد' : 'No email')}</p>
                        </div>
                    </div>

                    {/* Fields Grid */}
                    <ProfileGrid profile={profile} isAr={isAr} />
                </div>
            )}

            {!profile && !isLoading && (
                <div className="text-center py-12 text-gray-400">
                    <i className="fas fa-user-slash text-4xl mb-3" aria-hidden="true" />
                    <p>{isAr ? 'لا توجد بيانات' : 'No data available'}</p>
                </div>
            )}

            {/* Support */}
            <SupportSection isAr={isAr} />

            {/* Profile Completion Modal */}
            {showModal && profile && (
                <ProfileCompletionModal
                    userProfile={profile}
                    onComplete={(updatedUser) => {
                        setShowModal(false);
                        refetch(); // Refresh profile data
                    }}
                    onSkip={() => setShowModal(false)}
                />
            )}
        </div>
    );
}