'use client';

import Image from 'next/image';
import { ArrowUpRight, Github, PanelTopOpen } from 'lucide-react';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ProjectsProps {
  active?: boolean;
  onOpenProject: (projectId: string) => void;
}

export default function Projects({ active = false, onOpenProject }: ProjectsProps) {
  const featuredProject = projects.find((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  const renderCard = (project: typeof projects[number], featured = false) => (
    <article
      key={project.id}
      className={cn(
        'group rounded-[28px] border border-white/8 bg-[#0b0b0b]/92 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 md:p-6',
        featured && 'shadow-[0_28px_70px_-48px_rgba(76,175,80,0.34)]'
      )}
    >
      {project.image && (
        <button
          type="button"
          onClick={() => onOpenProject(project.id)}
          className="relative block aspect-[16/9] w-full overflow-hidden rounded-[20px] border border-white/8 bg-black/40 text-left"
          aria-label={`Open ${project.name} case study`}
        >
          <Image
            src={project.image}
            alt={`${project.name} product preview`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
            sizes={featured ? '(max-width: 1120px) 100vw, 1120px' : '(max-width: 768px) 100vw, 360px'}
            priority={featured}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.18em] text-text-primary backdrop-blur-md">
            {featured ? 'Featured build' : project.status}
          </div>
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/70 px-3 py-2 font-display text-[9px] uppercase tracking-[0.16em] text-text-primary opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            View case study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </button>
      )}

      <div className="mt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-[0.04em] text-text-primary">
              {project.name}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-text-primary md:text-lg">
              {project.summary}
            </p>
          </div>
          <span className="hidden shrink-0 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.16em] text-text-muted sm:block">
            {project.status}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
          {project.details}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.14em] text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => onOpenProject(project.id)}
            className="inline-flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-accent/18 bg-accent/[0.08] px-4 py-2.5 font-display text-xs uppercase tracking-[0.16em] text-accent transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.12] sm:justify-center"
          >
            Case Study
            <PanelTopOpen className="h-4 w-4" />
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 font-display text-xs uppercase tracking-[0.16em] text-text-primary transition-all duration-300 hover:border-accent/20 hover:text-accent sm:justify-center"
            >
              Live
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 font-display text-xs uppercase tracking-[0.16em] text-text-primary transition-all duration-300 hover:border-accent/20 hover:text-accent sm:justify-center"
            >
              GitHub
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <section className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(76,175,80,0.07),transparent_24%)] pointer-events-none" />
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent transition-opacity duration-500 pointer-events-none ${active ? 'opacity-100' : 'opacity-40'}`} />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-12 max-w-3xl">
          <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            Selected Work
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[0.04em] text-text-primary md:text-5xl">
            Products I have designed, built, and shipped.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            Each case study covers the product, the engineering decisions behind it, and the system that makes it work.
          </p>
        </div>

        <div className="space-y-6">
          {featuredProject && renderCard(featuredProject, true)}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {otherProjects.map((project) => renderCard(project))}
          </div>
        </div>
      </div>
    </section>
  );
}
