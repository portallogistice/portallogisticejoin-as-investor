import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Store } from 'react-notifications-component';

import { useUser } from '../hooks/useUser';
import { useToggleUserStatus } from '../hooks/useToggleUserStatus';

import { LoadingState } from '../components/LoadingState';
import { StatusBadge } from '../components/StatusBadge';
import { UserAvatar } from '../components/UserAvatar';
import { StatusConfirmModal } from '../modals/StatusConfirmModal';

import { isUserActive, getFullName } from '../utils/constants';

// ─── Read-only field row ──────────────────────────────────────────────────────
function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-slate-50 dark:border-slate-700/60 last:border-0">
      <span className="text-xs text-slate-400 dark:text-slate-500">{label}</span>
      <span
        className={`text-sm text-slate-700 dark:text-slate-200 font-medium ${mono ? 'font-mono tracking-wide' : ''}`}
      >
        {value || '—'}
      </span>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-700/60">
        <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="px-5 divide-y divide-slate-50 dark:divide-slate-700/40">{children}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const AdminUserShowPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['common']);
  const isRTL = i18n.language === 'ar';

  const [statusModal, setStatusModal] = useState({ open: false, action: null });

  const { data: user, isLoading, error } = useUser(userId);
  const statusMutation = useToggleUserStatus(userId);

  const active = isUserActive(user);
  const fullName = getFullName(user);

  const back = () => navigate('/admin/users');

  // ── Handlers ─────────────────────────────────────────────────────────────
  const confirmStatus = async () => {
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
      setStatusModal({ open: false, action: null });
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

  // ── States ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <LoadingState label={t('dashboard.loading')} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
        >
          <span aria-hidden>{isRTL ? '→' : '←'}</span>
          {t('admin.users.back_to_list')}
        </button>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm">
          <span>⚠️</span>
          <span>{error?.message || (isRTL ? 'لا توجد بيانات' : 'No data available')}</span>
        </div>
      </div>
    );
  }

  const role = user.role || (user.is_admin ? 'admin' : 'user');
  const roleLabel = role === 'admin' ? (isRTL ? 'مدير' : 'Admin') : (isRTL ? 'مستخدم' : 'User');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <StatusConfirmModal
        open={statusModal.open}
        action={statusModal.action}
        loading={statusMutation.isPending}
        onConfirm={confirmStatus}
        onCancel={() => { if (!statusMutation.isPending) setStatusModal({ open: false, action: null }); }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors self-start"
          >
            <span aria-hidden>{isRTL ? '→' : '←'}</span>
            {t('admin.users.back_to_list')}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/admin/users/${userId}/update`)}
              className="px-4 py-2 text-sm font-medium rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
            >
              ✏️ {t('admin.users.edit')}
            </button>
            {active ? (
              <button
                type="button"
                onClick={() => setStatusModal({ open: true, action: 'deactivate' })}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-colors shadow-sm"
              >
                {t('admin.users.deactivate')}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStatusModal({ open: true, action: 'activate' })}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-sm"
              >
                {t('admin.users.activate')}
              </button>
            )}
          </div>
        </div>

        {/* Profile hero card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <UserAvatar user={user} size="lg" />
          <div className="text-center sm:text-start flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{fullName}</h1>
              <StatusBadge user={user} />
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              {user.email || user.phone || '—'}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{roleLabel}</p>
          </div>
        </div>

        {/* Personal info */}
        <Section title={isRTL ? 'المعلومات الشخصية' : 'Personal Information'}>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <InfoRow label={t('dashboard.profile.full_name')} value={fullName} />
            <InfoRow label={t('national_id')} value={user.national_id} mono />
            <InfoRow label={isRTL ? 'اسم الأب' : 'Father Name'} value={user.father_name} />
            <InfoRow label={isRTL ? 'اسم الجد' : 'Grandfather Name'} value={user.grandfather_name} />
            <InfoRow label={isRTL ? 'تاريخ الميلاد' : 'Birth Date'} value={user.birth_date} />
            <InfoRow label={isRTL ? 'المنطقة' : 'Region'} value={user.region} />
          </div>
        </Section>

        {/* Contact info */}
        <Section title={isRTL ? 'معلومات التواصل' : 'Contact Information'}>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <InfoRow label={t('phone_number')} value={user.phone ?? user.phone_number} />
            <InfoRow label={t('email')} value={user.email} />
          </div>
        </Section>

        {/* Banking info */}
        <Section title={isRTL ? 'المعلومات البنكية' : 'Banking Information'}>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <InfoRow label={isRTL ? 'اسم البنك' : 'Bank Name'} value={user.bank_name} />
            <InfoRow label={isRTL ? 'رقم الآيبان' : 'IBAN'} value={user.iban} mono />
          </div>
        </Section>

        {/* Account info */}
        <Section title={isRTL ? 'معلومات الحساب' : 'Account Information'}>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <InfoRow label={isRTL ? 'الدور' : 'Role'} value={roleLabel} />
            <InfoRow label={t('admin.users.status')} value={active ? t('admin.users.active') : t('admin.users.inactive')} />
          </div>
        </Section>

      </div>
    </div>
  );
};

export default AdminUserShowPage;
