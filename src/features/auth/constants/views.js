export const AUTH_VIEWS = {
  LOGIN: 'login',
  OTP: 'otp',
  FORGOT: 'forgot',
  RESET: 'reset',
  CREATE_ADMIN: 'create_admin',
};

export const VIEW_TITLES = {
  [AUTH_VIEWS.LOGIN]: null,
  [AUTH_VIEWS.OTP]: 'التحقق من الهوية',
  [AUTH_VIEWS.FORGOT]: 'استعادة كلمة المرور',
  [AUTH_VIEWS.RESET]: 'تعيين كلمة مرور جديدة',
  [AUTH_VIEWS.CREATE_ADMIN]: 'إنشاء حساب مدير',
};
