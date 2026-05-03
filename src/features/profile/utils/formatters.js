import { REQUIRED_FIELDS } from "../constants/constants";

// src/features/profile/utils/formatters.js
export function formatBirthDateUmmAlQura(isoYmd, language) {
    if (!isoYmd || !/^\d{4}-\d{2}-\d{2}$/.test(isoYmd)) return null;
    const [y, mo, d] = isoYmd.split('-').map(Number);
    const date = new Date(y, mo - 1, d);
    if (Number.isNaN(date.getTime())) return null;

    try {
        const locale = language === 'ar' ? 'ar-SA' : 'en-SA';
        return new Intl.DateTimeFormat(locale, {
            calendar: 'islamic-umalqura',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    } catch {
        return null;
    }
}

export function formatIban(value) {
    let clean = value.replace(/^SA/i, '').toUpperCase();
    clean = clean.replace(/[^A-Z0-9]/g, '');
    return 'SA' + clean;
}

export function extractInitials(user) {
    return (
        user?.first_name?.[0] ||
        user?.family_name?.[0] ||
        user?.last_name?.[0] ||
        user?.full_name?.[0] ||
        '?'
    ).toUpperCase();
}

export function buildFullName(user) {
    const parts = [
        user?.first_name,
        user?.father_name,
        user?.grandfather_name,
        user?.family_name ?? user?.last_name
    ].filter(Boolean);

    return parts.join(' ').trim() || '—';
}

export function isProfileComplete(user) {
    if (!user) return false;

    return REQUIRED_FIELDS.every(field => {
        const value = field === 'phone'
            ? (user.phone || user.phone_number)
            : user[field];

        if (!value) return false;
        const str = String(value).trim().toLowerCase();
        return str !== '' && str !== 'unknown' && str !== 'null';
    });
}