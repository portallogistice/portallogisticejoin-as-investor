import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from './UserAvatar';
import { StatusBadge } from './StatusBadge';
import { isUserActive } from '../utils/constants';

/**
 * Mobile card representation of a single user row.
 * Shown below the md breakpoint instead of the table.
 */
export function UserCard({ user, onToggleStatus }) {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const active = isUserActive(user);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center gap-3">
        <UserAvatar user={user} size="md" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">
            {user.name || '—'}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
            {user.phone || user.email || '—'}
          </p>
        </div>
        <StatusBadge user={user} />
      </div>

      {/* Detail rows */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <dt className="text-slate-400 dark:text-slate-500">{t('national_id')}</dt>
        <dd className="text-slate-700 dark:text-slate-300 text-right font-mono">
          {user.national_id || '—'}
        </dd>
      </dl>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={() => navigate(`/admin/users/${user.id}/show`)}
          className="flex-1 text-xs py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 font-medium transition-colors"
        >
          {t('admin.users.view')}
        </button>
        <button
          type="button"
          onClick={() => navigate(`/admin/users/${user.id}/update`)}
          className="flex-1 text-xs py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 font-medium transition-colors"
        >
          {t('admin.users.update')}
        </button>
        <button
          type="button"
          onClick={() => onToggleStatus(user, active ? 'deactivate' : 'activate')}
          className={[
            'flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors',
            active
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/50'
              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50',
          ].join(' ')}
        >
          {active ? t('admin.users.deactivate') : t('admin.users.activate')}
        </button>
      </div>
    </div>
  );
}
