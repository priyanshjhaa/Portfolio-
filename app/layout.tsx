import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Priyansh - Full Stack Developer',
  description: 'I build execution-focused tools. Full-stack developer specializing in precise, scalable solutions.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Priyansh - Full Stack Developer',
    description: 'I build execution-focused tools.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
