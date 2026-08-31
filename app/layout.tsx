import type { Metadata } from 'next';
import GlobalPointerGlow from '@/components/ui/GlobalPointerGlow';
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
        <div className="field-atmosphere" aria-hidden="true" />
        <div className="field-grid" aria-hidden="true" />
        <div className="system-guides" aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
        </div>
        <GlobalPointerGlow />
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
