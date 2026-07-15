"use client";

import React from 'react';
import { ClipboardList, Circle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Todo } from '../../types';
import { useDeletedTodos } from '../../hooks/useDeletedTodos';

type Props = {
  todos: Todo[];
  userId?: number | string;
};

export default function TodoStats({ todos, userId }: Props) {
  const { data: deletedTodos = [] } = useDeletedTodos(userId);
  
  const total = todos.length + deletedTodos.length;
  const pending = todos.filter(t => !t.completed).length;
  const completed = todos.filter(t => t.completed).length;
  const deleted = deletedTodos.length;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Todos</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{total}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">All tasks</p>
          </div>
          <div className="rounded-full bg-sky-100 p-3 dark:bg-sky-900/30">
            <ClipboardList className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{pending}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">To be done</p>
          </div>
          <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
            <Circle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{completed}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Completed tasks</p>
          </div>
          <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Deleted</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{deleted}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Deleted tasks</p>
          </div>
          <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900/30">
            <AlertCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
