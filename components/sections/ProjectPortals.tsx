'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { projects, projectVisuals, runnerSceneById } from '@/lib/data';
import { getProjectImageAspectRatio } from '@/lib/project-images';
import { AnimatePresence, MotionReveal, motion, useReducedMotion } from '@/components/ui/LabMotion';
import { cn } from '@/lib/utils';
import RunnerChapterScene from '@/components/ui/RunnerChapterScene';

const flagshipIds = ['atlas', 'execute', 'codemap'];
const flagshipProjects = flagshipIds.map((id) => projects.find((project) => project.id === id)!).filter(Boolean);
const quickProjects = projects.filter((project) => !flagshipIds.includes(project.id));

export default function ProjectPortals() {
  const [activeId, setActiveId] = useState(flagshipProjects[0].id);
  const reduceMotion = useReducedMotion();
  const active = flagshipProjects.find((project) => project.id === activeId) ?? flagshipProjects[0];
  const visual = projectVisuals[active.id];

  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full blur-[150px]" style={{ background: visual.softAccent }} />
      <div className="relative mx-auto max-w-[1240px]">
        <MotionReveal className="grid gap-7 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="field-label" style={{ color: visual.accent }}>Project portals / 03</p>
            <h2 className="mt-5 font-editorial text-[clamp(3.5rem,7vw,6.8rem)] leading-[0.88] tracking-[-0.055em] text-text-primary">
              Enter a system.
              <br />
              Follow the <span className="italic" style={{ color: visual.accent }}>decisions.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-text-secondary lg:justify-self-end">
            Every build keeps its short summary visible, then opens into the architecture, tradeoffs, and production evidence behind it.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.05} className="mt-12">
          <RunnerChapterScene scene={runnerSceneById.work} compact />
        </MotionReveal>

        <MotionReveal delay={0.08} className="mt-14 overflow-hidden rounded-[34px] border border-white/10 bg-[#0f100f]/88 shadow-[0_45px_120px_-72px_rgba(0,0,0,.98)]">
          <div className="flex overflow-x-auto border-b border-white/8 p-2" role="tablist" aria-label="Flagship projects">
            {flagshipProjects.map((project, index) => {
              const projectVisual = projectVisuals[project.id];
              return (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={project.id === active.id}
                  aria-controls="project-portal-panel"
                  onClick={() => setActiveId(project.id)}
                  className={cn('premium-action flex min-h-12 min-w-[150px] flex-1 items-center justify-center gap-3 rounded-full px-5 text-sm', project.id === active.id ? 'bg-white/[0.07] text-text-primary' : 'text-text-muted hover:text-text-primary')}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: projectVisual.accent, boxShadow: project.id === active.id ? `0 0 14px ${projectVisual.accent}` : undefined }} />
                  <span className="font-display text-[9px] text-text-muted">0{index + 1}</span>
                  {project.name}
                </button>
              );
            })}
          </div>

          <div id="project-portal-panel" role="tabpanel" className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex min-h-[600px] flex-col justify-between border-b border-white/8 p-6 md:p-9 lg:border-b-0 lg:border-r">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active.id} initial={reduceMotion ? false : { opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: 14 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.16em]" style={{ borderColor: `${visual.accent}35`, color: visual.accent, background: visual.softAccent }}>{visual.labLabel}</span>
                    <span className="font-display text-[8px] uppercase tracking-[0.16em] text-text-muted">{active.status} system</span>
                  </div>
                  <h3 className="mt-7 font-editorial text-[clamp(4.2rem,8vw,7.4rem)] leading-[0.82] tracking-[-0.065em] text-text-primary">{active.name}</h3>
                  <p className="mt-7 text-xl leading-relaxed text-text-primary">{active.summary}</p>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">{active.details}</p>

                  <div className="mt-8 rounded-[22px] border border-white/9 bg-white/[0.025] p-5">
                    <p className="field-label">Engineering decision</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{active.keyDecision}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10">
                <div className="relative py-6">
                  <div className="absolute left-0 right-0 top-[29px] h-px bg-white/10" />
                  <div className="relative grid grid-cols-4 gap-2">
                    {(active.flowSteps ?? []).slice(0, 4).map((step, index) => (
                      <div key={step}>
                        <span className="mb-3 block h-3 w-3 rounded-full border bg-[#10110f]" style={{ borderColor: visual.accent, boxShadow: index === 2 ? `0 0 20px ${visual.accent}66` : undefined }} />
                        <p className="max-w-24 font-display text-[8px] uppercase leading-relaxed tracking-[0.13em] text-text-muted">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-5">
                  <Link href={`/systems/${active.id}`} className="premium-action inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-text-primary hover:text-white">
                    Open case study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  {active.githubUrl && <a href={active.githubUrl} target="_blank" rel="noopener noreferrer" className="premium-action inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-text-muted hover:text-text-primary"><Github className="h-4 w-4" /> GitHub</a>}
                  {active.liveUrl && <a href={active.liveUrl} target="_blank" rel="noopener noreferrer" className="premium-action inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-text-muted hover:text-text-primary">Live product <ArrowUpRight className="h-4 w-4" /></a>}
                </div>
              </div>
            </div>

            <div className="flex min-h-[600px] flex-col bg-black/20">
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                <p className="field-label">Production frame</p>
                <p className="font-display text-[8px] uppercase tracking-[0.14em] text-text-muted">{visual.visualCue}</p>
              </div>
              <div className="relative flex flex-1 items-center overflow-hidden p-4 md:p-7">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={active.id} className="relative w-full overflow-hidden rounded-[24px] border border-white/10 bg-black" style={{ aspectRatio: getProjectImageAspectRatio(active.id) }} initial={reduceMotion ? false : { opacity: 0, scale: 0.97, filter: 'blur(8px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02, filter: 'blur(8px)' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                    <Image src={active.image!} alt="" fill quality={75} aria-hidden="true" className="scale-110 object-cover opacity-25 blur-2xl" sizes="(max-width: 1024px) 100vw, 690px" />
                    <Image src={active.image!} alt={`${active.name} product interface`} fill quality={75} className="z-10 object-contain" sizes="(max-width: 1024px) 100vw, 690px" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="grid gap-2 border-t border-white/8 p-4 sm:grid-cols-3">
                {(active.productionSignals ?? []).slice(0, 3).map((signal) => (
                  <div key={signal} className="flex min-h-16 items-start gap-2 rounded-2xl border border-white/8 bg-white/[0.02] p-3">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: visual.accent }} />
                    <span className="text-[11px] leading-relaxed text-text-muted">{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-5">
            <div>
              <p className="field-label">Quick scan</p>
              <h3 className="mt-3 font-editorial text-4xl tracking-[-0.035em] text-text-primary">More shipped surfaces.</h3>
            </div>
            <span className="hidden text-sm text-text-muted sm:block">Compact view / full detail one click away</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {quickProjects.map((project) => {
              const projectVisual = projectVisuals[project.id];
              return (
                <Link key={project.id} href={`/systems/${project.id}`} className="premium-interactive group grid min-h-[250px] overflow-hidden rounded-[26px] border border-white/9 bg-white/[0.02] sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="flex flex-col justify-between p-5">
                    <div>
                      <p className="field-label" style={{ color: projectVisual.accent }}>{projectVisual.labLabel}</p>
                      <h4 className="mt-3 font-editorial text-4xl text-text-primary">{project.name}</h4>
                      <p className="mt-4 text-sm leading-relaxed text-text-secondary">{project.summary}</p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-text-muted group-hover:text-text-primary">Inspect system <ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                  <div className="relative min-h-52 overflow-hidden border-t border-white/8 bg-black sm:border-l sm:border-t-0">
                    <Image src={project.image!} alt={`${project.name} product preview`} fill quality={75} className="object-contain transition duration-700 group-hover:scale-[1.015]" sizes="(max-width: 768px) 100vw, 380px" />
                  </div>
                </Link>
              );
            })}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
