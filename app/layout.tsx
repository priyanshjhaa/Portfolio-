import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
