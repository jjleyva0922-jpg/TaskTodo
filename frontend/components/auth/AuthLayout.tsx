import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-12 items-center justify-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome to TaskFlow</h1>
          <p className="mt-4 text-sky-100">A modern, intuitive web application designed to clear your mental clutter by organizing daily activities into actionable priorities. By providing a seamless space to capture, track, and cross off your goals, it transforms chaotic to-do lists into structured daily achievements.</p>
        </div>
      </aside>

      <main className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-slate-900">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
