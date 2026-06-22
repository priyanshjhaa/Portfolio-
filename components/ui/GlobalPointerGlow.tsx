'use client';

import { useEffect } from 'react';

export default function GlobalPointerGlow() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (!mediaQuery.matches) {
      return;
    }

    let frameId: number | null = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const updatePosition = () => {
      document.documentElement.style.setProperty('--global-pointer-x', `${x}px`);
      document.documentElement.style.setProperty('--global-pointer-y', `${y}px`);
      document.documentElement.style.setProperty('--global-pointer-active', '1');
      frameId = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        return;
      }

      x = event.clientX;
      y = event.clientY;

      if (frameId === null) {
        frameId = window.requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return <div className="global-pointer-glow" aria-hidden="true" />;
}
