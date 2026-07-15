"use client";

import { useQuery } from '@tanstack/react-query';
import { AuthUser } from '../types/auth';
import { apiGet } from '../lib/api';

export function useMe() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  return useQuery<{ user: AuthUser }>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await apiGet<{ user: AuthUser }>('/auth/me');
      return response;
    },
    // Only fetch if token exists
    enabled: !!token,
    // Treat 401 as "no user" rather than error
    retry: (failureCount, error: any) => {
      if (error?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
