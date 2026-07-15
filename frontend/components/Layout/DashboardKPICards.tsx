"use client";

import React from 'react';
import { ClipboardList, CheckCircle2, Circle } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardKPICards() {
  const { user } = useAuth();
  const { data: todos = [], isLoading } = useTodos(user?.id);

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = todos.filter(t => !t.completed).length;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Todos */}
      <div className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-900/40 rounded-2xl border border-sky-200 dark:border-sky-700 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-sky-700 dark:text-sky-300">Total Todos</p>
            <p className="mt-2 text-4xl font-bold text-sky-900 dark:text-sky-100">{total}</p>
            <p className="mt-1 text-xs text-sky-600 dark:text-sky-400">All tasks</p>
          </div>
          <div className="p-3 rounded-full bg-sky-200 dark:bg-sky-700/50">
            <ClipboardList className="h-6 w-6 text-sky-700 dark:text-sky-300" />
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/40 rounded-2xl border border-emerald-200 dark:border-emerald-700 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Completed</p>
            <p className="mt-2 text-4xl font-bold text-emerald-900 dark:text-emerald-100">{completed}</p>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">Finished tasks</p>
          </div>
          <div className="p-3 rounded-full bg-emerald-200 dark:bg-emerald-700/50">
            <CheckCircle2 className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
          </div>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/40 rounded-2xl border border-amber-200 dark:border-amber-700 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Pending</p>
            <p className="mt-2 text-4xl font-bold text-amber-900 dark:text-amber-100">{pending}</p>
            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">Still to do</p>
          </div>
          <div className="p-3 rounded-full bg-amber-200 dark:bg-amber-700/50">
            <Circle className="h-6 w-6 text-amber-700 dark:text-amber-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
