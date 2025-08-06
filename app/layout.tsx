import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fintrack - Wallet Ledger Dashboard',
  description: 'Modern financial dashboard for tracking transactions and managing your wallet ledger',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon_io/favicon.ico' },
      { rel: 'android-chrome-192x192', url: '/favicon_io/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/favicon_io/android-chrome-512x512.png' },
    ],
  },
  manifest: '/favicon_io/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}