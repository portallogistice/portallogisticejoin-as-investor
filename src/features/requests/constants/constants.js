// src/features/requests/utils/constants.js
export const REQUEST_TYPES = [
  {
    key: 'renew_contract',
    label: 'طلب تجديد العقد',
    desc: 'تجديد عقد الاستئجار الحالي لفترة جديدة',
    icon: 'fa-rotate-right',
    color: 'blue',
    needContract: true,
  },
  {
    key: 'sell_bike',
    label: 'طلب تصفية وبيع الدراجة',
    desc: 'طلب إنهاء العقد وتصفية الحصة وبيع الدراجة',
    icon: 'fa-motorcycle',
    color: 'amber',
    needContract: true,
  },
  {
    key: 'add_bike',
    label: 'طلب إضافة دراجة',
    desc: 'إضافة دراجة نارية جديدة لمحفظتك الاستثمارية',
    icon: 'fa-plus-circle',
    color: 'teal',
    needContract: false,
  },
];

export const STATUS_META = {
  pending: {
    label: 'قيد المراجعة',
    color: 'amber',
    icon: 'fa-clock',
  },
  in_review: {
    label: 'تحت المعالجة',
    color: 'blue',
    icon: 'fa-hourglass-half',
  },
  approved: {
    label: 'تمت الموافقة',
    color: 'green',
    icon: 'fa-circle-check',
  },
  rejected: {
    label: 'مرفوض',
    color: 'red',
    icon: 'fa-circle-xmark',
  },
  whatsapp_sent: {
    label: 'تم التواصل',
    color: 'emerald',
    icon: 'fa-comment-dots',
  },
  invoice_sent: {
    label: 'تم إرسال الفاتورة',
    color: 'indigo',
    icon: 'fa-paper-plane',
  },
  nafath_pending: {
    label: 'بانتظار توقيع نفاذ',
    color: 'violet',
    icon: 'fa-mobile-screen-button',
  },
  invoice_signed: {
    label: 'تم توقيع الفاتورة',
    color: 'teal',
    icon: 'fa-pen-fancy',
  },
};

// Tailwind color mappings
export const COLOR_MAP = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
    text: 'text-blue-700 dark:text-blue-300',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    text: 'text-amber-700 dark:text-amber-300',
    btn: 'bg-amber-600 hover:bg-amber-700',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    border: 'border-teal-200 dark:border-teal-800',
    icon: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400',
    text: 'text-teal-700 dark:text-teal-300',
    btn: 'bg-teal-600 hover:bg-teal-700',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
    text: 'text-green-700 dark:text-green-300',
    btn: 'bg-green-600 hover:bg-green-700',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    icon: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
    text: 'text-red-700 dark:text-red-300',
    btn: 'bg-red-600 hover:bg-red-700',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    border: 'border-indigo-200 dark:border-indigo-800',
    icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
    text: 'text-indigo-700 dark:text-indigo-300',
    btn: 'bg-indigo-600 hover:bg-indigo-700',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-800',
    icon: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
    text: 'text-violet-700 dark:text-violet-300',
    btn: 'bg-violet-600 hover:bg-violet-700',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
    text: 'text-emerald-700 dark:text-emerald-300',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
  },
};