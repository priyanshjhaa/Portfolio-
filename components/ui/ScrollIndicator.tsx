'use client';

import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  activeSection: string;
}

const sectionLabels = {
  hero: 'Core',
  building: 'Build',
  projects: 'Work',
  process: 'Process',
  contact: 'Contact',
} as const;

export default function ScrollIndicator({ activeSection }: ScrollIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      setScrollProgress(Math.min(Math.max(scrolled, 0), 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-1/2 top-[84px] z-40 hidden w-[min(1120px,calc(100%-2rem))] -translate-x-1/2 md:block">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-display text-[10px] uppercase tracking-[0.2em] text-text-muted">
          Scroll State
        </p>
        <p className="font-display text-[10px] uppercase tracking-[0.2em] text-accent">
          {sectionLabels[activeSection as keyof typeof sectionLabels] ?? 'Core'}
        </p>
      </div>
      <div className="h-1 overflow-hidden rounded-full border border-white/5 bg-white/[0.03]">
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-accent/60 via-accent to-[#9dffb0] transition-all duration-150 ease-out progress-glow"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-70" />
          <div className="absolute right-0 top-1/2 h-3 w-8 -translate-y-1/2 rounded-full bg-white/25 blur-md" />
        </div>
      </div>
    </div>
  );
}
