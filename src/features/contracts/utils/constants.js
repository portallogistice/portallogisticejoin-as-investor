// src/features/contracts/utils/constants.js
export const FULL_PRICE = 6600;
export const MAX_FILE_MB = 10;
export const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

export const DRAFT_RENTAL_CONTRACT_HREF = '/files/rental_contract.pdf';
export const DRAFT_SALE_CONTRACT_HREF = '/files/sale_contract.pdf';
export const CONTRACTOR_INFO_PDF_HREF = process.env.REACT_APP_CONTRACTOR_INFO_PDF_URL || '/files/contractor_info.pdf';

export const STATUS_BADGE = {
    draft: { label: 'مسودة', tone: 'draft', icon: 'fa-file-lines' },
    sent: { label: 'قيد الإرسال', tone: 'sent', icon: 'fa-paper-plane' },
    nafath_pending: { label: 'قيد التوثيق', tone: 'nafath-pending', icon: 'fa-shield-halved' },
    nafath_approved: { label: 'موثق عبر نفاذ', tone: 'nafath-approved', icon: 'fa-badge-check' },
    admin_pending: { label: 'قيد المراجعة', tone: 'admin-pending', icon: 'fa-clock' },
    approved: { label: 'مقبول', tone: 'approved', icon: 'fa-circle-check' },
    accepted: { label: 'مكتمل ✓', tone: 'approved', icon: 'fa-circle-check' },
    rejected: { label: 'مرفوض', tone: 'rejected', icon: 'fa-circle-xmark' },
    need_to_pay: { label: 'بانتظار الدفع', tone: 'need-to-pay', icon: 'fa-money-bill-wave' },
    receipt_review: { label: 'مراجعة الإيصال', tone: 'admin-pending', icon: 'fa-hourglass-half' },
};

export const STATUS_COLORS = {
    draft: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
    sent: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    'nafath-pending': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    'nafath-approved': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    'admin-pending': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800',
    approved: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    rejected: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    'need-to-pay': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
};

export const PART_OWNING_COLORS = {
    expired: {
        banner: 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800',
        chip: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700',
    },
    urgent: {
        banner: 'border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800',
        chip: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700',
    },
    normal: {
        banner: 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700',
        chip: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700',
    },
};