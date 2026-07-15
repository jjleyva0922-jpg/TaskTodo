"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoFormSchema, type TodoFormValues } from '../../lib/validation/todo';

type Props = {
  defaultValues?: Partial<TodoFormValues>;
  submitLabel: string;
  loading?: boolean;
  showStatusToggle?: boolean;
  onSubmit: (values: TodoFormValues) => void;
};

export default function TodoForm({ defaultValues, submitLabel, loading = false, showStatusToggle = false, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      completed: defaultValues?.completed ?? false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
        <input
          {...register('title')}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          placeholder="Write a short title"
        />
        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          placeholder="Add details about the task"
        />
        {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      {showStatusToggle && (
        <input type="hidden" {...register('completed')} />
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
