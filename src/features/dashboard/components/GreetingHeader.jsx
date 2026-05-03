// src/features/dashboard/components/GreetingHeader.jsx
export function GreetingHeader({ user, error, isAr }) {
    const firstName = user?.first_name;

    return (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 max-[900px]:flex-col max-[900px]:items-start">
            <div>
                <h1 className="mb-1 text-[22px] font-bold text-gray-900 max-[640px]:text-[18px] max-[480px]:text-[16px] dark:text-white">
                    {isAr
                        ? `مرحباً${firstName ? `، ${firstName}` : ''} `
                        : `Hello${firstName ? ` ${firstName}` : ''} `
                    }
                </h1>
                <p className="text-sm text-gray-500 max-[640px]:text-[13px] max-[480px]:text-xs dark:text-gray-400">
                    {isAr ? 'إليك ملخص استثماراتك اليوم' : "Here's a summary of your investments today"}
                </p>
            </div>
            {error && (
                <span className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3.5 py-1.5 text-[13px] text-red-700 max-[480px]:text-xs dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                    <i className="fas fa-triangle-exclamation" />
                    {error}
                </span>
            )}
        </div>
    );
}