import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Store } from 'react-notifications-component';

import { useUsers } from '../hooks/useUsers';
import { useCreateUser } from '../hooks/useCreateUser';
import { useToggleUserStatus } from '../hooks/useToggleUserStatus';

import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { StatusBadge } from '../components/StatusBadge';
import { UserAvatar } from '../components/UserAvatar';
import { SummaryStrip } from '../components/SummaryStrip';
import { UserCard } from '../components/UserCard';
import { StatusConfirmModal } from '../modals/StatusConfirmModal';
import { CreateUserModal } from '../modals/CreateUserModal';

import { isUserActive } from '../utils/constants';

// ─── Small reusable table action button ──────────────────────────────────────
function ActionBtn({ onClick, variant = 'default', children }) {
  const variants = {
    default: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600',
    primary: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50',
    danger: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50',
    success: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const AdminUsersPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['common']);
  const isRTL = i18n.language === 'ar';

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchTimer, setSearchTimer] = useState(null);

  // Modals
  const [createOpen, setCreateOpen] = useState(false);
  const [statusModal, setStatusModal] = useState({ open: false, userId: null, action: null });

  // ── Data hooks ───────────────────────────────────────────────────────────
  const { data, isLoading, isFetching } = useUsers({ page, search: debouncedSearch });
  const users = data?.data ?? [];
  const pagination = {
    current_page: data?.current_page ?? 1,
    last_page: data?.last_page ?? 1,
    total: data?.total ?? 0,
  };

  const activeCount = users.filter(isUserActive).length;
  const inactiveCount = users.length - activeCount;

  // ── Mutations ────────────────────────────────────────────────────────────
  const createMutation = useCreateUser();

  // We pass a placeholder userId; the modal-level hook will be replaced below
  // with a per-row approach via the modal state
  const statusMutation = useToggleUserStatus(statusModal.userId);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => { setDebouncedSearch(value); setPage(1); }, 350));
  };

  const openStatusModal = (user, action) => {
    if (!user?.id) return;
    setStatusModal({ open: true, userId: user.id, action });
  };
  const closeStatusModal = () => setStatusModal({ open: false, userId: null, action: null });

  const confirmStatusChange = async () => {
    try {
      const res = await statusMutation.mutateAsync({ action: statusModal.action });
      Store.addNotification({
        title: t('admin.success.title'),
        message: res?.message || t('admin.success.user_updated'),
        type: 'success',
        insert: 'top',
        container: 'top-right',
        dismiss: { duration: 3000 },
      });
      closeStatusModal();
    } catch (err) {
      Store.addNotification({
        title: t('admin.error.title'),
        message: err?.response?.data?.message || err?.message || t('admin.error.update_user'),
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        dismiss: { duration: 5000 },
      });
    }
  };

  const handleCreate = async (form) => {
    try {
      const res = await createMutation.mutateAsync(form);
      Store.addNotification({
        title: t('admin.success.title'),
        message: res?.message || (isRTL ? 'تم إنشاء المستخدم بنجاح' : 'User created successfully'),
        type: 'success',
        insert: 'top',
        container: 'top-right',
        dismiss: { duration: 3000 },
      });
      setCreateOpen(false);
    } catch (err) {
      const validationErrors = err?.response?.data?.errors;
      const firstMsg = validationErrors
        ? Object.values(validationErrors).flat().find(Boolean)
        : null;
      Store.addNotification({
        title: t('admin.error.title'),
        message: firstMsg || err?.response?.data?.message || (isRTL ? 'حدث خطأ أثناء إنشاء المستخدم' : 'Failed to create user'),
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        dismiss: { duration: 5000 },
      });
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Modals */}
      <StatusConfirmModal
        open={statusModal.open}
        action={statusModal.action}
        loading={statusMutation.isPending}
        onConfirm={confirmStatusChange}
        onCancel={() => { if (!statusMutation.isPending) closeStatusModal(); }}
      />
      <CreateUserModal
        open={createOpen}
        loading={createMutation.isPending}
        onSubmit={handleCreate}
        onClose={() => { if (!createMutation.isPending) setCreateOpen(false); }}
      />

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {t('admin.users.list', 'Users')}
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              {t('admin.users.list_subtitle', 'Manage and monitor all platform users')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="
              inline-flex items-center gap-2 px-5 py-2.5
              bg-blue-600 hover:bg-blue-700
              text-white text-sm font-semibold rounded-xl
              shadow-sm shadow-blue-200 dark:shadow-none
              transition-colors
              self-start sm:self-auto
            "
          >
            <span className="text-base leading-none">+</span>
            {isRTL ? 'مستخدم جديد' : 'New User'}
          </button>
        </div>

        {/* Summary strip */}
        {!isLoading && (
          <SummaryStrip total={pagination.total} activeCount={activeCount} inactiveCount={inactiveCount} />
        )}

        {/* Search + table card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">

          {/* Toolbar */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {t('admin.users.list')}
              {isFetching && !isLoading && (
                <span className="ms-2 inline-flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              )}
            </h2>
            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder={t('admin.users.search_placeholder')}
              className="
                w-full sm:w-64 px-4 py-2 text-sm rounded-xl
                border border-slate-200 dark:border-slate-600
                bg-slate-50 dark:bg-slate-700/60
                text-slate-700 dark:text-slate-200
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                transition-colors
              "
            />
          </div>

          {/* Content */}
          {isLoading ? (
            <LoadingState label={t('dashboard.loading')} />
          ) : users.length === 0 ? (
            <EmptyState
              icon="👤"
              title={t('admin.users.empty')}
              subtitle={debouncedSearch ? t('admin.users.no_results', 'Try a different search') : undefined}
            />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-700/50">
                      {[
                        t('admin.users.name'),
                        t('national_id'),
                        t('phone_number'),
                        t('admin.users.status'),
                        t('admin.users.actions'),
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 text-start uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700/70">
                    {users.map((user) => {
                      const active = isUserActive(user);
                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors"
                        >
                          {/* Name + avatar */}
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <UserAvatar user={user} size="sm" />
                              <span className="font-medium text-slate-700 dark:text-slate-200 truncate max-w-[200px]">
                                {user.name || '—'}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-slate-500 dark:text-slate-400 text-xs">
                            {user.national_id || '—'}
                          </td>
                          <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-xs">
                            {user.phone || '—'}
                          </td>
                          <td className="px-5 py-3.5">
                            <StatusBadge user={user} />
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <ActionBtn variant="primary" onClick={() => navigate(`/admin/users/${user.id}/show`)}>
                                {t('admin.users.view')}
                              </ActionBtn>
                              <ActionBtn onClick={() => navigate(`/admin/users/${user.id}/update`)}>
                                {t('admin.users.update')}
                              </ActionBtn>
                              <ActionBtn
                                variant={active ? 'danger' : 'success'}
                                onClick={() => openStatusModal(user, active ? 'deactivate' : 'activate')}
                              >
                                {active ? t('admin.users.deactivate') : t('admin.users.activate')}
                              </ActionBtn>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile card stack */}
              <div className="md:hidden px-4 py-4 space-y-3">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} onToggleStatus={openStatusModal} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {t('admin.users.total_users', { count: pagination.total })}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 transition-colors"
                    >
                      {isRTL ? 'التالي' : 'Prev'}
                    </button>
                    <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      {page} / {pagination.last_page}
                    </span>
                    <button
                      type="button"
                      disabled={page >= pagination.last_page}
                      onClick={() => setPage((p) => p + 1)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 transition-colors"
                    >
                      {isRTL ? 'السابق' : 'Next'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
