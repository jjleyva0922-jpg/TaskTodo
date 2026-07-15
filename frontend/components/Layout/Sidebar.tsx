"use client";

import Link from 'next/link';
import React from 'react';
import { Home, CheckSquare, X, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

type Props = {
  open?: boolean;
  collapsed?: boolean;
  onClose?: () => void;
};

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/todos', label: 'Todos', icon: CheckSquare },
];

export default function Sidebar({ open = false, collapsed = false, onClose }: Props) {
  const pathname = usePathname() || '/';
  const { logout } = useAuth();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden md:flex flex-col w-64 ${collapsed ? 'w-20' : 'w-64'} bg-white dark:bg-slate-800 border-r transition-width`}>
        <div className="p-4 border-b dark:border-slate-700 flex items-center justify-between">
          <h2 className={`text-lg font-bold ${collapsed ? 'opacity-0 w-0' : ''}`}>TaskFlow</h2>
        </div>
        <nav className="p-4 flex-1">
          <ul className="space-y-1">
            {items.map((it) => {
              const Icon = it.icon;
              const active = pathname === it.href;
              return (
                <li key={it.href}>
                  <Link href={it.href} className={`flex items-center gap-3 px-3 py-2 rounded-md ${active ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                    <Icon className="h-4 w-4" />
                    <span className={`${collapsed ? 'hidden' : 'block'}`}>{it.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-slate-200 dark:border-slate-700 p-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-300 transition"
          >
            <LogOut className="h-4 w-4" />
            <span className={`${collapsed ? 'hidden' : 'block'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-white dark:bg-slate-800 border-r p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold">TaskFlow</div>
              <button onClick={onClose} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1">
              <ul className="space-y-2">
                {items.map((it) => {
                  const Icon = it.icon;
                  const active = pathname === it.href;
                  return (
                    <li key={it.href}>
                      <Link href={it.href} onClick={onClose} className={`flex items-center gap-3 px-3 py-2 rounded-md ${active ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                        <Icon className="h-4 w-4" />
                        <span>{it.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <button
                onClick={() => {
                  logout();
                  onClose?.();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-300 transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          <div className="flex-1 bg-black/40" onClick={onClose} />
        </div>
      )}
    </>
  );
}
