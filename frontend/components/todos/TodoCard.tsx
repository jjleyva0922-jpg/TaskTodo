"use client";

import React from 'react';
import { Todo } from '../../types';
import { TodoStatusBadge } from './TodoStatusBadge';

type Props = {
  todo: Todo;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
};

const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric'
}).format(new Date(value));

export default function TodoCard({ todo, onEdit, onDelete, onToggleComplete }: Props) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{todo.title}</h3>
            <TodoStatusBadge completed={todo.completed} />
          </div>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{todo.description}</p>
        </div>
        <div className="flex flex-col items-start gap-3 text-sm text-slate-500 dark:text-slate-400 sm:items-end">
          <span>Created {formatDate(todo.createdAt)}</span>
          <span>Updated {formatDate(todo.updatedAt)}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
        <button
          type="button"
          onClick={onToggleComplete}
          className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          {todo.completed ? 'Mark incomplete' : 'Mark complete'}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-sky-700 transition hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:border-rose-400 hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
