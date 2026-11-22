'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useCalmMotion } from './useCalmMotion';

/**
 * A thin vertical trace that draws itself as its parent scrolls past the
 * reading line, with a soft signal dot riding the tip. Place inside a
 * `position: relative` container.
 */
export default function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const top = useTransform(progress, (value) => `${value * 100}%`);

  return (
    <div ref={ref} className={['drawline', className].filter(Boolean).join(' ')} aria-hidden="true">
      <span className="drawline__track" />
      <motion.span className="drawline__fill" style={{ scaleY: enabled ? progress : 1 }} />
      {enabled && <motion.span className="drawline__head" style={{ top }} />}
    </div>
  );
}
