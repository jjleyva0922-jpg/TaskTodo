"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function segmentToLabel(seg: string) {
  return seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname() || '/';
  const parts = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-slate-600 dark:text-slate-300" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="text-slate-500 dark:text-slate-300 hover:underline">
            Home
          </Link>
        </li>
        {parts.map((p, i) => {
          const href = '/' + parts.slice(0, i + 1).join('/');
          const isLast = i === parts.length - 1;
          return (
            <li key={href} className="flex items-center gap-2">
              <span className="text-slate-300">/</span>
              {isLast ? (
                <span className="font-medium">{segmentToLabel(p)}</span>
              ) : (
                <Link href={href} className="text-slate-600 dark:text-slate-300 hover:underline">{segmentToLabel(p)}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
