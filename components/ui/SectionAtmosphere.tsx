'use client';

import type { CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from '@/components/ui/LabMotion';

export default function SectionAtmosphere({ tone, pattern = 'grid' }: { tone: string; pattern?: 'grid' | 'nodes' | 'dots' }) {
  const reduced = useReducedMotion();
  return <div className={`chapter-atmosphere chapter-atmosphere--${pattern}`} style={{ '--chapter-tone': tone } as CSSProperties} aria-hidden="true">
    <AnimatePresence initial={false}>
      <motion.div key={tone} className="chapter-light" style={{ '--chapter-tone': tone } as CSSProperties} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.7 }} />
    </AnimatePresence>
    <div className="chapter-pattern" />
  </div>;
}
