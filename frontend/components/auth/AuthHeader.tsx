import React from 'react';

export default function AuthHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{subtitle}</p>}
    </div>
  );
}
