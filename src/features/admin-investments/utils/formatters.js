export function fmtSAR(n) {
    return Number(n || 0).toLocaleString('ar-SA');
}

export function fmtRial(n) {
    return `${fmtSAR(n)} ر.س`;
}

export function formatDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('ar-SA', {
        year: 'numeric', month: '2-digit', day: '2-digit',
    });
}

export function todayStr() {
    return new Date().toISOString().slice(0, 10);
}

export function tomorrowStr() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
}

export function getDateTag(dueDateStr) {
    if (!dueDateStr) return null;
    const ds = dueDateStr.slice(0, 10);
    const t = todayStr();
    const tm = tomorrowStr();
    if (ds === t) return 'today';
    if (ds === tm) return 'tomorrow';
    if (ds < t) return 'overdue';
    return null;
}