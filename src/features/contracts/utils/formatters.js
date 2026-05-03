// src/features/contracts/utils/formatters.js
export function fmtSAR(n) {
  return Number(n || 0).toLocaleString('ar-SA');
}

export function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`;
}

export function nafathErrorMessage(error) {
  const status = error?.response?.status;
  const raw = typeof error?.response?.data?.message === 'string' ? error.response.data.message : '';

  if (status === 503 || /Sadq config missing/i.test(raw)) {
    return 'خدمة التوثيق عبر نفاذ غير مهيأة. يرجى التواصل مع الدعم.';
  }
  if (/Sadq API unreachable/i.test(raw) || status === 502 || status === 504) {
    return 'تعذر الاتصال بخدمة التوثيق. حاول مرة أخرى بعد قليل.';
  }
  return raw || 'تعذر إرسال الطلب إلى نفاذ. حاول مرة أخرى.';
}