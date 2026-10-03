'use client';

import { useEffect, useRef } from 'react';

/**
 * A soft ring that trails the mouse and grows over anything clickable.
 * The native cursor stays; this only adds feel. Mouse users only.
 */
export default function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      el.dataset.visible = 'true';
      const interactive = (event.target as Element | null)?.closest?.('a, button, [role="link"], [role="tab"], input');
      el.dataset.hover = interactive ? 'true' : 'false';
    };
    const onDown = () => (el.dataset.down = 'true');
    const onUp = () => (el.dataset.down = 'false');
    const onLeave = () => (el.dataset.visible = 'false');

    const loop = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span />
    </div>
  );
}
