// src/features/analytics/components/LoadingState.jsx
import { Watch } from 'react-loader-spinner';

export function LoadingState({ isAr }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
            <Watch height="52" width="52" radius="9" color="#2563eb" ariaLabel="loading" />
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {isAr ? 'جاري تحميل التحليلات...' : 'Loading analytics...'}
            </p>
        </div>
    );
}