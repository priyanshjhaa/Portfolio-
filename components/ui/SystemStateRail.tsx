'use client';

import { cn } from '@/lib/utils';

interface SystemStateRailProps {
  activeSection: string;
}

const sectionState = {
  hero: {
    label: 'Core Online',
    title: 'Execution systems live',
    detail: 'Positioning, architecture, and operating mode are active.',
  },
  building: {
    label: 'Currently Shipping',
    title: 'Live engineering focus',
    detail: 'Current work is centered on shipping reliability, retrieval, and architecture clarity.',
  },
  receipts: {
    label: 'Engineering Receipts',
    title: 'Concrete build evidence',
    detail: 'Architecture decisions, queue systems, and retrieval pipelines are surfaced directly.',
  },
  projects: {
    label: 'Mission Feed',
    title: 'Selected systems',
    detail: 'Dive into architecture, tradeoffs, and shipped surfaces.',
  },
  recent: {
    label: 'Shipping Timeline',
    title: 'Recent build log',
    detail: 'A running log of recent changes, experiments, and product momentum.',
  },
  process: {
    label: 'Operating Model',
    title: 'Build methodology',
    detail: 'Reliability, speed, and system design shape the workflow.',
  },
  contact: {
    label: 'Channel Open',
    title: 'Outbound links live',
    detail: 'Fastest routes to reach out or inspect the codebase.',
  },
} as const;

export default function SystemStateRail({ activeSection }: SystemStateRailProps) {
  const state = sectionState[activeSection as keyof typeof sectionState] ?? sectionState.hero;

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden w-72 -translate-y-1/2 xl:block">
      <div className="rounded-[28px] border border-white/8 bg-[#0E1426]/88 p-4 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.95)] backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent/80">
              System State
            </p>
            <p className="mt-2 font-display text-lg uppercase tracking-[0.08em] text-text-primary">
              {state.label}
            </p>
          </div>
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-accent shadow-[0_0_18px_rgba(79,124,255,0.55)]" />
            <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4">
          <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
            Active Zone
          </p>
          <p className="mt-2 text-base font-semibold text-text-primary">{state.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{state.detail}</p>
        </div>

        <div className="mt-4 grid gap-2">
          {Object.keys(sectionState).map((key) => (
            <div
              key={key}
              className={cn(
                'rounded-xl border px-3 py-2 font-display text-[10px] uppercase tracking-[0.18em] transition-all duration-300',
                key === activeSection
                  ? 'border-accent/20 bg-accent/10 text-accent'
                  : 'border-white/6 bg-white/[0.02] text-text-muted'
              )}
            >
              {sectionState[key as keyof typeof sectionState].label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
