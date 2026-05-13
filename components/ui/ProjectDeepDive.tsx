'use client';

import { useEffect } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectDeepDiveProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDeepDive({ project, onClose }: ProjectDeepDiveProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  if (!project) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 py-12 md:py-20">
      <button
        type="button"
        aria-label="Close project deep dive"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[34px] border border-white/8 bg-[#090909]/96 shadow-[0_36px_100px_-48px_rgba(0,0,0,0.96)]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.1] via-transparent to-white/[0.02] pointer-events-none" />
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent pointer-events-none" />

        <div className="relative flex items-start justify-between gap-4 border-b border-white/6 px-5 py-5 md:px-7">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent/80">
              Build Deep Dive
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[0.05em] text-text-primary md:text-4xl">
              {project.name}
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              {project.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-text-secondary transition-colors hover:border-accent/20 hover:text-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative grid gap-6 px-5 py-5 md:grid-cols-[1.15fr_0.85fr] md:px-7 md:py-7">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/6 bg-black/25 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                    System Brief
                  </p>
                  <p className="mt-2 font-display text-xl uppercase tracking-[0.08em] text-text-primary">
                    {project.impact ?? project.details}
                  </p>
                </div>
                <div className="rounded-xl border border-accent/20 bg-accent/10 px-3 py-2 font-display text-[10px] uppercase tracking-[0.22em] text-accent">
                  {project.status}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {(project.highlightMetrics ?? []).map((metric) => (
                  <div
                    key={metric}
                    className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 font-display text-[11px] uppercase tracking-[0.18em] text-text-secondary"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/6 bg-white/[0.02] p-5">
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                  Problem
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                  {project.problem}
                </p>
              </div>

              <div className="rounded-[24px] border border-white/6 bg-white/[0.02] p-5">
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                  Approach
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                  {project.approach}
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/6 bg-white/[0.02] p-5">
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Architecture Notes
              </p>
              <div className="mt-4 space-y-3">
                {(project.architectureNotes ?? []).map((note, index) => (
                  <div
                    key={note}
                    className="rounded-2xl border border-white/6 bg-black/20 px-4 py-3"
                  >
                    <p className="font-display text-[10px] uppercase tracking-[0.2em] text-accent/80">
                      Node 0{index + 1}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[28px] border border-white/6 bg-black/25 p-5">
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Build Stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.18em] text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/6 bg-black/25 p-5">
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Action Layer
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 font-display text-xs uppercase tracking-[0.18em] text-text-primary transition-all duration-300 hover:border-accent/20 hover:text-accent"
                  >
                    Live System
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 font-display text-xs uppercase tracking-[0.18em] text-text-primary transition-all duration-300 hover:border-accent/20 hover:text-accent"
                  >
                    GitHub Repo
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/6 bg-black/25 p-5">
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Project Summary
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {project.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
