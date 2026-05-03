import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      userType: null, // 'user' | 'admin'
      isLoading: false,
      error: null,

      // Actions
      setUser: (user, type) =>
        set({
          user,
          userType: type,
          isAuthenticated: true,
          error: null,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error, isLoading: false }),

      logout: () => {
        // Clear cookies
        document.cookie = 'portal_logistics_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'portal_logistics_user_type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        set({
          user: null,
          isAuthenticated: false,
          userType: null,
          error: null,
        });
      },

      // Check existing auth on app load
      checkAuth: () => {
        const token = document.cookie.match(/portal_logistics_token=([^;]+)/)?.[1];
        const userType = document.cookie.match(/portal_logistics_user_type=([^;]+)/)?.[1];

        if (token && userType) {
          // Optionally validate token with backend
          set({ isAuthenticated: true, userType });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key (for non-sensitive data only)
      partialize: (state) => ({ userType: state.userType }), // Only persist userType
    }
  )
);
