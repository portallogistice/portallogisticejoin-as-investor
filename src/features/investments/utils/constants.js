
export const ACTIVATION_DAYS = 35;
export const MONTHLY_PAYMENT = 660;
export const SCHEDULE_MONTHS = 12;

export const STATUS_CONFIG = {
    received: {
        label: 'مدفوع',
        className:
            'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    },
    pending: {
        label: 'قيد الانتظار',
        className:
            'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    },
    sent: {
        label: 'مُرسل',
        className:
            'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    },
    reported_missing: {
        label: 'مُبلَّغ عن غيابه',
        className:
            'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    },
};

export const CONTRACT_TYPE_CONFIG = {
    sale: {
        label: 'عقد مبايعة',
        className:
            'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    },
    rental: {
        label: 'عقد استئجار',
        className:
            'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    },
};