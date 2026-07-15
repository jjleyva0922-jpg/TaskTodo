import Link from 'next/link';
import React from 'react';

export default function AuthFooter({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
      {children}
      <div className="mt-3">
        <Link href="/" className="underline">Back to home</Link>
      </div>
    </div>
  );
}
