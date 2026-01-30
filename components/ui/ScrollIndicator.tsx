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
    <div className="fixed top-[57px] left-0 right-0 z-40 h-[3px] bg-[#0a0a0a] border-b border-[#1a1a1a]">
      <div
        className="h-full bg-gradient-to-r from-accent/80 via-accent to-accent/80 transition-all duration-150 ease-out relative progress-glow"
        style={{ width: `${scrollProgress}%` }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/20 via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
      </div>
    </div>
  );
}
