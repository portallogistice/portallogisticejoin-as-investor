// src/features/profile/components/SupportSection.jsx
import { SUPPORT_CONFIG } from '../constants/constants';

export function SupportSection({ isAr }) {
    const handleSupportClick = () => {
        if (SUPPORT_CONFIG.whatsapp) {
            const num = SUPPORT_CONFIG.whatsapp.replace(/\D/g, '');
            window.open(`https://wa.me/${num}`, '_blank', 'noopener,noreferrer');
        } else if (SUPPORT_CONFIG.url) {
            window.open(SUPPORT_CONFIG.url, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = `mailto:${SUPPORT_CONFIG.email}`;
        }
    };

    return (
        <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    {isAr ? 'لتعديل بياناتك يرجى التواصل مع الدعم' : 'To update your details, please contact support.'}
                </p>
            </div>

            <button
                type="button"
                onClick={handleSupportClick}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 
                    text-white dark:text-gray-900 rounded-xl 
                   font-medium border border-gray-200 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
                <i className="fas fa-headset" aria-hidden="true" />
                {isAr ? 'التواصل مع الدعم' : 'Contact Support'}
            </button>
        </div>
    );
}