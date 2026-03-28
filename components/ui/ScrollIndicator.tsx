'use client';

import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
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
    <div className="fixed left-1/2 top-[84px] z-40 hidden h-1 w-[min(1120px,calc(100%-2rem))] -translate-x-1/2 overflow-hidden rounded-full border border-white/5 bg-white/[0.03] md:block">
      <div
        className="relative h-full rounded-full bg-gradient-to-r from-accent/60 via-accent to-[#9dffb0] transition-all duration-150 ease-out progress-glow"
        style={{ width: `${scrollProgress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-70" />
        <div className="absolute right-0 top-1/2 h-3 w-8 -translate-y-1/2 rounded-full bg-white/25 blur-md" />
      </div>
    </div>
  );
}
