'use client';

import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types/project';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

// Mission-based framing
const missionMap: Record<string, string> = {
  codemap: 'Built to make complex codebases understandable.',
  execute: 'Built to turn intent into execution.',
  axiom: 'Built to reduce friction in freelance workflows.',
  cinematch: 'Built to understand real-world content discovery.',
};

export default function ProjectCard({ project, index, featured }: ProjectCardProps) {
  const getStatusInfo = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return { color: 'text-accent', bg: 'bg-accent', label: 'In Progress', border: 'border-accent/30' };
      case 'maintenance':
        return { color: 'text-yellow-500', bg: 'bg-yellow-500', label: 'Iterating', border: 'border-yellow-500/30' };
      case 'archived':
        return { color: 'text-text-muted', bg: 'bg-text-muted', label: 'Complete', border: 'border-[#2a2a2a]' };
      default:
        return { color: 'text-text-muted', bg: 'bg-text-muted', label: 'Unknown', border: 'border-[#2a2a2a]' };
    }
  };

  const status = getStatusInfo(project.status);
  const mission = missionMap[project.id];

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[28px] border transition-all duration-300 card-glow',
        featured
          ? 'panel-chrome border-accent/25 hover:border-accent/45 hover:-translate-y-1.5'
          : 'bg-[#0a0a0a]/90 border-white/6 hover:border-accent/24 hover:-translate-y-1'
      )}
      aria-labelledby={`project-${project.id}-title`}
    >
      {featured && (
        <>
          <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-accent/15 blur-2xl transition-all duration-300 group-hover:bg-accent/20" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/8 blur-2xl transition-all duration-300 group-hover:bg-accent/12" />
        </>
      )}

      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-accent/14 via-transparent to-accent/8 animate-pulse" style={{ animationDuration: '3s' }} />
      </div>

      {featured && (
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
      )}

      <div className={cn(
        'relative flex flex-col items-start gap-3 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6',
        featured ? 'border-white/8 bg-gradient-to-b from-[#101010] to-transparent' : 'border-white/6 bg-gradient-to-b from-white/[0.03] to-transparent'
      )}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={cn('w-2 h-2 rounded-full', status.bg)} />
            <div className={cn('absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-50', status.bg)} />
            {featured && <div className={cn('absolute -inset-2 rounded-full blur-md', status.bg, 'opacity-30')} />}
          </div>
          <h3
            id={`project-${project.id}-title`}
            className={cn(
              'font-display font-semibold uppercase tracking-[0.08em] text-text-primary transition-all duration-300 group-hover:text-accent',
              featured ? 'text-2xl md:text-[2rem]' : 'text-xl'
            )}
          >
            {project.name}
          </h3>
        </div>
        <span className={cn(
          'rounded-md border bg-[#111111] px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.22em]',
          status.color,
          status.border
        )}>
          {status.label}
        </span>
      </div>

      <div className="relative p-5 sm:p-6">
        {mission && (
          <div className={cn(
            'mb-6 rounded-2xl border px-4 py-4',
            featured ? 'border-accent/14 bg-accent/[0.06]' : 'border-white/6 bg-white/[0.02]'
          )}>
            <p className="mb-2 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">Why</p>
            <p className="text-sm leading-relaxed text-text-secondary">{mission}</p>
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
            <p className="mb-2 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">Problem</p>
            <p className="text-sm leading-relaxed text-text-secondary">{project.problem}</p>
          </div>
          <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
            <p className="mb-2 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">Approach</p>
            <p className="text-sm leading-relaxed text-text-secondary">{project.approach}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-3 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/6 bg-[#111111] px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 group-hover:border-accent/30 group-hover:bg-accent/8 group-hover:text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 border-t border-white/6 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-text-muted transition-all hover:text-accent"
            >
              <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-text-muted transition-all hover:text-accent"
            >
              <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
              Live
            </a>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-b-xl" />
      </div>
    </article>
  );
}
