"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // If user is authenticated, send to dashboard, otherwise go to login.
    if (user) router.replace('/dashboard');
    else router.replace('/(auth)/login');
  }, [user, router]);

  return null;
}
