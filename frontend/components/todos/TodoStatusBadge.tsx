import React from 'react';

export function TodoStatusBadge({ completed }: { completed: boolean }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${completed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'}`}>
      {completed ? 'Completed' : 'Pending'}
    </span>
  );
}

export default TodoStatusBadge;
