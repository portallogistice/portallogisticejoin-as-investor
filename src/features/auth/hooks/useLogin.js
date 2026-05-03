import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { loginUser } from '../api/login';
import { notify } from '../utils/notify';

export function useLogin() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setError = useAuthStore((state) => state.setError);

  return useMutation({
    mutationFn: ({ credentials, isAdmin }) => loginUser(credentials, isAdmin),

    onSuccess: (data, variables) => {
      const { isAdmin } = variables;

      // if (data.requiresOTP) {
      //   return { requiresOTP: true, phone: data.user?.phone };
      // }

      if (data.success) {
        // Set cookies
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `portal_logistics_token=${data.data.token}; expires=${expires}; path=/; Secure; SameSite=Strict`;
        document.cookie = `portal_logistics_user_type=${isAdmin ? 'admin' : 'user'}; expires=${expires}; path=/; Secure; SameSite=Strict`;
        setUser(data.data.user, isAdmin ? 'admin' : 'user');
        notify('مرحباً بك!', 'تم تسجيل الدخول بنجاح.');

        const redirect = isAdmin ? '/admin' : '/dashboard';
        navigate(redirect, { replace: true });
      }

      return { success: true };
    },

    onError: (error) => {
      console.log(error);
      const message = 'بيانات الدخول غير صحيحة.';
      setError(message);
      return { success: false, error: message };
    },
  });
}
