'use client';

import { useEffect, useRef } from 'react';

export const burstEvent = 'portfolio:burst';

/** Fire a celebratory burst of data packets from anywhere on the page. */
export function triggerBurst(x?: number, y?: number) {
  window.dispatchEvent(new CustomEvent(burstEvent, { detail: { x, y } }));
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  square: boolean;
  hue: number;
}

/** Full-screen canvas that renders packet bursts (the palette easter eggs use it). */
export default function PacketBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let particles: Particle[] = [];
    let frame = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const step = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const styles = getComputedStyle(document.documentElement);
      const colors = [styles.getPropertyValue('--accent').trim(), styles.getPropertyValue('--ink').trim(), styles.getPropertyValue('--ok').trim(), styles.getPropertyValue('--warn').trim()];
      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.vy += 0.25;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        ctx.globalAlpha = Math.min(1, p.life / 40);
        ctx.fillStyle = colors[p.hue % colors.length];
        if (p.square) ctx.fillRect(p.x, p.y, p.size, p.size);
        else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      if (particles.length) frame = requestAnimationFrame(step);
      else running = false;
    };

    const onBurst = (event: Event) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const detail = (event as CustomEvent<{ x?: number; y?: number }>).detail ?? {};
      const ox = detail.x ?? window.innerWidth / 2;
      const oy = detail.y ?? window.innerHeight / 3;
      for (let i = 0; i < 140; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 9;
        particles.push({
          x: ox,
          y: oy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          life: 70 + Math.random() * 60,
          size: 3 + Math.random() * 5,
          square: Math.random() > 0.5,
          hue: Math.floor(Math.random() * 4),
        });
      }
      if (!running) {
        running = true;
        frame = requestAnimationFrame(step);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener(burstEvent, onBurst);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener(burstEvent, onBurst);
    };
  }, []);

  return <canvas ref={canvasRef} className="burst-canvas" aria-hidden="true" />;
}
