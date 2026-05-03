/**
 * Format numbers based on language
 * Always returns English digits regardless of language selection
 * @param {number} num - Number to format
 * @param {string} locale - Locale code ('en' or 'ar')
 * @returns {string} Formatted number string with English digits
 */
export function formatNumber(num, locale = 'en') {
    const n = Number(num || 0);
    if (locale === 'ar') {
        // Format with thousands separator but keep English digits
        return n.toLocaleString('en-US');
    }
    return n.toLocaleString('en-US');
}
export function fmtSAR(n, locale = 'en') {
    const num = formatNumber(n, locale);
    return locale === 'ar' ? `${num} ر.س` : `${num} SAR`;
}

export function fmtDate(d, locale = 'en') {
    if (!d) return '—';
    return new Date(d).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}