import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../api/resetPassword';
import { notify } from '../utils/notify';

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      notify('تم تغيير كلمة المرور بنجاح', 'يمكنك تسجيل الدخول الآن.');
    },
  });
}
