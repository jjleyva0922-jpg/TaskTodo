"use client";

import { useState } from 'react';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthCard from '../../../components/auth/AuthCard';
import AuthHeader from '../../../components/auth/AuthHeader';
import FormInput from '../../../components/auth/FormInput';
import SubmitButton from '../../../components/auth/SubmitButton';
import AuthFooter from '../../../components/auth/AuthFooter';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotSchema, type ForgotSchema } from '../../../lib/validation/auth';

export default function ForgotPage() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotSchema>({ resolver: zodResolver(forgotSchema) });

  const onSubmit = async () => {
    setError(null);
    setSuccess(null);
    await new Promise((r) => setTimeout(r, 700));
    setSuccess('If that email exists, a reset link has been sent--- Its A prank!');
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader title="Reset your password" subtitle="Enter the email associated with your account" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput label="Email" placeholder="you@example.com" {...register('email')} error={errors.email} />

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
          {success && <div className="mb-4 text-sm text-green-600">{success}</div>}

          <SubmitButton loading={isSubmitting}>Send reset link</SubmitButton>
        </form>

        <div className="mt-6 text-center text-sm">
          Remembered? <Link href="/login" className="text-sky-600 hover:underline">Sign in</Link>
        </div>

        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  );
}
