import React from 'react';

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-8 shadow-md">{children}</div>;
}
