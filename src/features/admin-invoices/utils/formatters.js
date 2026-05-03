export function fmtSAR(n) {
  return `${Number(n || 0).toLocaleString('ar-SA')} ر.س`;
}

export function fmtNum(n) {
  return Number(n || 0).toLocaleString('ar-SA');
}

export function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
