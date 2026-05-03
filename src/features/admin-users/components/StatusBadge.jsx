import React from 'react';
import { useTranslation } from 'react-i18next';
import { isUserActive } from '../utils/constants';

/**
 * Pill badge showing a user's active / inactive status.
 * @param {{ user: object }} props
 */
export function StatusBadge({ user }) {
  const { t } = useTranslation(['common']);
  const active = isUserActive(user);

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold',
        active
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
          : 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
      ].join(' ')}
    >
      <span
        className={[
          'h-1.5 w-1.5 rounded-full',
          active ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-rose-500 dark:bg-rose-400',
        ].join(' ')}
      />
      {active ? t('admin.users.active') : t('admin.users.inactive')}
    </span>
  );
}
