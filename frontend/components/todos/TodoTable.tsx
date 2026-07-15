"use client";

import React from 'react';
import { Todo } from '../../types';
import { TodoStatusBadge } from './TodoStatusBadge';

type Props = {
  todos: Todo[];
  loading: boolean;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onToggleComplete: (todo: Todo) => void;
};

const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric'
}).format(new Date(value));

export default function TodoTable({ todos, loading, onEdit, onDelete, onToggleComplete }: Props) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
        Loading todos...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950">
      <div className="hidden grid-cols-[1.6fr_2.2fr_1fr_1fr_1fr] gap-4 border-b border-slate-200 px-5 py-4 text-left text-xs uppercase tracking-[0.16em] text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:grid">
        <div>Task</div>
        <div>Description</div>
        <div>Status</div>
        <div>Updated</div>
        <div className="text-right">Actions</div>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {todos.map((todo) => (
          <div key={todo.id} className="grid gap-4 p-5 text-slate-700 dark:text-slate-200 sm:grid-cols-[1.6fr_2.2fr_1fr_1fr_1fr] sm:items-center">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">{todo.title}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:hidden">{todo.description}</p>
            </div>
            <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">{todo.description}</p>
            <div>
              <TodoStatusBadge completed={todo.completed} />
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{formatDate(todo.updatedAt)}</div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {!todo.completed && (
                <>
                  <button
                    type="button"
                    onClick={() => onToggleComplete(todo)}
                    className="rounded-full border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    Done
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(todo)}
                    className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-sky-700 transition hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300"
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => onDelete(todo)}
                className="rounded-full border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition hover:border-rose-400 hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
