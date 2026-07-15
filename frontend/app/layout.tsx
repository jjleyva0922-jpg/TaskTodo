import './globals.css';
import type { Metadata } from 'next';
import { ReactQueryProvider } from '../lib/queryClient';
import { ThemeProvider } from '../lib/theme';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Frontend for Express API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
