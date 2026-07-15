import React from 'react';

export type TodoFilterOption = 'all' | 'pending' | 'completed';
export type TodoSortOption = 'newest' | 'oldest' | 'alphabetical';

type Props = {
  filter: TodoFilterOption;
  sort: TodoSortOption;
  onFilterChange: (value: TodoFilterOption) => void;
  onSortChange: (value: TodoSortOption) => void;
};

const filterItems: { value: TodoFilterOption; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

const sortItems: { value: TodoSortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

export default function TodoFilters({ filter, sort, onFilterChange, onSortChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row items-start sm:items-center">
      <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-2 gap-2">
        {filterItems.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onFilterChange(item.value)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${filter === item.value ? 'bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm px-3 py-2">
        <span className="text-sm text-slate-500 dark:text-slate-400">Sort by</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as TodoSortOption)}
          className="bg-transparent text-sm outline-none text-slate-900 dark:text-slate-100"
        >
          {sortItems.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
