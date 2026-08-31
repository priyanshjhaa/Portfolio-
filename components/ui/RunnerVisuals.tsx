'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';
import type { RunnerObstacleKind } from '@/types/experience';

export type MascotState = 'idle' | 'running' | 'checkpoint';
export type ObstacleKind = RunnerObstacleKind;

const obstacleGlyphs: Record<ObstacleKind, string> = {
  bug: '!',
  api: '{}',
  queue: '::',
  deploy: '↑',
  tool: '+',
};

export function TechCreature({
  state = 'idle',
  className,
}: {
  state?: MascotState;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const isRunning = state === 'running' && !reduceMotion;

  return (
    <motion.svg
      viewBox="0 0 112 80"
      className={cn('runner-creature overflow-visible', className)}
      fill="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      animate={isRunning ? { y: [0, -2, 0] } : undefined}
      transition={isRunning ? { duration: 0.28, repeat: Infinity, ease: 'linear' } : undefined}
    >
      <path className="runner-creature-cable" d="M22 46H12V38H4V26" />
      <rect className="runner-creature-ink" x="24" y="24" width="58" height="38" rx="4" />
      <rect className="runner-creature-panel" x="32" y="32" width="40" height="20" rx="2" />
      <rect className="runner-creature-ink" x="78" y="31" width="18" height="24" rx="2" />
      <rect className="runner-creature-signal" x="86" y="36" width="5" height="5" />
      <rect className="runner-creature-signal" x="38" y="38" width="7" height="7" />
      <rect className="runner-creature-detail" x="51" y="38" width="14" height="3" />
      <rect className="runner-creature-detail" x="51" y="44" width="10" height="3" />
      <path className="runner-creature-ink" d="M52 24V14H74V20H82V24H52Z" />
      <rect className="runner-creature-signal" x="58" y="17" width="4" height="4" />
      <path className="runner-creature-antenna" d="M68 14V7H75" />
      <rect className="runner-creature-signal" x="74" y="4" width="5" height="5" />
      <motion.g
        animate={isRunning ? { x: [0, 8, 0] } : undefined}
        transition={isRunning ? { duration: 0.28, repeat: Infinity, ease: 'linear' } : undefined}
      >
        <path className="runner-creature-ink" d="M33 61H47V69H41V76H29V70H33V61Z" />
        <path className="runner-creature-ink" d="M65 61H79V70H84V76H70V70H65V61Z" />
      </motion.g>
      {state === 'checkpoint' && (
        <motion.path
          className="runner-creature-check"
          d="M91 18L97 24L108 10"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.45 }}
        />
      )}
    </motion.svg>
  );
}

export function PixelCloud({ className }: { className?: string }) {
  return (
    <span className={cn('runner-cloud', className)} aria-hidden="true">
      <span />
    </span>
  );
}

export function RunnerObstacle({
  kind,
  label,
  className,
}: {
  kind: ObstacleKind;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn('runner-obstacle', `runner-obstacle-${kind}`, className)} aria-hidden="true">
      <span className="runner-obstacle-glyph">{obstacleGlyphs[kind]}</span>
      <span className="runner-obstacle-label">{label}</span>
    </div>
  );
}

export function RunnerWorld({
  eyebrow,
  checkpoint,
  state = 'running',
  obstacles = [
    { kind: 'bug' as const, label: 'edge case' },
    { kind: 'api' as const, label: 'contract' },
    { kind: 'deploy' as const, label: 'ship' },
  ],
  className,
  mascotX,
  obstaclesX,
}: {
  eyebrow: string;
  checkpoint: string;
  state?: MascotState;
  obstacles?: Array<{ kind: ObstacleKind; label: string }>;
  className?: string;
  mascotX?: MotionValue<string>;
  obstaclesX?: MotionValue<string>;
}) {
  return (
    <div className={cn('runner-world', className)} aria-hidden="true">
      <div className="runner-world-hud">
        <span>{eyebrow}</span>
        <span>CHK / {checkpoint}</span>
      </div>
      <PixelCloud className="left-[15%] top-[30%]" />
      <PixelCloud className="right-[12%] top-[18%] scale-75 opacity-50" />
      <div className="runner-world-track" aria-hidden="true">
        <motion.div className="runner-world-mascot" style={{ x: mascotX }}>
          <TechCreature state={state} className="h-auto w-full" />
        </motion.div>
        <motion.div className="runner-world-obstacles" style={{ x: obstaclesX }}>
          {obstacles.map((obstacle, index) => (
            <RunnerObstacle key={`${obstacle.kind}-${obstacle.label}`} {...obstacle} className={index === 1 ? 'hidden sm:flex' : undefined} />
          ))}
        </motion.div>
      </div>
      <div className="runner-ground" aria-hidden="true" />
    </div>
  );
}
