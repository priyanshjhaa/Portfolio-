'use client';

import { useEffect, useRef, useState } from 'react';
import { skillGroups } from '@/lib/data';
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
      <div className="flex items-center mb-1.5 md:mb-2">
        <span className="text-[11px] md:text-xs font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
          {skill.name}
        </span>
      </div>
      <div className="h-1 md:h-1.5 bg-[#121212] rounded-full overflow-hidden border border-[#1a1a1a]">
        <div
          className={cn(
            'h-full bg-gradient-to-r from-accent/60 to-accent/80 rounded-full relative transition-all duration-1000 ease-out',
            animate && 'skill-bar-animate'
          )}
          style={{ width: animate ? `${skill.level}%` : '0%' }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 md:w-4 bg-gradient-to-l from-white/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
        'p-4 md:p-6 bg-[#080808] border border-[#1a1a1a] rounded-xl relative overflow-hidden transition-all duration-300 hover:border-accent/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5',
        !visible && 'opacity-0 translate-y-4'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] md:from-accent/[0.04] to-transparent pointer-events-none" />

      {/* Category Header */}
      <div className="relative mb-4 md:mb-6">
        <p className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-wider mb-1">
          {group.category}
        </p>
        <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-text-muted">
          {group.description}
        </p>
      </div>

      {/* Skills in category */}
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
      className="py-16 md:py-24 px-4 border-t border-[#1a1a1a] relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-25 md:opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/3 md:bg-accent/4 rounded-full blur-[80px] md:blur-[120px] pointer-events-none glow-pulse" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-accent mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent rounded-sm" />
            Skill Tree
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-3 md:mb-4">
            Build Stats
          </h2>
          <p className="text-text-muted text-xs md:text-sm">
            Perks unlocked across all territories
          </p>
        </div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.category} group={group} index={index} />
          ))}
        </div>

        {/* Last updated line */}
        <div className="mt-6 md:mt-8 flex items-center justify-center gap-2">
          <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
          <p className="text-[10px] md:text-xs text-text-muted">
            Last update: Actively building
          </p>
        </div>

        {/* Gaming-themed footer */}
        <div className="mt-8 md:mt-12 flex items-center justify-center gap-2 md:gap-3">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent/50 rounded-full" />
          <p className="text-xs md:text-sm text-text-muted">
            Shipping, then iterating.
          </p>
        </div>
      </div>
    </section>
  );
}
