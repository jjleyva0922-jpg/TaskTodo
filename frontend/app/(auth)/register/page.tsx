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
import { registerSchema, type RegisterSchema } from '../../../lib/validation/auth';
import { useAuth } from '../../../hooks/useAuth';

export default function RegisterPage() {
  const { register: doRegister } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const getErrorMessage = (err: any) => {
    if (!err) return 'Registration failed';
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

  const onSubmit = async (data: RegisterSchema) => {
    setServerError(null);
    setSuccess(null);
    try {
      await doRegister(data as any);
      setSuccess('Account Registered!');
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      if (errorMessage.toLowerCase().includes('user already exists') || errorMessage.toLowerCase().includes('duplicate')) {
        setServerError('This email is already registered. Please use a different email or sign in.');
      } else {
        setServerError(errorMessage);
      }
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader title="Create your account" subtitle="Start your free trial or create a team" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Name" placeholder="Jane Doe" {...register('name')} error={errors.name} />
          <FormInput label="Email" placeholder="you@example.com" {...register('email')} error={errors.email} />
          <PasswordInput label="Password" placeholder="••••••••" {...register('password')} error={errors.password} />
          <PasswordInput label="Confirm password" placeholder="••••••••" {...register('confirmPassword')} error={errors.confirmPassword} />

          <label className="flex items-center gap-2 mb-4 text-sm">
            <input type="checkbox" className="form-checkbox" {...register('terms')} />
            I agree to the Terms & Conditions
          </label>
          {errors.terms && <p className="mb-4 text-sm text-red-600">{errors.terms.message}</p>}

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

          <SubmitButton loading={isSubmitting}>Create account</SubmitButton>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account? <Link href="/login" className="text-sky-600 hover:underline">Sign in</Link>
        </div>

        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  );
}
