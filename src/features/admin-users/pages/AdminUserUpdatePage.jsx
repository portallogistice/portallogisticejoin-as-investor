import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Store } from 'react-notifications-component';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import { useUser } from '../hooks/useUser';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUserForm } from '../hooks/useUserForm';
import { ibanWithoutPrefix } from '../utils/constants';

import { LoadingState } from '../components/LoadingState';

// ─── Field wrapper ─────────────────────────────────────────────────────────────
function FormField({ id, label, required, error, children }) {
  return (
    <div id={`field-${id}`} className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
        {required && <span className="text-rose-500 ms-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-rose-500 dark:text-rose-400">{error}</p>}
    </div>
  );
}

// ─── Input helpers ─────────────────────────────────────────────────────────────
const inputBase = `
  w-full px-4 py-2.5 text-sm rounded-xl
  border bg-white dark:bg-slate-700/60
  text-slate-800 dark:text-slate-100
  placeholder:text-slate-400 dark:placeholder:text-slate-500
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
  transition-colors
`.trim();

function inputCls(hasError) {
  return `${inputBase} ${
    hasError
      ? 'border-rose-400 dark:border-rose-500'
      : 'border-slate-200 dark:border-slate-600'
  }`;
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function FormSection({ title, children }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-700/60">
        <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        {children}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const AdminUserUpdatePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['common']);
  const isRTL = i18n.language === 'ar';

  const { data: user, isLoading, error: loadError } = useUser(userId);
  const updateMutation = useUpdateUser(userId);

  const { formData, errors, setErrors, handleChange, validate, buildBody, hijriDisplay } =
    useUserForm(user ?? null);

  const back = () => navigate(`/admin/users/${userId}/show`);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    try {
      const res = await updateMutation.mutateAsync(buildBody());
      Store.addNotification({
        title: t('admin.success.title'),
        message: res?.message || t('admin.success.user_updated'),
        type: 'success',
        insert: 'top',
        container: 'top-right',
        dismiss: { duration: 3000 },
      });
      navigate(`/admin/users/${userId}/show`);
    } catch (err) {
      const serverErrors = err?.response?.data?.errors ?? {};
      if (Object.keys(serverErrors).length) {
        const mapped = {};
        Object.entries(serverErrors).forEach(([k, msgs]) => { mapped[k] = msgs[0]; });
        setErrors(mapped);
      }
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

  // ── Loading / error states ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <LoadingState label={t('dashboard.loading')} />
      </div>
    );
  }

  if (loadError || !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <button type="button" onClick={() => navigate('/admin/users')}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6">
          <span aria-hidden>{isRTL ? '→' : '←'}</span>
          {t('admin.users.back_to_list')}
        </button>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm">
          ⚠️ {loadError?.message || (isRTL ? 'لا توجد بيانات' : 'No data available')}
        </div>
      </div>
    );
  }

  const submitting = updateMutation.isPending;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors self-start"
          >
            <span aria-hidden>{isRTL ? '→' : '←'}</span>
            {t('admin.users.back_to_profile')}
          </button>
          <div className="text-start sm:text-end">
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {t('admin.users.update_user_title')}
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">{t('admin.users.edit_info')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Personal */}
          <FormSection title={t('admin.users.personal_info')}>
            {/* Read-only national ID */}
            <FormField id="national_id" label={t('national_id')}>
              <input
                className={`${inputCls(false)} opacity-60 cursor-not-allowed`}
                value={formData.national_id}
                readOnly
                tabIndex={-1}
              />
            </FormField>

            {/* Birth date */}
            <FormField id="birth_date" label={t('birth_date')} required error={errors.birth_date}>
              <input
                type="date"
                className={inputCls(Boolean(errors.birth_date))}
                value={formData.birth_date}
                onChange={(e) => handleChange('birth_date', e.target.value)}
              />
              {hijriDisplay && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  🗓 {hijriDisplay}
                </p>
              )}
            </FormField>

            <FormField id="first_name" label={t('first_name')} required error={errors.first_name}>
              <input className={inputCls(Boolean(errors.first_name))} value={formData.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)} />
            </FormField>

            <FormField id="father_name" label={t('father_name')} required error={errors.father_name}>
              <input className={inputCls(Boolean(errors.father_name))} value={formData.father_name}
                onChange={(e) => handleChange('father_name', e.target.value)} />
            </FormField>

            <FormField id="grandfather_name" label={t('grandfather_name')} required error={errors.grandfather_name}>
              <input className={inputCls(Boolean(errors.grandfather_name))} value={formData.grandfather_name}
                onChange={(e) => handleChange('grandfather_name', e.target.value)} />
            </FormField>

            <FormField id="family_name" label={t('family_name')} required error={errors.family_name}>
              <input className={inputCls(Boolean(errors.family_name))} value={formData.family_name}
                onChange={(e) => handleChange('family_name', e.target.value)} />
            </FormField>

            <FormField id="region" label={t('region')} required error={errors.region}>
              <input className={inputCls(Boolean(errors.region))} value={formData.region}
                onChange={(e) => handleChange('region', e.target.value)} />
            </FormField>
          </FormSection>

          {/* Contact */}
          <FormSection title={t('admin.users.contact_info')}>
            <FormField id="phone" label={t('phone_number')} required error={errors.phone}>
              <PhoneInput
                defaultCountry="sa"
                value={formData.phone}
                onChange={(phone) => handleChange('phone', phone)}
                inputStyle={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: '14px',
                  border: errors.phone ? '1px solid #f87171' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  color: 'inherit',
                  fontFamily: 'inherit',
                }}
                countrySelectorStyleProps={{
                  buttonStyle: {
                    padding: '10px 12px',
                    backgroundColor: 'transparent',
                    border: errors.phone ? '1px solid #f87171' : '1px solid #e2e8f0',
                    borderRadius: '12px 0 0 12px',
                  },
                }}
              />
            </FormField>

            <FormField id="email" label={t('email')} error={errors.email}>
              <input
                type="email"
                className={inputCls(Boolean(errors.email))}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </FormField>
          </FormSection>

          {/* Banking */}
          <FormSection title={t('admin.users.banking_info')}>
            <FormField id="bank_name" label={t('bank_name')} required error={errors.bank_name}>
              <input className={inputCls(Boolean(errors.bank_name))} value={formData.bank_name}
                onChange={(e) => handleChange('bank_name', e.target.value)} />
            </FormField>

            <FormField id="iban" label={t('iban')} required error={errors.iban}>
              <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500 transition-colors">
                <span className="px-3 flex items-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-mono font-semibold shrink-0 border-e border-slate-200 dark:border-slate-600">
                  SA
                </span>
                <input
                  dir="ltr"
                  className="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-slate-700/60 text-slate-800 dark:text-slate-100 font-mono focus:outline-none"
                  value={ibanWithoutPrefix(formData.iban)}
                  onChange={(e) => handleChange('iban', e.target.value)}
                />
              </div>
            </FormField>
          </FormSection>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={back}
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 shadow-sm"
            >
              {t('admin.users.confirm_cancel')}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm flex items-center justify-center gap-2"
            >
              {submitting && (
                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {t('admin.users.update')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminUserUpdatePage;
