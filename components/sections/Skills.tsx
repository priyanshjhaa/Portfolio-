'use client';

import { useEffect, useRef, useState } from 'react';
import { sectionCopy, skillGroups } from '@/lib/data';
import type { Skill, SkillGroup } from '@/types/skill';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  skill: Skill;
  delay: number;
}

function SkillBar({ skill, delay }: SkillBarProps) {
  const [animate, setAnimate] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimate(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div className="group" ref={barRef}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent md:text-xs">
          {skill.name}
        </span>
        <span className="font-display text-[10px] uppercase tracking-[0.2em] text-text-muted">
          {skill.level}
        </span>
      </div>
      <div className="h-2 rounded-full border border-white/6 bg-[#121212] overflow-hidden">
        <div
          className={cn(
            'relative h-full rounded-full bg-gradient-to-r from-accent/55 via-accent to-[#9dffb0] transition-all duration-1000 ease-out',
            animate && 'skill-bar-animate'
          )}
          style={{ width: animate ? `${skill.level}%` : '0%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-white/25 to-transparent" />
        </div>
      </div>
    </div>
  );
}

interface SkillCardProps {
  group: SkillGroup;
  index: number;
}

function SkillCard({ group, index }: SkillCardProps) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'panel-chrome relative overflow-hidden rounded-[28px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 md:p-6',
        !visible && 'opacity-0 translate-y-4'
      )}
    >
      <div className="absolute inset-0 topographic-pattern opacity-10 pointer-events-none" />

      <div className="relative mb-5 md:mb-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="h-9 w-9 rounded-xl border border-accent/15 bg-accent/10" />
          <div className="rounded-md border border-white/6 bg-black/20 px-2 py-1 font-display text-[9px] uppercase tracking-[0.18em] text-text-muted">
            Module {index + 1}
          </div>
        </div>
        <p className="mb-1 font-display text-xs uppercase tracking-[0.24em] text-accent md:text-sm">
          {group.category}
        </p>
        <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
          {group.description}
        </p>
      </div>

      <div className="space-y-3 md:space-y-4 relative">
        {group.skills.map((skill, skillIndex) => (
          <SkillBar key={skill.id} skill={skill} delay={skillIndex * 100} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-shell relative overflow-hidden px-4 py-20 md:py-28"
    >
      <div className="absolute inset-0 grid-pattern opacity-20 md:opacity-35" />
      <div className="absolute inset-0 topographic-pattern opacity-15 pointer-events-none" />
      <div className="ambient-orb bottom-[14%] right-[8%] h-[340px] w-[340px] opacity-45 md:h-[500px] md:w-[500px]" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="mb-10 md:mb-16">
          <p className="section-kicker mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-sm bg-accent" />
            {sectionCopy.skills.eyebrow}
          </p>
          <h2 className="section-heading mb-4">{sectionCopy.skills.title}</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
            {sectionCopy.skills.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.category} group={group} index={index} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/6 bg-white/[0.025] px-4 py-4">
            <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">{sectionCopy.skills.updateTitle}</p>
            <p className="mt-2 text-sm text-text-secondary">{sectionCopy.skills.updateText}</p>
          </div>
          <div className="rounded-2xl border border-white/6 bg-white/[0.025] px-4 py-4">
            <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">{sectionCopy.skills.ruleTitle}</p>
            <p className="mt-2 text-sm text-text-secondary">{sectionCopy.skills.ruleText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
