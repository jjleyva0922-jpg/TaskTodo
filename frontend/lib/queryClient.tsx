"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

export function ReactQueryProvider({ children }: Props) {
  const [client] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Keep data fresh for 5 minutes by default
            staleTime: 1000 * 60 * 5,
            // Keep cache for 30 minutes so navigating away/back reuses it
            gcTime: 1000 * 60 * 30,
            // Don't refetch automatically when components remount (lazy load)
            refetchOnMount: false,
            // Don't refetch on window focus or reconnect to avoid noisy requests
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
