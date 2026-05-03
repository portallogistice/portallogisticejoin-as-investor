// src/features/profile/components/ProfileGrid.jsx
import { ProfileField } from './ProfileField';
import { buildFullName } from '../utils/formatters';

export function ProfileGrid({ profile, isAr }) {
    const fullName = buildFullName(profile);
    const roleLabel = profile?.role === 'admin'
        ? (isAr ? 'مدير' : 'Admin')
        : (isAr ? 'مستخدم' : 'User');
    const status = profile?.is_active === false
        ? (isAr ? 'غير نشط' : 'Inactive')
        : (isAr ? 'نشط' : 'Active');

    const fields = [
        { label: isAr ? 'الاسم الكامل' : 'Full Name', value: fullName },
        { label: 'Email', value: profile?.email },
        { label: isAr ? 'رقم الهاتف' : 'Phone', value: profile?.phone ?? profile?.phone_number },
        { label: isAr ? 'رقم الهوية' : 'National ID', value: profile?.national_id },
        { label: isAr ? 'اسم الأب' : 'Father Name', value: profile?.father_name },
        { label: isAr ? 'اسم الجد' : 'Grandfather Name', value: profile?.grandfather_name },
        { label: isAr ? 'تاريخ الميلاد' : 'Birth Date', value: profile?.birth_date },
        { label: isAr ? 'المنطقة' : 'Region', value: profile?.region },
        { label: isAr ? 'رقم الآيبان' : 'IBAN', value: profile?.iban },
        { label: isAr ? 'اسم البنك' : 'Bank Name', value: profile?.bank_name },
        { label: isAr ? 'الدور' : 'Role', value: roleLabel },
        { label: isAr ? 'الحالة' : 'Status', value: status, highlight: profile?.is_active !== false },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fields.map((field) => (
                <ProfileField key={field.label} {...field} />
            ))}
        </div>
    );
}