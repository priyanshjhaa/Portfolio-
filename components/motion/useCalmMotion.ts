'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * True when decorative motion should run: the visitor hasn't asked for
 * reduced motion and the viewport is wide enough for depth effects to read.
 * Starts false so server and first client render match (static layout).
 */
export function useCalmMotion(minWidth = 768) {
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setWide(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [minWidth]);

  return wide && !reduced;
}
