import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Priyansh Jha | Full-Stack Product Engineer',
  description:
    'Full-stack product engineer building developer tools, workflow systems, and reliable SaaS products end to end.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Priyansh Jha | Full-Stack Product Engineer',
    description:
      'Developer tools, workflow systems, and reliable products built from idea to production.',
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
