"use client";

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <pre className="mt-4 text-sm text-red-600">{error.message}</pre>
      <button className="mt-4 px-4 py-2 bg-slate-800 text-white rounded" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
