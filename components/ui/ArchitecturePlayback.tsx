'use client';

import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Project } from '@/types/project';
import { cn } from '@/lib/utils';

interface ArchitecturePlaybackProps {
  project: Project;
}

export default function ArchitecturePlayback({ project }: ArchitecturePlaybackProps) {
  const stages =
    project.architectureStages ??
    (project.flowSteps ?? []).map((label) => ({
      label,
      description: `The system moves through ${label.toLowerCase()} as part of the product workflow.`,
      safeguard: 'Keeps this boundary visible and independently inspectable.',
    }));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setIsPlaying(false);
  }, [project.id]);

  useEffect(() => {
    if (!isPlaying || stages.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current === stages.length - 1) {
          setIsPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1500);

    return () => window.clearInterval(interval);
  }, [isPlaying, stages.length]);

  if (!stages.length) return null;

  const activeStage = stages[activeIndex];
  const progress = stages.length === 1 ? 100 : (activeIndex / (stages.length - 1)) * 100;

  return (
    <div className="premium-surface mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-[#10110f]/84">
      <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#b7c6aa] shadow-[0_0_16px_rgba(183,198,170,.45)]" />
          <p className="font-display text-[8px] uppercase tracking-[0.18em] text-text-muted">
            Interactive execution trace
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (activeIndex === stages.length - 1) setActiveIndex(0);
            setIsPlaying((current) => !current);
          }}
          className="premium-action inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full border border-white/10 px-4 font-display text-[8px] uppercase tracking-[0.16em] text-text-secondary hover:border-[#b7c6aa]/35 hover:text-text-primary sm:self-auto"
          aria-label={isPlaying ? 'Pause architecture playback' : 'Play architecture walkthrough'}
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {isPlaying ? 'Pause trace' : activeIndex === stages.length - 1 ? 'Replay trace' : 'Play trace'}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-b border-white/8 p-5 md:p-8 lg:border-b-0 lg:border-r">
          <div className="relative">
            <div className="absolute left-4 top-4 h-[calc(100%-2rem)] w-px bg-white/10 md:left-4 md:right-4 md:top-4 md:h-px md:w-auto">
              <span
                className="block h-full w-px origin-top scale-y-[var(--trace-scale)] bg-[#b7c6aa]/70 transition-transform duration-500 ease-[var(--ease-premium)] md:h-px md:w-full md:origin-left md:scale-x-[var(--trace-scale)] md:scale-y-100"
                style={{ '--trace-scale': progress / 100 } as React.CSSProperties}
              />
            </div>

            <div className="relative grid gap-3 md:grid-cols-5">
              {stages.map((stage, index) => {
                const isActive = index === activeIndex;
                const isComplete = index < activeIndex;

                return (
                  <button
                    key={`${stage.label}-${index}`}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveIndex(index);
                    }}
                    className={cn(
                      'premium-action group grid min-h-16 grid-cols-[32px_1fr] items-center gap-3 rounded-2xl border px-3 py-2 text-left md:min-h-32 md:grid-cols-1 md:content-between md:gap-7',
                      isActive
                        ? 'border-[#b7c6aa]/35 bg-[#b7c6aa]/[0.07]'
                        : 'border-transparent hover:border-white/10 hover:bg-white/[0.025]'
                    )}
                    aria-pressed={isActive}
                  >
                    <span
                      className={cn(
                        'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-[#10110f] font-display text-[8px] transition',
                        isActive
                          ? 'scale-110 border-[#b7c6aa] text-[#dfe7d7] shadow-[0_0_22px_rgba(183,198,170,.28)]'
                          : isComplete
                            ? 'border-[#b7c6aa]/55 text-[#b7c6aa]'
                            : 'border-white/15 text-text-muted'
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={cn('text-sm leading-snug transition', isActive ? 'text-text-primary' : 'text-text-muted group-hover:text-text-secondary')}>
                      {stage.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex min-h-[280px] flex-col justify-between p-6 md:p-8" aria-live="polite">
          <div>
            <p className="field-label">Stage {String(activeIndex + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}</p>
            <h3 className="mt-4 font-editorial text-4xl tracking-[-0.035em] text-text-primary">
              {activeStage.label}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-text-secondary">{activeStage.description}</p>
          </div>
          <div className="mt-8 border-l border-[#b7c6aa]/30 pl-4">
            <p className="field-label text-[#b7c6aa]">Boundary protected</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{activeStage.safeguard}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
