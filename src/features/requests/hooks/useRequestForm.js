// src/features/requests/hooks/useRequestForm.js
import { useState, useCallback } from 'react';

export function useRequestForm(initialData = {}) {
  const [form, setForm] = useState({
    full_name: initialData?.name || '',
    national_id: initialData?.national_id || '',
    phone: initialData?.phone || '',
    contract_id: '',
  });

  const [errors, setErrors] = useState({});

  const setField = useCallback((key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validate = useCallback((needContract) => {
    const errs = {};
    if (!form.full_name.trim()) errs.full_name = 'الاسم الكامل مطلوب.';
    if (!form.national_id.trim()) errs.national_id = 'رقم الهوية مطلوب.';
    if (!form.phone.trim()) errs.phone = 'رقم الجوال مطلوب.';
    if (needContract && !form.contract_id) errs.contract_id = 'يرجى اختيار العقد.';
    return errs;
  }, [form]);

  const reset = useCallback(() => {
    setForm({ full_name: '', national_id: '', phone: '', contract_id: '' });
    setErrors({});
  }, []);

  return { form, errors, setField, validate, reset, setErrors };
}