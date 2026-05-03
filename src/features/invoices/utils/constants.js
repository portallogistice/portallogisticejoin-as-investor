// src/features/invoices/utils/constants.js
export const YEAR_META = {
    1: { label: 'السنة الأولى', amount: 1500, monthly: 125, color: 'blue' },
    2: { label: 'السنة الثانية', amount: 2700, monthly: 225, color: 'violet' },
    3: { label: 'السنة الثالثة', amount: 3300, monthly: 325, color: 'teal' },
};

export const STATUS_META = {
    pending: {
        label: 'بانتظار الدفع',
        color: 'amber',
        icon: 'fa-clock',
    },
    admin_pending: {
        label: 'قيد المراجعة',
        color: 'blue',
        icon: 'fa-hourglass-half',
    },
    approved: {
        label: 'مقبول',
        color: 'green',
        icon: 'fa-circle-check',
    },
    rejected: {
        label: 'مرفوض',
        color: 'red',
        icon: 'fa-circle-xmark',
    },
};

export const COLOR_MAP = {
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-700 dark:text-blue-300',
        badge: 'bg-blue-600',
        pill: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    },
    violet: {
        bg: 'bg-violet-50 dark:bg-violet-900/20',
        border: 'border-violet-200 dark:border-violet-800',
        text: 'text-violet-700 dark:text-violet-300',
        badge: 'bg-violet-600',
        pill: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    },
    teal: {
        bg: 'bg-teal-50 dark:bg-teal-900/20',
        border: 'border-teal-200 dark:border-teal-800',
        text: 'text-teal-700 dark:text-teal-300',
        badge: 'bg-teal-600',
        pill: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800',
        text: 'text-amber-700 dark:text-amber-300',
        badge: 'bg-amber-600',
        pill: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-700 dark:text-green-300',
        badge: 'bg-green-600',
        pill: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    },
    red: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-800',
        text: 'text-red-700 dark:text-red-300',
        badge: 'bg-red-600',
        pill: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    },
};