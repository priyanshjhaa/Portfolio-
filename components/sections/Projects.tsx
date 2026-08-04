'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github, MoveUpRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { Project } from '@/types/project';
import { cn } from '@/lib/utils';
import Reveal from '@/components/ui/Reveal';

const flagshipIds = ['atlas', 'execute', 'codemap'];

const projectTone: Record<string, { glow: string; label: string }> = {
  atlas: { glow: 'rgba(183,198,170,0.18)', label: 'Engineering intelligence' },
  execute: { glow: 'rgba(234,154,196,0.16)', label: 'Agent operations' },
  codemap: { glow: 'rgba(20,201,174,0.16)', label: 'Developer tooling' },
};

function SystemTrace({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const systems = flagshipIds.map((id) => projects.find((project) => project.id === id)!).filter(Boolean);
  const [activeId, setActiveId] = useState(systems[0].id);
  const active = systems.find((project) => project.id === activeId)!;
  const tone = projectTone[active.id];

  return (
    <Reveal className="mb-28">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="field-label">Interactive system trace</p>
          <h3 className="mt-3 max-w-2xl font-editorial text-4xl tracking-[-0.035em] text-text-primary md:text-5xl">
            Inspect how the work moves.
          </h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-text-muted">
          Select a system to follow its product intent, engineering boundary, and production outcome.
        </p>
      </div>

      <div
        className="overflow-hidden rounded-[32px] border border-white/10 bg-[#111210]/84"
        style={{ boxShadow: `0 42px 100px -70px ${tone.glow}` }}
      >
        <div className="flex overflow-x-auto border-b border-white/8 p-2">
          {systems.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveId(project.id)}
              className={cn(
                'min-w-fit flex-1 rounded-full px-5 py-3 text-sm transition-all duration-300',
                project.id === activeId ? 'bg-white/[0.08] text-text-primary' : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {project.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex min-h-[420px] flex-col justify-between p-6 md:p-9">
            <div>
              <p className="field-label">{tone.label}</p>
              <h4 className="mt-5 font-editorial text-5xl tracking-[-0.045em] text-text-primary">
                {active.name}
              </h4>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">{active.impact}</p>
            </div>

            <div className="mt-10">
              <div className="relative py-8">
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
                <div className="relative grid grid-cols-4 gap-2">
                  {(active.flowSteps ?? []).slice(0, 4).map((step, index) => (
                    <div key={step} className="relative">
                      <span
                        className="mb-4 block h-3 w-3 rounded-full border border-[#b7c6aa] bg-[#111210] transition-all duration-500"
                        style={{ boxShadow: index === 2 ? '0 0 24px rgba(183,198,170,.42)' : undefined }}
                      />
                      <p className="max-w-24 font-display text-[8px] uppercase leading-relaxed tracking-[0.14em] text-text-muted">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenProject(active.id)}
                className="mt-3 inline-flex items-center gap-2 text-sm text-text-primary transition hover:text-[#b7c6aa]"
              >
                Open complete system <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenProject(active.id)}
            className="group relative min-h-[360px] overflow-hidden border-t border-white/8 bg-[#090a09] text-left lg:border-l lg:border-t-0"
            aria-label={`Open ${active.name} system`}
          >
            <Image
              key={`${active.image}-ambient`}
              src={active.image!}
              alt=""
              fill
              quality={35}
              aria-hidden="true"
              className="scale-110 object-cover opacity-20 blur-2xl"
              sizes="(max-width: 1024px) 100vw, 640px"
            />
            <Image
              key={active.image}
              src={active.image!}
              alt={`${active.name} product interface`}
              fill
              quality={80}
              className="z-10 object-contain object-center transition duration-700 group-hover:scale-[1.01]"
              sizes="(max-width: 1024px) 100vw, 640px"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d0e0d]/75 via-transparent to-black/5" />
            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
              <span className="rounded-full border border-white/15 bg-black/45 px-4 py-2 font-display text-[9px] uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                Product proof
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectChapter({
  project,
  index,
  onOpenProject,
}: {
  project: Project;
  index: number;
  onOpenProject: (id: string) => void;
}) {
  const reverse = index % 2 === 1;

  return (
    <article className="border-t border-white/8 py-20 md:py-28">
      <Reveal>
        <div className={cn('grid items-center gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16', reverse && 'lg:grid-cols-[0.82fr_1.18fr]')}>
          <button
            type="button"
            onClick={() => onOpenProject(project.id)}
            className={cn(
              'group relative overflow-hidden rounded-[28px] border border-white/10 bg-black text-left shadow-[0_35px_100px_-60px_rgba(0,0,0,0.95)]',
              reverse && 'lg:order-2'
            )}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={project.image!}
                alt={`${project.name} product preview`}
                fill
                quality={82}
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 760px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
                <span className="font-display text-[9px] uppercase tracking-[0.18em] text-white/70">
                  Inspect product system
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition-all group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <MoveUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </button>

          <div className={cn(reverse && 'lg:order-1')}>
            <div className="flex items-center justify-between gap-4">
              <p className="field-label">0{index + 1} / flagship system</p>
              <span className="rounded-full border border-white/10 px-3 py-1 font-display text-[8px] uppercase tracking-[0.16em] text-text-muted">
                {project.status}
              </span>
            </div>
            <h3 className="mt-5 font-editorial text-6xl tracking-[-0.055em] text-text-primary md:text-7xl">
              {project.name}
            </h3>
            <p className="mt-5 text-xl leading-relaxed text-text-primary">{project.summary}</p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">{project.details}</p>

            <dl className="mt-8 space-y-5 border-y border-white/8 py-6">
              <div className="grid gap-2 sm:grid-cols-[110px_1fr]">
                <dt className="field-label">Outcome</dt>
                <dd className="text-sm leading-relaxed text-text-secondary">{project.impact}</dd>
              </div>
              <div className="grid gap-2 sm:grid-cols-[110px_1fr]">
                <dt className="field-label">Decision</dt>
                <dd className="text-sm leading-relaxed text-text-secondary">{project.keyDecision}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/8 px-3 py-1.5 text-xs text-text-muted">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button type="button" onClick={() => onOpenProject(project.id)} className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-[#b7c6aa]">
                View case study <ArrowUpRight className="h-4 w-4" />
              </button>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-text-primary">
                  Live product
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary">
                  GitHub <Github className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export default function Projects({ onOpenProject }: { onOpenProject: (projectId: string) => void }) {
  const flagship = flagshipIds.map((id) => projects.find((project) => project.id === id)!).filter(Boolean);
  const archive = projects.filter((project) => !flagshipIds.includes(project.id));

  return (
    <section className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-20 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="field-label">Selected work</p>
            <h2 className="mt-4 font-editorial text-[clamp(3.5rem,7vw,6.8rem)] leading-[0.9] tracking-[-0.055em] text-text-primary">
              Built to be
              <br />
              <span className="italic text-[#b7c6aa]">used.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-text-secondary lg:justify-self-end">
            Three products that show how I connect interface decisions, system architecture, and reliable execution.
          </p>
        </Reveal>

        <SystemTrace onOpenProject={onOpenProject} />

        <div>
          {flagship.map((project, index) => (
            <ProjectChapter key={project.id} project={project} index={index} onOpenProject={onOpenProject} />
          ))}
        </div>

        <Reveal className="border-t border-white/8 py-20">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="field-label">Earlier work</p>
              <h3 className="mt-4 font-editorial text-4xl tracking-[-0.035em] text-text-primary">The archive.</h3>
            </div>
            <div className="divide-y divide-white/8 border-y border-white/8">
              {archive.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onOpenProject(project.id)}
                  className="group grid w-full gap-3 py-6 text-left transition-colors hover:text-[#b7c6aa] sm:grid-cols-[1fr_1.5fr_auto] sm:items-center"
                >
                  <span className="font-editorial text-3xl text-text-primary transition-colors group-hover:text-[#b7c6aa]">{project.name}</span>
                  <span className="text-sm leading-relaxed text-text-muted">{project.summary}</span>
                  <ArrowUpRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
