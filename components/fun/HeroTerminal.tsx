'use client';

import { useEffect, useRef, useState } from 'react';
import { contact, projects } from '@/lib/data';

interface Line {
  cmd: string;
  out: () => string;
}

const istTime = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata', hour12: false }).format(new Date());

// Every line is backed by real data, no invented stats.
const lines: Line[] = [
  { cmd: 'ls ./systems', out: () => projects.map((project) => project.id).join('  ') },
  { cmd: 'cat stack.txt', out: () => 'TypeScript · Go · PostgreSQL · Redis · LLM tool loops' },
  { cmd: 'status --hiring', out: () => contact.availability.toLowerCase() },
  { cmd: "TZ=Asia/Kolkata date +'%H:%M'", out: () => `${istTime()} IST · ${contact.collaboration.toLowerCase()}` },
  { cmd: 'cat principles.yml | head -1', out: () => 'ai: proposes · humans: approve' },
];

const TYPE_MS = 42;
const HOLD_MS = 3400;
const ERASE_MS = 18;

/**
 * A single quiet terminal line under the hero headline that types through a few
 * true facts. Fixed height (no layout shift), pauses offscreen, static with reduced motion.
 */
export default function HeroTerminal() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(lines[0].cmd);
  const [output, setOutput] = useState(lines[0].out());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = 0;
    let visible = true;
    let i = 0;
    let phase: 'hold' | 'erase' | 'type' = 'hold';
    let chars = lines[0].cmd.length;

    const step = () => {
      if (!visible || document.hidden) {
        timer = window.setTimeout(step, 600);
        return;
      }
      const line = lines[i];
      if (phase === 'hold') {
        phase = 'erase';
        setOutput('');
        timer = window.setTimeout(step, ERASE_MS);
      } else if (phase === 'erase') {
        chars -= 1;
        setTyped(line.cmd.slice(0, Math.max(0, chars)));
        if (chars <= 0) {
          i = (i + 1) % lines.length;
          setIndex(i);
          phase = 'type';
        }
        timer = window.setTimeout(step, ERASE_MS);
      } else {
        chars += 1;
        setTyped(lines[i].cmd.slice(0, chars));
        if (chars >= lines[i].cmd.length) {
          setOutput(lines[i].out());
          phase = 'hold';
          timer = window.setTimeout(step, HOLD_MS);
        } else {
          timer = window.setTimeout(step, TYPE_MS + Math.random() * 40);
        }
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (ref.current) observer.observe(ref.current);
    timer = window.setTimeout(step, 2600);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const done = typed.length === lines[index].cmd.length;

  return (
    <div ref={ref} className="term" aria-hidden="true">
      <span className="term__prompt">~ %</span>
      <span className="term__cmd">{typed}</span>
      {done && output ? (
        <>
          <span className="term__arrow">→</span>
          <span className="term__out">{output}</span>
        </>
      ) : (
        <i className="term__cursor" />
      )}
    </div>
  );
}
