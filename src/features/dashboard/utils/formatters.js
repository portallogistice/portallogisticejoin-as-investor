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
/**
 * Convert Arabic numerals to English
 * @param {string} str - String with Arabic numerals
 * @returns {string} String with English numerals
 */
function convertArabicNumeralsToEnglish(str) {
    if (!str) return str;
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const englishNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = str;
    for (let i = 0; i < arabicNumerals.length; i++) {
        const regex = new RegExp(arabicNumerals[i], 'g');
        result = result.replace(regex, englishNumerals[i]);
    }
    return result;
}

/**
 * Format date based on language
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale code ('en' or 'ar')
 * @returns {string} Formatted date
 */
export function formatDate(date, locale = 'en') {
    if (!date) return '—';

    const d = new Date(date);
    if (locale === 'ar') {
        const formatted = d.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        // Convert Arabic numerals to English
        return convertArabicNumeralsToEnglish(formatted);
    }
}
export function fmtSAR(n, locale = 'en') {
    const num = formatNumber(n, locale);
    return locale === 'ar' ? `${num} ر.س` : `${num} SAR`;
}



export function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}

// Static fallback when API returns no data
export const STATIC_DATA = {
    investment: {
        total: 0,
        monthlyDeposit: 0,
        totalReceived: 0,
        totalPending: 0,
        monthsPassed: 0,
        contractStartMonths: [],
    },
    contracts: { total: 0, approved: 0, pending: 0, activated: 0 },
    paymentStatus: { total: 0, received: 0, pending: 0, reported_missing: 0 },
    nextPayment: { amount: 0, due_date: null, days_remaining: 0 },
};