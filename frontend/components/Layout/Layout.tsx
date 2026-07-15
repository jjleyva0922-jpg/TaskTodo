"use client";

import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <Sidebar open={mobileOpen} collapsed={collapsed} onClose={() => setMobileOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <TopNav onToggleMobile={() => setMobileOpen((s) => !s)} onToggleCollapse={() => setCollapsed((s) => !s)} collapsed={collapsed} />
        <div className="px-6 py-4">
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
