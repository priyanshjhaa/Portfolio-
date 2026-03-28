'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, Rocket, Code, CheckCircle } from 'lucide-react';
import { sectionCopy, timeline } from '@/lib/data';
import type { TimelineEntry } from '@/types/skill';
import { cn } from '@/lib/utils';

const iconMap = {
  GraduationCap,
  Briefcase,
  Rocket,
  Code,
  CheckCircle,
};

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const [visible, setVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        if (observerEntry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 90);
        }
      },
      { threshold: 0.15 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const Icon = iconMap[entry.icon];

  return (
    <div
      ref={itemRef}
      className={cn(
        'relative pl-12 pb-8 md:pl-20 md:pb-10',
        !visible && 'opacity-0 translate-y-4',
        visible && 'timeline-item-animate'
      )}
    >
      <div className="absolute left-0 top-1">
        <div
          className={cn(
            'relative flex h-8 w-8 items-center justify-center rounded-full border-2 bg-[#0a0a0a] md:h-10 md:w-10',
            entry.completed ? 'border-accent checkpoint-marker' : 'border-white/12 shadow-[0_0_0_8px_rgba(255,255,255,0.02)]'
          )}
        >
          {entry.completed ? (
            <>
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-md" />
              <Icon className="relative z-10 h-3.5 w-3.5 text-accent md:h-4 md:w-4" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 rounded-full bg-accent/8 blur-md" />
              <Icon className="relative z-10 h-3.5 w-3.5 text-text-muted md:h-4 md:w-4" />
            </>
          )}
        </div>
      </div>

      <div
        className={cn(
          'relative overflow-hidden rounded-[28px] border p-5 transition-all duration-300 hover:-translate-y-1 md:p-6',
          entry.completed
            ? 'panel-chrome border-accent/16 hover:border-accent/28'
            : 'bg-[#0a0a0a]/92 border-white/8 hover:border-accent/20'
        )}
      >
        {!entry.completed && (
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/0 via-accent/35 to-accent/0" />
        )}

        {entry.completed && (
          <div className="absolute right-4 top-4 rounded-md border border-accent/20 bg-accent/10 px-2 py-1">
            <span className="font-display text-[8px] uppercase tracking-[0.2em] text-accent">Complete</span>
          </div>
        )}

        <div className="relative">
          <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent">{entry.period}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.08em] text-text-primary">
            {entry.title}
          </h3>
          {entry.organization && (
            <p className="mt-1 text-sm text-text-muted">{entry.organization}</p>
          )}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary md:text-base">
            {entry.description}
          </p>
        </div>
      </div>

      <div className="absolute left-4 top-10 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/35 via-accent/10 to-transparent md:left-5" />
    </div>
  );
}

export default function Timeline() {
  const completedCount = timeline.filter((entry) => entry.completed).length;

  return (
    <section className="section-shell section-shell-alt relative overflow-hidden px-4 py-20 md:py-28">
      <div className="absolute inset-0 grid-pattern opacity-20 md:opacity-32" />
      <div className="ambient-orb left-[4%] top-[18%] h-[320px] w-[320px] opacity-45 md:h-[460px] md:w-[460px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-sm bg-accent" />
              {sectionCopy.timeline.eyebrow}
            </p>
            <h2 className="section-heading mb-4">{sectionCopy.timeline.title}</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
              {sectionCopy.timeline.description}
            </p>
          </div>

          <div className="rounded-2xl border border-white/6 bg-white/[0.025] px-4 py-3">
            <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">{sectionCopy.timeline.progressTitle}</p>
            <p className="mt-2 font-display text-2xl font-semibold uppercase tracking-[0.08em] text-accent">
              {completedCount}/{timeline.length}
            </p>
          </div>
        </div>

        <div className="relative">
          {timeline.map((entry, index) => (
            <TimelineItem key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
