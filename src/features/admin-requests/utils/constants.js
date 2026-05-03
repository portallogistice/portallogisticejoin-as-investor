export const TYPE_META = {
    renew_contract: {
        label: 'تجديد العقد',
        icon: 'fa-rotate-right',
        color: 'text-blue-700 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        iconColor: 'text-blue-600 dark:text-blue-400',
    },
    sell_bike: {
        label: 'تصفية وبيع',
        icon: 'fa-motorcycle',
        color: 'text-amber-700 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800',
        iconColor: 'text-amber-600 dark:text-amber-400',
    },
    add_bike: {
        label: 'إضافة دراجة',
        icon: 'fa-plus-circle',
        color: 'text-teal-700 dark:text-teal-400',
        bg: 'bg-teal-50 dark:bg-teal-900/20',
        border: 'border-teal-200 dark:border-teal-800',
        iconColor: 'text-teal-600 dark:text-teal-400',
    },
};

export const STATUS_META = {
    pending: {
        label: 'قيد المراجعة',
        icon: 'fa-clock',
        className:
            'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    },
    in_review: {
        label: 'تحت المعالجة',
        icon: 'fa-hourglass-half',
        className:
            'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    },
    approved: {
        label: 'تمت الموافقة',
        icon: 'fa-circle-check',
        className:
            'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    },
    rejected: {
        label: 'مرفوض',
        icon: 'fa-circle-xmark',
        className:
            'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    },
    invoice_sent: {
        label: 'تم إرسال الفاتورة',
        icon: 'fa-paper-plane',
        className:
            'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
    },
    whatsapp_sent: {
        label: 'تم التواصل',
        icon: 'fa-comment-dots',
        className:
            'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    },
    invoice_signed: {
        label: 'تم توقيع العقد',
        icon: 'fa-file-signature',
        className:
            'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
    },
};

export const FILTER_STATUS_OPTIONS = [
    { value: '', label: 'جميع الحالات' },
    { value: 'pending', label: 'قيد المراجعة' },
    { value: 'in_review', label: 'تحت المعالجة' },
    { value: 'approved', label: 'تمت الموافقة' },
    { value: 'rejected', label: 'مرفوض' },
    { value: 'whatsapp_sent', label: 'تم التواصل' },
];

export const FILTER_TYPE_OPTIONS = [
    { value: '', label: 'جميع الأنواع' },
    { value: 'renew_contract', label: 'تجديد العقد' },
    { value: 'sell_bike', label: 'تصفية وبيع' },
    { value: 'add_bike', label: 'إضافة دراجة' },
];

export const SUMMARY_CARDS = [
    { key: 'pending_count', label: 'قيد المراجعة', icon: 'fa-clock', color: 'amber' },
    { key: 'total_count', label: 'إجمالي الطلبات', icon: 'fa-inbox', color: 'blue' },
    { key: 'approved_count', label: 'تمت الموافقة', icon: 'fa-circle-check', color: 'green' },
    { key: 'rejected_count', label: 'مرفوض', icon: 'fa-circle-xmark', color: 'red' },
    { key: 'this_week_count', label: 'هذا الأسبوع', icon: 'fa-calendar-week', color: 'purple' },
    { key: 'pending_over_7_days_count', label: 'متأخر +7 أيام', icon: 'fa-triangle-exclamation', color: 'orange' },
];