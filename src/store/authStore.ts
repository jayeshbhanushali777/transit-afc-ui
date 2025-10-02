import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse } from '../types/user.types';

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: UserResponse, token: string) => void;
  logout: () => void;
  updateUser: (user: UserResponse) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user: UserResponse, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
        localStorage.setItem('token', token);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('token');
      },

      updateUser: (user: UserResponse) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);