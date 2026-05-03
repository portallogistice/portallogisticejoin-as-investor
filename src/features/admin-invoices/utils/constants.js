export const YEAR_META = {
  1: {
    label: 'السنة ١',
    className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    stripe: '#2563eb',
  },
  2: {
    label: 'السنة ٢',
    className: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
    stripe: '#7c3aed',
  },
  3: {
    label: 'السنة ٣',
    className: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800',
    stripe: '#0f766e',
  },
};

export const STATUS_META = {
  pending: {
    label: 'بانتظار الدفع',
    icon: 'fa-clock',
    className:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
  },
  admin_pending: {
    label: 'قيد المراجعة',
    icon: 'fa-hourglass-half',
    className:
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
  },
  approved: {
    label: 'مقبول',
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
};

export const STAT_CARDS = [
  { key: 'count_pending', label: 'بانتظار الدفع', icon: 'fa-clock', color: 'amber' },
  { key: 'count_admin_pending', label: 'قيد المراجعة', icon: 'fa-hourglass-half', color: 'blue' },
  { key: 'count_approved', label: 'مقبولة', icon: 'fa-circle-check', color: 'green' },
  { key: 'count_rejected', label: 'مرفوضة', icon: 'fa-circle-xmark', color: 'red' },
  { key: 'total_amount', label: 'إجمالي المبالغ', icon: 'fa-coins', color: 'purple', isCurrency: true },
];

export const FILTER_STATUS_OPTIONS = [
  { value: '', label: 'جميع الحالات' },
  { value: 'admin_pending', label: 'قيد المراجعة' },
  { value: 'pending', label: 'بانتظار الدفع' },
  { value: 'approved', label: 'مقبولة' },
  { value: 'rejected', label: 'مرفوضة' },
];

export const FILTER_YEAR_OPTIONS = [
  { value: '', label: 'جميع السنوات' },
  { value: '1', label: 'السنة الأولى' },
  { value: '2', label: 'السنة الثانية' },
  { value: '3', label: 'السنة الثالثة' },
];
