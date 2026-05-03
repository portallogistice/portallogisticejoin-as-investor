export function fmtSAR(n) {
  return Number(n || 0).toLocaleString('ar-En');
}

export function fmtNum(n) {
  return Number(n || 0).toLocaleString('ar-En');
}

export function fmtPercent(n) {
  return `${Number(n || 0).toFixed(1)}%`;
}

export function monthNameAr(month) {
  const names = {
    1: 'يناير', 2: 'فبراير', 3: 'مارس', 4: 'أبريل',
    5: 'مايو', 6: 'يونيو', 7: 'يوليو', 8: 'أغسطس',
    9: 'سبتمبر', 10: 'أكتوبر', 11: 'نوفمبر', 12: 'ديسمبر',
  };
  return names[month] || '';
}
