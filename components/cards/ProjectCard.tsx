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
        'group relative bg-[#0a0a0a] border rounded-xl overflow-hidden transition-all duration-400 card-glow',
        featured ? 'border-accent/30 hover:border-accent/50' : 'border-[#1a1a1a] hover:border-accent/40',
        'hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10'
      )}
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* Featured glow */}
      {featured && (
        <>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/15 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-400" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/8 rounded-full blur-2xl group-hover:bg-accent/12 transition-all duration-400" />
        </>
      )}

      {/* Animated border glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/15 via-transparent to-accent/8 animate-pulse" style={{ animationDuration: '3s' }} />
      </div>

      {/* Top accent line */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
      )}

      {/* Card Header */}
      <div className="px-6 py-5 border-b border-[#1a1a1a] flex items-center justify-between relative bg-gradient-to-b from-[#0f0f0f] to-transparent">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={cn('w-2 h-2 rounded-full', status.bg)} />
            <div className={cn('absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-50', status.bg)} />
            {featured && <div className={cn('absolute -inset-2 rounded-full blur-md', status.bg, 'opacity-30')} />}
          </div>
          <h3
            id={`project-${project.id}-title`}
            className="text-xl font-bold text-text-primary group-hover:text-accent transition-all duration-300 group-hover:scale-105"
          >
            {project.name}
          </h3>
        </div>
        <span className={cn(
          'text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md bg-[#111111] border',
          status.color,
          status.border
        )}>
          {status.label}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 relative">
        {/* Mission - why this exists */}
        {mission && (
          <div className="mb-6 pb-5 border-b border-[#1a1a1a]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Why</p>
            <p className="text-sm text-text-secondary leading-relaxed">{mission}</p>
          </div>
        )}

        {/* Problem & Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 pb-5 border-b border-[#1a1a1a]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Problem</p>
            <p className="text-sm text-text-secondary leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Approach</p>
            <p className="text-sm text-text-secondary leading-relaxed">{project.approach}</p>
          </div>
        </div>

        {/* Stack */}
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-3">Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-[#111111] text-text-secondary rounded-md border border-[#1a1a1a] group-hover:border-accent/40 group-hover:text-accent group-hover:bg-accent/8 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 pt-4 border-t border-[#1a1a1a]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-all text-xs font-bold uppercase tracking-wider group/link"
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
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-all text-xs font-bold uppercase tracking-wider group/link"
            >
              <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
              Live
            </a>
          )}
        </div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-b-xl" />
      </div>
    </article>
  );
}
