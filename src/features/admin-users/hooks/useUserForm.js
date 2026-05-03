import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EMPTY_FORM = {
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

/** Normalise IBAN: always carry the SA prefix internally */
function normaliseIban(raw = '') {
  const clean = String(raw).replace(/^SA/i, '').replace(/[^A-Z0-9]/gi, '').toUpperCase();
  return `SA${clean}`;
}

/** Format Gregorian date to Hijri (Umm Al-Qura) for display */
function formatHijri(isoYmd, language) {
  if (!isoYmd || !/^\d{4}-\d{2}-\d{2}$/.test(isoYmd)) return null;
  const [y, mo, d] = isoYmd.split('-').map(Number);
  const date = new Date(y, mo - 1, d);
  if (Number.isNaN(date.getTime())) return null;
  try {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-SA', {
      calendar: 'islamic-umalqura',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return null;
  }
}

/**
 * Manages form state, field changes, and validation for the user update form.
 * @param {object|null} user — the loaded user profile
 */
export function useUserForm(user) {
  const { t, i18n } = useTranslation(['common']);

  const initialForm = useMemo(() => {
    if (!user) return EMPTY_FORM;
    return {
      national_id: user.national_id ?? '',
      first_name: user.first_name ?? '',
      family_name: user.family_name ?? user.last_name ?? '',
      father_name: user.father_name ?? '',
      grandfather_name: user.grandfather_name ?? '',
      birth_date: user.birth_date ?? '',
      region: user.region ?? '',
      email: user.email ?? '',
      bank_name: user.bank_name ?? '',
      iban: normaliseIban(user.iban ?? ''),
      phone: user.phone ?? user.phone_number ?? '',
    };
  }, [user]);

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // Re-initialise when the user loads
  useMemo(() => {
    setFormData(initialForm);
    setErrors({});
  }, [initialForm]);

  const hijriDisplay = useMemo(
    () => formatHijri(formData.birth_date, i18n.language),
    [formData.birth_date, i18n.language]
  );

  const handleChange = (field, value) => {
    const processed = field === 'iban' ? normaliseIban(value) : value;
    setFormData((prev) => ({ ...prev, [field]: processed }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const next = {};
    const req = (key, label) => {
      if (!formData[key]?.trim()) next[key] = `${label} ${t('dashboard.form.error.required_field')}`;
    };

    req('first_name', t('first_name'));
    req('family_name', t('family_name'));
    req('father_name', t('father_name'));
    req('grandfather_name', t('grandfather_name'));
    req('region', t('region'));
    req('bank_name', t('bank_name'));
    req('iban', t('iban'));

    if (!formData.birth_date) {
      next.birth_date = `${t('birth_date')} ${t('dashboard.form.error.required_field')}`;
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = t('dashboard.form.error.invalid_email');
    }
    if (!formData.phone.trim()) {
      next.phone = `${t('phone_number')} ${t('dashboard.form.error.required_field')}`;
    } else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 20) next.phone = t('dashboard.form.error.phone_length');
    }

    return next;
  };

  /** Returns the cleaned body ready to send to the API */
  const buildBody = () => ({
    first_name: formData.first_name.trim() || null,
    family_name: formData.family_name.trim() || null,
    father_name: formData.father_name.trim() || null,
    grandfather_name: formData.grandfather_name.trim() || null,
    birth_date: formData.birth_date || null,
    region: formData.region.trim() || null,
    phone: formData.phone.trim() || null,
    email: formData.email.trim() || null,
    bank_name: formData.bank_name.trim() || null,
    iban: formData.iban.trim().replace(/\s/g, '') || null,
  });

  return { formData, errors, setErrors, handleChange, validate, buildBody, hijriDisplay };
}
