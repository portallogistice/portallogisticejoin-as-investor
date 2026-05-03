// src/features/requests/utils/formatters.js
export function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getStatusMeta(status) {
  const { STATUS_META } = require('../constants/constants');
  return STATUS_META[status] || STATUS_META.pending;
}

export function getRequestTypeMeta(key) {
  const { REQUEST_TYPES } = require('../constants/constants');
  return REQUEST_TYPES.find(t => t.key === key);
}