'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useCalmMotion } from './useCalmMotion';

type Props = {
  children: ReactNode;
  /** Pixels of travel either side of rest. Positive = moves slower than the page (sits further back). */
  distance?: number;
  /** Fade toward this opacity as the element leaves the top of the viewport. */
  fadeTo?: number;
  className?: string;
};

/**
 * Moves its child a little against the scroll so it reads as a separate
 * depth layer. Static on small screens and with reduced motion.
 */
export default function Parallax({ children, distance = 28, fadeTo, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });
  const y = useTransform(smooth, [0, 1], [-distance, distance]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, fadeTo ?? 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={enabled ? { y, opacity: fadeTo === undefined ? undefined : opacity } : undefined}
    >
      {children}
    </motion.div>
  );
}
