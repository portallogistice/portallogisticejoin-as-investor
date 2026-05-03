// src/features/profile/utils/constants.js
export const PROFILE_FIELD_ORDER = [
    'national_id',
    'birth_date',
    'first_name',
    'father_name',
    'grandfather_name',
    'family_name',
    'region',
    'phone',
    'email',
    'bank_name',
    'iban'
];

export const SUPPORT_CONFIG = {
    whatsapp: process.env.REACT_APP_SUPPORT_WHATSAPP || '',
    email: process.env.REACT_APP_SUPPORT_EMAIL || 'support@example.com',
    url: process.env.REACT_APP_SUPPORT_URL || '',
};

export const REQUIRED_FIELDS = [
    'national_id', 'first_name', 'family_name', 'father_name',
    'grandfather_name', 'birth_date', 'region', 'bank_name', 'iban', 'phone'
];