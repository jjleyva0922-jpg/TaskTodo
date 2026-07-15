"use client";

import React, { useEffect, useState } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../lib/theme';

type Props = {
  onToggleMobile?: () => void;
  onToggleCollapse?: () => void;
  collapsed?: boolean;
};

export default function TopNav({ onToggleMobile }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  return (
    <header className="w-full bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onToggleMobile} className="md:hidden p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {mounted && (
            <button onClick={toggleTheme} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2">
          </div>
        </div>
      </div>
    </header>
  );
}
