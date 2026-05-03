// src/features/analytics/utils/constants.js
export const MONTH_NAMES_EN = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const MONTH_NAMES_AR = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

export const STATIC_SUMMARY = {
    total_contracts: 0,
    active_contracts: 0,
    pending_contracts: 0,
    total_invested: 0,
    total_received: 0,
    pending_payments: 0,
    completion_rate: 0,
    next_payment: { amount: 0, due_date: null, days_remaining: 0 },
};

export const STATIC_MONTHLY = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    month_name: MONTH_NAMES_EN[i],
    month_name_ar: MONTH_NAMES_AR[i],
    total_amount: i < 3 ? 15000 : 0,
    pending_amount: i >= 3 && i < 12 ? 15000 : 0,
    count_received: i < 3 ? 1 : 0,
    count_pending: i >= 3 ? 1 : 0,
}));

export const KPI_COLORS = {
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        icon: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        icon: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800',
        icon: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    },
    teal: {
        bg: 'bg-teal-50 dark:bg-teal-900/20',
        border: 'border-teal-200 dark:border-teal-800',
        icon: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400',
    },
};