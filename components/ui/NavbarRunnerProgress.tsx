'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { TechCreature } from '@/components/ui/RunnerVisuals';
import { cn } from '@/lib/utils';

const checkpoints = ['intro', 'skills', 'process', 'work', 'evidence', 'contact'] as const;

export default function NavbarRunnerProgress({ activeSection }: { activeSection: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const runnerLeft = useTransform(scrollYProgress, [0, 1], ['1.5%', '98.5%']);
  const [positions, setPositions] = useState<number[]>([0, 20, 40, 60, 80, 100]);
  const activeId = activeSection.replace('#', '');
  const activeIndex = Math.max(0, checkpoints.indexOf(activeId as (typeof checkpoints)[number]));
  const staticProgress = positions[activeIndex] ?? 0;

  useEffect(() => {
    const measure = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setPositions(checkpoints.map((id) => {
        const section = document.getElementById(id);
        if (!section) return 0;
        return Math.min(100, Math.max(0, (section.offsetTop / maxScroll) * 100));
      }));
    };

    measure();
    window.addEventListener('resize', measure);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    const timer = window.setTimeout(measure, 800);
    return () => {
      window.removeEventListener('resize', measure);
      resizeObserver.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      className="navbar-runner"
      initial={reduceMotion ? false : { opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="navbar-runner-track">
        <motion.span
          className="navbar-runner-fill"
          style={reduceMotion ? { width: `${staticProgress}%` } : { scaleX: scrollYProgress }}
        />
        {checkpoints.map((checkpoint, index) => (
          <span
            key={checkpoint}
            className={cn('navbar-runner-checkpoint', index <= activeIndex && 'is-reached', index === activeIndex && 'is-active')}
            style={{ left: `${positions[index]}%` }}
          />
        ))}
        <motion.span
          className="navbar-runner-mascot"
          style={{ left: reduceMotion ? `${staticProgress}%` : runnerLeft }}
        >
          <TechCreature state={activeId === 'contact' ? 'checkpoint' : 'idle'} className="h-auto w-full" />
        </motion.span>
      </div>
      <span className="navbar-runner-status">RUN / {String(activeIndex).padStart(2, '0')} — {activeId}</span>
    </motion.div>
  );
}
