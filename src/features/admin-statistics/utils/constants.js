export const PERIOD_OPTIONS = [
  { value: 'all_time', label: 'جميع الأوقات' },
  { value: 'this_month', label: 'هذا الشهر' },
  { value: 'this_week', label: 'هذا الأسبوع' },
];

export const STATUS_LABELS = {
  approved:       { text: 'مقبولة', color: 'emerald' },
  rejected:       { text: 'مرفوضة', color: 'red' },
  need_to_pay:    { text: 'بانتظار الدفع', color: 'amber' },
  admin_pending:  { text: 'قيد المراجعة', color: 'blue' },
  receipt_review: { text: 'مراجعة الإيصال', color: 'orange' },
  sent:           { text: 'تم الإرسال', color: 'indigo' },
};

export const REQUEST_STATUS_LABELS = {
  approved:  { text: 'مقبولة', color: 'emerald' },
  rejected:  { text: 'مرفوضة', color: 'red' },
  pending:   { text: 'معلقة', color: 'amber' },
  in_review: { text: 'قيد المراجعة', color: 'blue' },
};
