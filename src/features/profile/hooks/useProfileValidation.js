// src/features/profile/hooks/useProfileValidation.js
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
export function useProfileValidation() {
    const { i18n } = useTranslation(['common']);
    const isAr = i18n.language === 'ar';
    return useCallback((formData) => {
        const errors = {};

        // National ID
        if (!formData.national_id?.trim()) {
            errors.national_id = `${isAr ? 'الرقم القومي' : 'National ID'} ${isAr ? 'مطلوب' : 'Required'}`;
        } else if (!/^\d{10}$/.test(formData.national_id.trim())) {
            errors.national_id = `${isAr ? 'الرقم القومي' : 'National ID'} ${isAr ? 'يجب أن يكون 10 أرقام' : 'must be 10 digits'}`;
        }

        // Names
        ['first_name', 'family_name', 'father_name', 'grandfather_name'].forEach(field => {
            if (!formData[field]?.trim()) {
                errors[field] = `${isAr ? 'الاسم' : 'Name'} ${isAr ? 'مطلوب' : 'Required'}`;
            }
        });

        // Birth date
        if (!formData.birth_date) {
            errors.birth_date = `${isAr ? 'تاريخ الميلاد' : 'Birth Date'} ${isAr ? 'مطلوب' : 'Required'}`;
        }

        // Region
        if (!formData.region?.trim()) {
            errors.region = `${isAr ? 'المنطقة' : 'Region'} ${isAr ? 'مطلوب' : 'Required'}`;
        }

        // Email (optional but validated)
        if (formData.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            errors.email = `${isAr ? 'البريد الإلكتروني' : 'Email'} ${isAr ? 'يجب أن يكون صالح' : 'must be valid'}`;
        }

        // Banking
        if (!formData.bank_name?.trim()) {
            errors.bank_name = `${isAr ? 'اسم البنك' : 'Bank Name'} ${isAr ? 'مطلوب' : 'Required'}`;
        }
        if (!formData.iban?.trim()) {
            errors.iban = `${isAr ? 'الرقم القومي' : 'National ID'} ${isAr ? 'مطلوب' : 'Required'}`;
        }

        // Phone
        if (!formData.phone?.trim()) {
            errors.phone = `${isAr ? 'رقم الهاتف' : 'Phone Number'} ${isAr ? 'مطلوب' : 'Required'}`;
        } else {
            const digits = formData.phone.replace(/\D/g, '');
            if (digits.length < 10 || digits.length > 20) {
                errors.phone = `${isAr ? 'رقم الهاتف' : 'Phone Number'} ${isAr ? 'يجب أن يكون 10 أرقام' : 'must be 10 digits'}`;
            }
        }

        return errors;
    }, [isAr]);
}