"use client";

import { useState } from 'react';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthCard from '../../../components/auth/AuthCard';
import AuthHeader from '../../../components/auth/AuthHeader';
import FormInput from '../../../components/auth/FormInput';
import PasswordInput from '../../../components/auth/PasswordInput';
import SubmitButton from '../../../components/auth/SubmitButton';
import AuthFooter from '../../../components/auth/AuthFooter';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '../../../lib/validation/auth';
import { useAuth } from '../../../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const getErrorMessage = (err: any) => {
    // Map HTTP 401 Unauthorized to a friendly credentials message
    if (err && (err.status === 401 || err?.response?.status === 401)) {
      return 'Invalid email or password. Please try again.';
    }
    if (!err) return 'Invalid email or password. Please try again.';
    if (typeof err === 'string') return err;
    if (typeof err?.status === 'number' && typeof err?.message === 'string') return err.message;
    if (typeof err?.response?.data?.error === 'string') return err.response.data.error;
    if (typeof err?.response?.data?.message === 'string') return err.response.data.message;
    if (typeof err?.message === 'string') return err.message;
    if (typeof err?.message === 'object') {
      const extracted = Object.values(err.message).find((value) => typeof value === 'string');
      if (extracted) return extracted;
      return JSON.stringify(err.message);
    }
    if (typeof err?.response?.data === 'object') {
      return JSON.stringify(err.response.data);
    }
    return String(err);
  };

  const onSubmit = async (data: LoginSchema) => {
    setServerError(null);
    setSuccess(null);
    try {
      await login(data as any);
      setSuccess('Logging In');
    } catch (err: any) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader title="Sign in to your account" subtitle="Enter your credentials to continue" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Email" placeholder="you@example.com" {...register('email')} error={errors.email} />
          <PasswordInput label="Password" placeholder="••••••••" {...register('password')} error={errors.password} />

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="form-checkbox" {...register('remember')} />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-sm text-sky-600 hover:underline">Forgot Password?</Link>
          </div>

          {serverError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-300">{serverError}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
            </div>
          )}

          <SubmitButton loading={isSubmitting}>Sign in</SubmitButton>
        </form>

        <div className="mt-6 text-center text-sm">
          Don't have an account? <Link href="/register" className="text-sky-600 hover:underline">Create one</Link>
        </div>

        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  );
}
