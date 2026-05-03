export const FULL_PRICE = 6600;

export const STATUS_LABELS = {
    admin_pending: { text: '⏳ قيد المراجعة', icon: 'fa-clock', tone: 'pending' },
    nafath_approved: { text: 'موثق نفاذ', icon: 'fa-badge-check', tone: 'nafath-approved' },
    nafath_pending: { text: 'بانتظار نفاذ', icon: 'fa-shield-halved', tone: 'nafath-pending' },
    approved: { text: '✅ مقبول', icon: 'fa-circle-check', tone: 'approved' },
    accepted: { text: '✅ مكتمل', icon: 'fa-circle-check', tone: 'approved' },
    rejected: { text: '❌ مرفوض', icon: 'fa-circle-xmark', tone: 'rejected' },
    sent: { text: 'تم الإرسال', icon: 'fa-paper-plane', tone: 'sent' },
    draft: { text: 'مسودة', icon: 'fa-file-lines', tone: 'draft' },
    need_to_pay: { text: '💳 بانتظار الدفع', icon: 'fa-money-bill-wave', tone: 'pending' },
    receipt_review: { text: '📋 مراجعة الإيصال', icon: 'fa-hourglass-half', tone: 'pending' },
};

export const TAB_FILTERS = {
    all: () => true,
    pending: (c) => ['admin_pending', 'nafath_approved', 'receipt_review'].includes(c.status),
    need_to_pay: (c) => c.status === 'need_to_pay',
    approved: (c) => ['approved', 'accepted'].includes(c.status),
    rejected: (c) => c.status === 'rejected',
};

export const TAB_CONFIG = [
    { key: 'all', label: 'الكل' },
    { key: 'pending', label: 'قيد المراجعة' },
    { key: 'need_to_pay', label: 'بانتظار الدفع' },
    { key: 'approved', label: 'مقبولة' },
    { key: 'rejected', label: 'مرفوضة' },
];