import { ACTIVATION_DAYS } from './constants';

export function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

export function getActivationInfo(approvedAt) {
    if (!approvedAt) {
        return { activated: false, activationDate: null, daysLeft: null };
    }
    const activationDate = addDays(approvedAt, ACTIVATION_DAYS);
    const now = new Date();
    const activated = now >= activationDate;
    const daysLeft = activated
        ? 0
        : Math.ceil((activationDate - now) / (1000 * 60 * 60 * 24));
    return { activated, activationDate, daysLeft };
}

export function activationProgressPercent(approvedAt, daysLeft, activated) {
    if (activated || daysLeft == null) return 100;
    const elapsed = Math.max(0, ACTIVATION_DAYS - daysLeft);
    return Math.min(100, Math.round((elapsed / ACTIVATION_DAYS) * 100));
}