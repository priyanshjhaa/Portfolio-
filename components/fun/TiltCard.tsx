'use client';

import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';

/**
 * Wraps a card so it tilts toward the pointer with a soft moving glare.
 * Only reacts to fine pointers; touch and reduced-motion users get a still card.
 */
export default function TiltCard({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty('--rx', `${(0.5 - py) * max}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * max}deg`);
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
    el.dataset.tilting = 'true';
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.dataset.tilting = 'false';
  };

  return (
    <div ref={ref} className={`tilt ${className ?? ''}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
      <span className="tilt__glare" aria-hidden="true" />
    </div>
  );
}
