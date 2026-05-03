export const STATUS_META = {
    pending: { label: 'قيد الانتظار', color: 'amber' },
    sent: { label: 'مُرسل', color: 'blue' },
    received: { label: 'مستلم', color: 'green' },
    reported_missing: { label: 'مُبلَّغ عن غيابه', color: 'red' },
};

export const DATE_TAG_META = {
    today: { label: 'اليوم', icon: 'fa-sun', color: 'amber' },
    tomorrow: { label: 'غداً', icon: 'fa-calendar-day', color: 'green' },
    overdue: { label: 'متأخر', icon: 'fa-circle-exclamation', color: 'red' },
};

export const STAT_CONFIG = [
    { key: 'total_amount', label: 'إجمالي المبالغ', icon: 'fa-receipt', color: 'indigo' },
    { key: 'pending_count', label: 'قيد الانتظار', icon: 'fa-hourglass-half', color: 'amber' },
    { key: 'overdue_count', label: 'متأخرة', icon: 'fa-circle-exclamation', color: 'red' },
    { key: 'received_count', label: 'مستلمة', icon: 'fa-circle-check', color: 'green' },
    { key: 'today', label: 'مستحق اليوم', icon: 'fa-sun', color: 'amber' },
    { key: 'tomorrow', label: 'مستحق غداً', icon: 'fa-calendar-day', color: 'green' },
    { key: 'this_week', label: 'هذا الأسبوع', icon: 'fa-calendar-week', color: 'violet' },
];