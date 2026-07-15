import React from 'react';
import { Inbox } from 'lucide-react';

type Props = {
  onCreate: () => void;
};

export default function TodoEmptyState({ onCreate }: Props) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 mb-6">
        <Inbox className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">No todos yet</h2>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Start building your task list by creating your first todo. Keep track of what matters most and stay organized.</p>
      <button
        onClick={onCreate}
        className="mt-6 inline-flex items-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
      >
        Create a todo
      </button>
    </div>
  );
}
