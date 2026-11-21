'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useCalmMotion } from './useCalmMotion';

/**
 * The back-most layer: a few soft colour fields that breathe on a long loop
 * and drift slowly as you read down the page. Kept far below text contrast.
 */
export default function AmbientField() {
  const enabled = useCalmMotion(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const aY = useTransform(progress, [0, 1], ['0vh', '60vh']);
  const bY = useTransform(progress, [0, 1], ['0vh', '-40vh']);
  const cX = useTransform(progress, [0, 1], ['0vw', '-18vw']);

  return (
    <div className="ambient" aria-hidden="true">
      <motion.span className="ambient__blob ambient__blob--a" style={enabled ? { y: aY } : undefined} />
      <motion.span className="ambient__blob ambient__blob--b" style={enabled ? { y: bY } : undefined} />
      <motion.span className="ambient__blob ambient__blob--c" style={enabled ? { x: cX } : undefined} />
    </div>
  );
}
