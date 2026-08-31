'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function MotionReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function KineticWords({ words, className }: { words: string[]; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % words.length), 2100);
    return () => window.clearInterval(interval);
  }, [reduceMotion, words.length]);

  return (
    <span className={cn('relative inline-grid overflow-hidden align-bottom', className)} aria-label={words.join(', ')}>
      <span className="invisible col-start-1 row-start-1">workflow architect</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden="true"
          className="col-start-1 row-start-1"
          initial={reduceMotion ? false : { y: '85%', opacity: 0, rotate: 2 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={reduceMotion ? undefined : { y: '-85%', opacity: 0, rotate: -2 }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function PointerParallax({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);

  return (
    <motion.div
      className={className}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType === 'touch') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.25 });

  return (
    <motion.div
      className={className}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType === 'touch') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export { AnimatePresence, motion, useReducedMotion };
