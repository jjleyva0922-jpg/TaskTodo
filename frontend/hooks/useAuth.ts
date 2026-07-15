"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthUser, LoginForm, RegisterForm } from '../types/auth';
import { apiPost } from '../lib/api';
import { useMe } from './useMe';
import { useQueryClient } from '@tanstack/react-query';

type UseAuthReturn = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginForm) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

function getErrorMessage(err: any): string {
  if (!err) return 'An unexpected error occurred.';
  if (typeof err === 'string') return err;
  if (typeof err?.status === 'number' && typeof err?.message === 'string') return err.message;
  if (typeof err?.response?.data?.error === 'string') return err.response.data.error;
  if (typeof err?.response?.data?.message === 'string') return err.response.data.message;

  const source = err?.response?.data?.error || err?.response?.data?.message || err?.message || err;
  if (typeof source === 'string') return source;
  if (typeof source === 'object') {
    const extracted = Object.values(source).find((value) => typeof value === 'string');
    if (extracted) return extracted;
    return JSON.stringify(source);
  }

  return String(source);
}

export function useAuth(): UseAuthReturn {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use React Query to fetch user, cached across navigation
  const { data, isLoading, error: queryError } = useMe();

  const login = async (data: LoginForm) => {
    setError(null);
    try {
      const response = await apiPost<{ token: string; user: AuthUser }>('/auth/login', {
        email: data.email,
        password: data.password,
      });

      // Server sets httpOnly cookie for the session token; also save token locally
      try {
        if (typeof window !== 'undefined' && response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      } catch (e) {
        // ignore
      }
      
      // Invalidate cached user and refetch immediately
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      
      router.push('/dashboard');
    } catch (err: any) {
      const errorMsg = getErrorMessage(err) || 'Login failed';
      setError(errorMsg);
      throw errorMsg;
    }
  };

  const register = async (data: RegisterForm) => {
    setError(null);
    try {
      const response = await apiPost<{ token: string; user: AuthUser }>('/auth/register', {
        email: data.email,
        password: data.password,
        name: data.name,
      });

      // Server sets httpOnly cookie for the session token; also save token locally
      try {
        if (typeof window !== 'undefined' && response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      } catch (e) {
        // ignore
      }
      
      // Invalidate cached user and refetch immediately
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      
      router.push('/dashboard');
    } catch (err: any) {
      const errorMsg = getErrorMessage(err) || 'Registration failed';
      setError(errorMsg);
      throw errorMsg;
    }
  };

  const logout = async () => {
    try {
      await apiPost('/auth/logout');
    } catch (e) {
      // ignore
    }
    // Remove local token storage and clear cache
    try {
      if (typeof window !== 'undefined') localStorage.removeItem('auth_token');
    } catch (e) {}
    
    // Clear user cache
    queryClient.setQueryData(['auth', 'me'], null);
    
    router.push('/login');
  };

  return {
    user: data?.user ?? null,
    loading: isLoading,
    error: error || queryError?.message || null,
    login,
    register,
    logout,
    isAuthenticated: !!data?.user,
  };
}
