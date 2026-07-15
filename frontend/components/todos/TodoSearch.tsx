import React from 'react';
import { Search } from 'lucide-react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TodoSearch({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm px-4 py-3 transition hover:border-sky-300 dark:hover:border-sky-600">
      <Search className="w-4 h-4 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search todos by title..."
        className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 dark:text-slate-100"
      />
    </label>
  );
}
