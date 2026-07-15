import React from 'react';

type Props = {
  open: boolean;
  title: string;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteTodoModal({ open, title, loading, onConfirm, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Delete todo</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Are you sure you want to delete <span className="font-semibold">{title}</span>? This action cannot be undone.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button onClick={onClose} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? 'Deleting…' : 'Delete todo'}
          </button>
        </div>
      </div>
    </div>
  );
}
