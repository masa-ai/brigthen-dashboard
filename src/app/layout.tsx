import { ThemeProvider } from '@mui/material';
import { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import * as React from 'react';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import ReactQueryProvider from '@/api/ReactQueryProvider';
import { siteConfig } from '@/constant/config';
import { defaultTheme } from '@/styles/theme';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
};

const font = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-primary',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  return (
    <html>
      <body className={font.variable}>
        <ThemeProvider theme={defaultTheme}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
