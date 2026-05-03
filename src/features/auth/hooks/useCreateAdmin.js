import { useMutation } from '@tanstack/react-query';
import { createAdmin } from '../api/createAdmin';
import { notify } from '../utils/notify';

export function useCreateAdmin() {
  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      notify('تم إنشاء حساب المدير بنجاح', 'يمكنك تسجيل الدخول الآن.');
    },
  });
}
