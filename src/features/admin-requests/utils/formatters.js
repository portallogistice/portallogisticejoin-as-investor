export function fmtDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

export function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`;
}