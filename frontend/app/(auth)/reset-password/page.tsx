"use client";

import React, { useState } from 'react';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthCard from '../../../components/auth/AuthCard';
import AuthHeader from '../../../components/auth/AuthHeader';
import PasswordInput from '../../../components/auth/PasswordInput';
import SubmitButton from '../../../components/auth/SubmitButton';
import AuthFooter from '../../../components/auth/AuthFooter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetSchema, type ResetSchema } from '../../../lib/validation/auth';
import { useSearchParams } from 'next/navigation';

export default function ResetPage() {
  const params = useSearchParams();
  const token = params?.get('token') || '';
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetSchema>({ resolver: zodResolver(resetSchema), defaultValues: { token } });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900));
    setSuccess('Password reset (mock). You can now sign in with your new password.');
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader title="Set a new password" subtitle="Enter a strong new password for your account" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('token') as any} />
          <PasswordInput label="New password" placeholder="••••••••" {...register('password')} error={errors.password} />
          <PasswordInput label="Confirm password" placeholder="••••••••" {...register('confirmPassword')} error={errors.confirmPassword} />

          {success && <div className="mb-4 text-sm text-green-600">{success}</div>}

          <SubmitButton loading={isSubmitting}>Set password</SubmitButton>
        </form>

        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  );
}
