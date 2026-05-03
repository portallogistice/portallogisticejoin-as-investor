// src/features/invoices/utils/formatters.js
export function fmtSAR(n) {
    return Number(n || 0).toLocaleString('ar-En');
}

export function fmtDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('ar-En', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function daysUntil(d) {
    if (!d) return null;
    return Math.ceil((new Date(d) - new Date()) / 864e5);
}

export function getYearMeta(year) {
    const { YEAR_META } = require('./constants');
    return YEAR_META[year] || YEAR_META[1];
}

export function getStatusMeta(status) {
    const { STATUS_META } = require('./constants');
    return STATUS_META[status] || STATUS_META.pending;
}