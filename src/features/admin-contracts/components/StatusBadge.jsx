import React from 'react';
import { STATUS_LABELS } from '../utils/constants';

const TONE_CLASSES = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  'nafath-approved': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  'nafath-pending': 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800',
  sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
};

export function StatusBadge({ status }) {
  const badge = STATUS_LABELS[status] || { text: status, icon: 'fa-circle-info', tone: 'draft' };
  const toneClass = TONE_CLASSES[badge.tone] || TONE_CLASSES.draft;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${toneClass}`}>
      <i className={`fas ${badge.icon}`}></i>
      <span>{badge.text}</span>
    </span>
  );
}