'use client';

import { useEffect, useRef } from 'react';

/**
 * A quiet grid of dots behind the hero. Near the pointer the dots swell,
 * warm toward the accent color, and lean away — like a field reacting to
 * a probe. Pauses offscreen and stays static with reduced motion.
 */
export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gap = 26;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let ink = '#1b1a17';
    let accent = '#b0432a';
    let frame = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      ink = styles.getPropertyValue('--ink').trim() || ink;
      accent = styles.getPropertyValue('--accent').trim() || accent;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.15;
      pointer.y += (pointer.ty - pointer.y) * 0.15;
      ctx.clearRect(0, 0, width, height);
      const reach = 170;
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.hypot(dx, dy);
          const near = d < reach ? 1 - d / reach : 0;
          const wave = reduced ? 0 : (Math.sin(time / 1400 + x / 140 + y / 180) + 1) / 2;
          const push = near * 9;
          const px = x + (d > 0 ? (dx / d) * push : 0);
          const py = y + (d > 0 ? (dy / d) * push : 0);
          ctx.globalAlpha = 0.09 + wave * 0.05 + near * 0.6;
          ctx.fillStyle = near > 0.15 ? accent : ink;
          ctx.beginPath();
          ctx.arc(px, py, 1 + near * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      if (visible) draw(time);
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    readColors();
    resize();
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduced) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(canvas);
    window.addEventListener('resize', resize);

    if (reduced) {
      draw(0);
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="dotfield" aria-hidden="true" />;
}
