'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, Rocket, Code, CheckCircle } from 'lucide-react';
import { timeline } from '@/lib/data';
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100);
        }
      },
      { threshold: 0.2 }
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
        'relative pl-10 pb-8 md:pl-16 md:pb-10',
        !visible && 'opacity-0'
      )}
    >
      {/* Timeline marker */}
      <div className="absolute left-0 top-1">
        <div
          className={cn(
            'relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#0a0a0a] border-2 transition-all duration-300',
            entry.completed
              ? 'border-accent checkpoint-marker'
              : 'border-[#2a2a2a]'
          )}
        >
          {entry.completed ? (
            <Icon className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-accent" />
          ) : (
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-text-muted/50 rounded-full" />
          )}
        </div>
      </div>

      {/* Timeline card */}
      <div
        className={cn(
          'p-4 md:p-5 bg-[#0a0a0a] border rounded-xl relative overflow-hidden transition-all duration-300',
          entry.completed
            ? 'border-accent/20 hover:border-accent/35'
            : 'border-[#1a1a1a] hover:border-accent/30',
          'hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5'
        )}
      >
        {/* Inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] md:from-accent/[0.03] to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300" />

        {/* Completion badge */}
        {entry.completed && (
          <div className="absolute top-2 right-2 md:top-3 md:right-3 px-1.5 md:px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-md">
            <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-wider text-accent">
              Complete
            </span>
          </div>
        )}

        <div className="relative">
          {/* Period */}
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-accent mb-1.5 md:mb-2">
            {entry.period}
          </p>

          {/* Title */}
          <h3 className="text-base md:text-lg font-bold text-text-primary mb-0.5 md:mb-1">
            {entry.title}
          </h3>

          {/* Organization */}
          {entry.organization && (
            <p className="text-xs md:text-sm text-text-muted mb-2 md:mb-3">
              {entry.organization}
            </p>
          )}

          {/* Description */}
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
            {entry.description}
          </p>
        </div>
      </div>

      {/* Connector line */}
      <div className="absolute left-3 md:left-5 top-7 md:top-8 w-0.5 h-[calc(100%-0.5rem)] bg-gradient-to-b from-accent/15 to-transparent" />
    </div>
  );
}

export default function Timeline() {
  const completedCount = timeline.filter((e) => e.completed).length;

  return (
    <section
      id="timeline"
      className="py-16 md:py-24 px-4 border-t border-[#1a1a1a] relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-25 md:opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/3 md:bg-accent/4 rounded-full blur-[80px] md:blur-[120px] pointer-events-none glow-pulse" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10 md:mb-14">
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-accent mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent rounded-sm" />
            Mission Log
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-3 md:mb-4">
            Career Progression
          </h2>
          <p className="text-text-muted text-xs md:text-sm">
            Checkpoints cleared. Missions accomplished.
          </p>
        </div>

        {/* Timeline items */}
        <div className="relative">
          {timeline.map((entry, index) => (
            <TimelineItem key={entry.id} entry={entry} index={index} />
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-6 md:mt-8 p-3 md:p-4 bg-[#080808] border border-[#1a1a1a] rounded-lg inline-flex items-center gap-2 md:gap-3 hover:border-accent/20 transition-all duration-300">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full animate-pulse" />
          <p className="text-[10px] md:text-xs text-text-muted">
            Mission Progress:{' '}
            <span className="text-accent font-bold ml-1">
              {completedCount}/{timeline.length}
            </span>{' '}
            Complete
          </p>
        </div>
      </div>
    </section>
  );
}
