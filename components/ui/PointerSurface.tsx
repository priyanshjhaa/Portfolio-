'use client';

import { type PointerEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PointerSurfaceProps {
  children: ReactNode;
  className?: string;
}

export default function PointerSurface({ children, className }: PointerSurfaceProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <div className={cn('pointer-surface', className)} onPointerMove={handlePointerMove}>
      <span className="pointer-surface-light" aria-hidden="true" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
