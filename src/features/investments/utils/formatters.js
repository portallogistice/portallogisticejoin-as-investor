export function fmtSAR(n) {
    return Number(n || 0).toLocaleString('ar-SA');
}

export function fmtDate(date, locale = 'ar') {
    if (!date) return '—';
    return new Date(date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function fmtDateShort(date, locale = 'ar') {
    if (!date) return '—';
    return new Date(date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}