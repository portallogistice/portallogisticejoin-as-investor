// src/features/profile/modals/ProfileCompletionModal.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Watch } from 'react-loader-spinner';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { useProfileValidation } from '../hooks/useProfileValidation';
import { formatBirthDateUmmAlQura, formatIban } from '../utils/formatters';
import { PROFILE_FIELD_ORDER } from '../constants/constants';
import { ProfileModal } from '../components/ProfileModal';
import { ProfileFormSection } from '../components/ProfileFormSection';
import { ProfileFormField } from '../components/ProfileFormField';
import { notify } from '../../auth/utils/notify';

const INITIAL_FORM = {
    national_id: '',
    first_name: '',
    family_name: '',
    father_name: '',
    grandfather_name: '',
    birth_date: '',
    region: '',
    email: '',
    bank_name: '',
    iban: '',
    phone: '',
};

export default function ProfileCompletionModal({ userProfile, onComplete, onSkip }) {
    const { t, i18n } = useTranslation(['common']);
    const isAr = i18n.language === 'ar';

    const updateMutation = useUpdateProfile();
    const validate = useProfileValidation();

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize form from userProfile + draft
    useEffect(() => {
        if (!userProfile || isInitialized) return;

        const processedIban = userProfile.iban
            ? (userProfile.iban.startsWith('SA') ? userProfile.iban : 'SA' + userProfile.iban.replace(/^SA/i, ''))
            : '';

        const base = {
            national_id: userProfile.national_id || '',
            first_name: userProfile.first_name || '',
            family_name: userProfile.family_name || '',
            father_name: userProfile.father_name || '',
            grandfather_name: userProfile.grandfather_name || '',
            birth_date: userProfile.birth_date || '',
            region: userProfile.region || '',
            email: userProfile.email || '',
            bank_name: userProfile.bank_name || '',
            iban: processedIban,
            phone: userProfile.phone || userProfile.phone_number || '',
        };

        // Merge draft if exists
        try {
            const draft = JSON.parse(localStorage.getItem('profile_completion_draft') || 'null');
            if (draft) {
                Object.keys(base).forEach(k => {
                    if (draft[k] != null) base[k] = draft[k];
                });
            }
        } catch { /* ignore */ }

        setFormData(base);
        setIsInitialized(true);
    }, [userProfile, isInitialized]);

    const handleChange = useCallback((field, value) => {
        setFormData(prev => {
            let processed = value;
            if (field === 'iban') processed = formatIban(value);
            if (field === 'national_id') processed = value.replace(/\D/g, '').slice(0, 10);
            return { ...prev, [field]: processed };
        });

        setErrors(prev => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }, []);

    const handleSaveDraft = useCallback(() => {
        localStorage.setItem('profile_completion_draft', JSON.stringify(formData));
        notify(
            isAr ? 'تم' : 'Done',
            isAr ? 'تم حفظ البيانات مؤقتًا. يمكنك إكمالها لاحقًا.' : 'Draft saved. You can complete later.',
            'success'
        );
        onSkip?.();
    }, [formData, isAr, onSkip]);

    const scrollToFirstError = useCallback((validationErrors) => {
        const firstKey = PROFILE_FIELD_ORDER.find(k => validationErrors[k]);
        if (!firstKey) return;

        requestAnimationFrame(() => {
            const wrapper = document.getElementById(`profile-field-${firstKey}`);
            if (!wrapper) return;

            wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const focusable = wrapper.querySelector('input, textarea, select, .react-international-phone-input');
            focusable?.focus({ preventScroll: true });
        });
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            scrollToFirstError(validationErrors);
            return;
        }

        const payload = {
            national_id: formData.national_id.trim(),
            first_name: formData.first_name.trim(),
            family_name: formData.family_name.trim(),
            father_name: formData.father_name.trim(),
            grandfather_name: formData.grandfather_name.trim(),
            birth_date: formData.birth_date,
            region: formData.region.trim(),
            email: formData.email.trim() || userProfile?.email || '',
            bank_name: formData.bank_name.trim(),
            iban: formData.iban.trim(),
            phone: formData.phone.replace(/\D/g, ''),
        };

        try {
            await updateMutation.mutateAsync(payload);
            localStorage.removeItem('profile_completion_draft');
            onComplete?.(payload);
        } catch {
            // Error handled by mutation onError
        }
    }, [formData, validate, updateMutation, userProfile, onComplete, scrollToFirstError]);

    const hijriDisplay = useMemo(
        () => formatBirthDateUmmAlQura(formData.birth_date, i18n.language),
        [formData.birth_date, i18n.language]
    );

    const inputClass = (hasError) =>
        [
            'w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-sm transition-all outline-none',
            'bg-[#fafafa] text-gray-900 placeholder:text-gray-400',
            'dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500',
            'focus:border-[#073491] focus:bg-white focus:ring-4 focus:ring-[rgba(7,52,145,0.12)]',
            'dark:focus:border-blue-400 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20',
            hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500 dark:focus:border-red-400'
                : 'border-gray-200 dark:border-slate-600',
        ].join(' ');

    return (
        <ProfileModal
            isOpen={true}
            onClose={onSkip}
            title={t('dashboard.complete_profile.title')}
            subtitle={t('dashboard.complete_profile.subtitle')}
        >
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Personal Information */}
                <ProfileFormSection title={t('admin.users.personal_info')}>
                    <ProfileFormField id="national_id" label={t('national_id')} error={errors.national_id} required>
                        <input
                            type="text"
                            value={formData.national_id}
                            onChange={(e) => handleChange('national_id', e.target.value)}
                            className={inputClass(errors.national_id)}
                            placeholder="1234567890"
                            maxLength={10}
                        />
                    </ProfileFormField>

                    <ProfileFormField id="birth_date" label={t('birth_date')} error={errors.birth_date} required>
                        <input
                            type="date"
                            value={formData.birth_date}
                            onChange={(e) => handleChange('birth_date', e.target.value)}
                            className={inputClass(errors.birth_date)}
                        />
                        {hijriDisplay && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                                {t('birth_date_hijri_umalqura_label')}:{' '}
                                <span className="font-medium text-gray-700 dark:text-slate-300">{hijriDisplay}</span>
                            </p>
                        )}
                    </ProfileFormField>

                    <ProfileFormField id="first_name" label={t('first_name')} error={errors.first_name} required>
                        <input
                            type="text"
                            value={formData.first_name}
                            onChange={(e) => handleChange('first_name', e.target.value)}
                            className={inputClass(errors.first_name)}
                            placeholder={t('first_name_placeholder')}
                        />
                    </ProfileFormField>

                    <ProfileFormField id="father_name" label={t('father_name')} error={errors.father_name} required>
                        <input
                            type="text"
                            value={formData.father_name}
                            onChange={(e) => handleChange('father_name', e.target.value)}
                            className={inputClass(errors.father_name)}
                        />
                    </ProfileFormField>

                    <ProfileFormField id="grandfather_name" label={t('grandfather_name')} error={errors.grandfather_name} required>
                        <input
                            type="text"
                            value={formData.grandfather_name}
                            onChange={(e) => handleChange('grandfather_name', e.target.value)}
                            className={inputClass(errors.grandfather_name)}
                        />
                    </ProfileFormField>

                    <ProfileFormField id="family_name" label={t('family_name')} error={errors.family_name} required>
                        <input
                            type="text"
                            value={formData.family_name}
                            onChange={(e) => handleChange('family_name', e.target.value)}
                            className={inputClass(errors.family_name)}
                            placeholder={t('last_name_placeholder')}
                        />
                    </ProfileFormField>

                    <ProfileFormField id="region" label={t('region')} error={errors.region} required>
                        <input
                            type="text"
                            value={formData.region}
                            onChange={(e) => handleChange('region', e.target.value)}
                            className={inputClass(errors.region)}
                            placeholder={t('region_placeholder')}
                        />
                    </ProfileFormField>
                </ProfileFormSection>

                {/* Contact Information */}
                <ProfileFormSection title={t('admin.users.contact_info')}>
                    <ProfileFormField id="phone" label={t('phone_number')} error={errors.phone} required>
                        <div
                            className={[
                                'overflow-hidden rounded-[10px] border-[1.5px] transition-colors',
                                errors.phone
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-200 dark:border-slate-600',
                                '[&_.react-international-phone-input-container]:!rounded-none [&_.react-international-phone-input-container]:!border-0',
                                'dark:[&_.react-international-phone-input]:!bg-slate-800/90 dark:[&_.react-international-phone-input]:!text-slate-100',
                                '[&_.react-international-phone-input]:!bg-[#fafafa] [&_.react-international-phone-input]:!text-gray-900',
                                'dark:[&_.react-international-phone-country-selector-button]:!border-slate-600 dark:[&_.react-international-phone-country-selector-button]:!bg-slate-800',
                                '[&_.react-international-phone-country-selector-button]:!border-gray-200 [&_.react-international-phone-country-selector-button]:!bg-white',
                            ].join(' ')}
                        >
                            <PhoneInput
                                defaultCountry="sa"
                                value={formData.phone}
                                onChange={(phone) => handleChange('phone', phone)}
                                className={errors.phone ? 'phone-input-error' : ''}
                            />
                        </div>
                    </ProfileFormField>

                    <ProfileFormField id="email" label={t('email')} error={errors.email}>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={inputClass(errors.email)}
                            placeholder={t('email_placeholder')}
                        />
                    </ProfileFormField>
                </ProfileFormSection>

                {/* Banking Information */}
                <ProfileFormSection title={t('admin.users.banking_info')}>
                    <ProfileFormField id="bank_name" label={t('bank_name')} error={errors.bank_name} required>
                        <input
                            type="text"
                            value={formData.bank_name}
                            onChange={(e) => handleChange('bank_name', e.target.value)}
                            className={inputClass(errors.bank_name)}
                        />
                    </ProfileFormField>

                    <ProfileFormField id="iban" label={t('iban')} error={errors.iban} required>
                        <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 dark:text-slate-400">
                                SA
                            </span>
                            <input
                                type="text"
                                value={formData.iban.startsWith('SA') ? formData.iban.slice(2) : formData.iban}
                                onChange={(e) => handleChange('iban', e.target.value)}
                                className={`${inputClass(errors.iban)} pl-10`}
                                dir="ltr"
                            />
                        </div>
                    </ProfileFormField>
                </ProfileFormSection>

                {/* Actions */}
                <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 dark:border-slate-700 sm:flex-row">
                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        disabled={updateMutation.isPending}
                        className="flex-1 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        {isAr ? 'إكمال لاحقاً' : 'Continue Later'}
                    </button>

                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#073491] bg-[#073491] px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#0a3fa3] disabled:opacity-50 dark:border-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                        {updateMutation.isPending ? (
                            <>
                                <Watch height={20} width={20} color="#fff" ariaLabel="loading" />
                                {t('dashboard.form.submitting')}
                            </>
                        ) : (
                            t('dashboard.complete_profile.submit') || (isAr ? 'حفظ البيانات' : 'Save Data')
                        )}
                    </button>
                </div>
            </form>
        </ProfileModal>
    );
}