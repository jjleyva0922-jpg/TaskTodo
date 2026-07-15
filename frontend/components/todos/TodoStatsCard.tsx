"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import { useDeletedTodos } from '../../hooks/useDeletedTodos';

type TodoStatsProps = {
  userId?: number | string;
};

export default function TodoStats({ userId }: TodoStatsProps) {
  const { data: activeTodos = [] } = useTodos(userId);
  const { data: deletedTodos = [] } = useDeletedTodos(userId);

  const total = activeTodos.length + deletedTodos.length;
  const active = activeTodos.length;
  const deleted = deletedTodos.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Todos */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 rounded-2xl border border-blue-200 dark:border-blue-700 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Todos</p>
            <p className="mt-2 text-4xl font-bold text-blue-900 dark:text-blue-100">{total}</p>
            <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">All tasks (active + deleted)</p>
          </div>
          <div className="p-3 rounded-full bg-blue-200 dark:bg-blue-700/50">
            <span className="text-2xl">📊</span>
          </div>
        </div>
      </div>

      {/* Active Todos */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40 rounded-2xl border border-green-200 dark:border-green-700 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300">Active</p>
            <p className="mt-2 text-4xl font-bold text-green-900 dark:text-green-100">{active}</p>
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">Not deleted</p>
          </div>
          <div className="p-3 rounded-full bg-green-200 dark:bg-green-700/50">
            <span className="text-2xl">✅</span>
          </div>
        </div>
      </div>

      {/* Deleted Todos */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/40 rounded-2xl border border-red-200 dark:border-red-700 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-300">Deleted</p>
            <p className="mt-2 text-4xl font-bold text-red-900 dark:text-red-100">{deleted}</p>
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">Soft deleted items</p>
          </div>
          <div className="p-3 rounded-full bg-red-200 dark:bg-red-700/50">
            <Trash2 className="h-6 w-6 text-red-700 dark:text-red-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
