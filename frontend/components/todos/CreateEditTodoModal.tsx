"use client";

import React from 'react';
import { X } from 'lucide-react';
import TodoForm from './TodoForm';
import { Todo } from '../../types';
import { TodoFormValues } from '../../lib/validation/todo';

type Props = {
  open: boolean;
  editingTodo?: Todo | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: TodoFormValues) => void;
};

export default function CreateEditTodoModal({ open, editingTodo, loading, onClose, onSubmit }: Props) {
  if (!open) return null;

  const isEditing = Boolean(editingTodo);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {isEditing ? 'Edit task' : 'Create a new todo'}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {isEditing ? 'Update the selected todo and save your changes.' : 'Add a new task to your list.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <TodoForm
              defaultValues={isEditing && editingTodo ? {
                title: editingTodo.title,
                description: editingTodo.description ?? '',
                completed: editingTodo.completed,
              } : undefined}
              submitLabel={isEditing ? 'Save changes' : 'Create todo'}
              showStatusToggle={isEditing}
              loading={loading}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
