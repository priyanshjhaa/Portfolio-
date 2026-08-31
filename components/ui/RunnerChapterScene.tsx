'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { RunnerWorld, type MascotState } from '@/components/ui/RunnerVisuals';
import type { RunnerScene } from '@/types/experience';
import { cn } from '@/lib/utils';

export default function RunnerChapterScene({
  scene,
  className,
  compact = false,
}: {
  scene: RunnerScene;
  className?: string;
  compact?: boolean;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MascotState>('idle');
  const [compactViewport, setCompactViewport] = useState(false);
  const reduceMotion = useReducedMotion();
  const motionDisabled = Boolean(reduceMotion || compactViewport);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start 92%', 'end 22%'] });
  const mascotX = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], ['0%', '16%', '190%', '220%']);
  const obstaclesX = useTransform(scrollYProgress, [0, 1], ['4%', '-16%']);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (motionDisabled) return;
    const nextState: MascotState = progress < 0.08 ? 'idle' : progress > 0.86 ? 'checkpoint' : 'running';
    setState((current) => current === nextState ? current : nextState);
  });

  useEffect(() => {
    if (motionDisabled) setState('checkpoint');
  }, [motionDisabled]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const syncViewport = () => setCompactViewport(media.matches);
    syncViewport();
    media.addEventListener('change', syncViewport);
    return () => media.removeEventListener('change', syncViewport);
  }, []);

  return (
    <div ref={sceneRef} data-complete={reduceMotion || undefined} className={cn('runner-chapter-scene', compact && 'runner-chapter-scene-compact', className)}>
      <RunnerWorld
        eyebrow={scene.eyebrow}
        checkpoint={scene.checkpoint}
        obstacles={scene.obstacles}
        state={state}
        mascotX={motionDisabled ? undefined : mascotX}
        obstaclesX={motionDisabled ? undefined : obstaclesX}
      />
    </div>
  );
}
