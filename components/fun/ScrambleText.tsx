'use client';

import { useEffect, useRef, useState } from 'react';

const glyphs = '{}[]<>/\\=+*#%&$@01';

/**
 * Text that "resolves" out of noise — a nod to turning complexity into
 * clarity. Plays once on mount and again on hover.
 */
export default function ScrambleText({ text, className, delay = 300 }: { text: string; className?: string; delay?: number }) {
  const [output, setOutput] = useState(text);
  const frame = useRef(0);
  const timer = useRef(0);

  const run = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const settled = Math.floor(progress * text.length);
      let next = '';
      for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        if (i < settled || char === ' ' || char === '.') next += char;
        else next += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      setOutput(next);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    timer.current = window.setTimeout(run, delay);
    return () => {
      window.clearTimeout(timer.current);
      cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className} onPointerEnter={run} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
