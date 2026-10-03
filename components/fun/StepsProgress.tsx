'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * Drives a scroll-linked rail beside the build steps: the line fills as you
 * read, and each step switches on as the reading line passes it.
 */
export default function StepsProgress({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect();
        const line = window.innerHeight * 0.55;
        const progress = Math.max(0, Math.min(1, (line - rect.top) / rect.height));
        root.style.setProperty('--progress', progress.toFixed(4));
        root.querySelectorAll<HTMLElement>('.step').forEach((step) => {
          const top = step.getBoundingClientRect().top;
          step.classList.toggle('is-on', top < line);
        });
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={ref} className="steps-progress">
      <div className="steps-progress__rail" aria-hidden="true">
        <span />
      </div>
      {children}
    </div>
  );
}
