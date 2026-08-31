'use client';

import Link from 'next/link';
import { ArrowUpRight, Braces, Database, Layers3, Orbit, Rocket } from 'lucide-react';
import { useState } from 'react';
import { capabilities, projects } from '@/lib/data';
import { AnimatePresence, MotionReveal, motion, useReducedMotion } from '@/components/ui/LabMotion';
import { cn } from '@/lib/utils';

const icons = [Layers3, Braces, Database, Orbit, Rocket];

export default function CapabilitiesLab() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const reduceMotion = useReducedMotion();
  const active = capabilities.find((capability) => capability.id === activeId) ?? capabilities[0];
  const relatedProjects = active.projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute left-[-16rem] top-1/3 h-[34rem] w-[34rem] rounded-full bg-[#9fc8ff]/[0.06] blur-[120px]" />
      <div className="relative mx-auto max-w-[1240px]">
        <MotionReveal className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="field-label text-[#9fc8ff]">Capability playground / 01</p>
            <h2 className="mt-5 font-editorial text-[clamp(3.4rem,7vw,6.6rem)] leading-[0.88] tracking-[-0.055em] text-text-primary">
              Skills connected
              <br />
              to <span className="italic text-[#9fc8ff]">proof.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-text-secondary lg:justify-self-end">
            No percentage bars. Choose a capability to see the tools, product responsibility, and systems where it became real.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.08} className="mt-16 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-2" role="list" aria-label="Capability areas">
            {capabilities.map((capability, index) => {
              const Icon = icons[index];
              const isActive = capability.id === active.id;
              return (
                <button
                  key={capability.id}
                  type="button"
                  onClick={() => setActiveId(capability.id)}
                  onFocus={() => setActiveId(capability.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'premium-action group flex min-h-[72px] w-full items-center gap-4 rounded-[20px] border px-4 text-left',
                    isActive ? 'border-white/14 bg-white/[0.06]' : 'border-transparent bg-white/[0.012] hover:border-white/8 hover:bg-white/[0.03]'
                  )}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/25" style={{ color: capability.accent }}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-display text-[8px] uppercase tracking-[0.18em] text-text-muted">Module 0{index + 1}</span>
                    <span className="mt-1 block text-sm text-text-primary">{capability.label}</span>
                  </span>
                  <span className="ml-auto h-2 w-2 rounded-full transition-transform group-hover:scale-125" style={{ background: capability.accent, boxShadow: isActive ? `0 0 18px ${capability.accent}` : undefined }} />
                </button>
              );
            })}
          </div>

          <div className="premium-surface relative min-h-[590px] overflow-hidden rounded-[32px] border border-white/10 bg-[#101110]/82 p-5 sm:p-7 md:p-9">
            <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.08)_1px,transparent_0)] [background-size:28px_28px]" />
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 700 590" aria-hidden="true">
              <defs>
                <linearGradient id="capability-line" x1="0" x2="1">
                  <stop offset="0" stopColor={active.accent} stopOpacity=".05" />
                  <stop offset=".5" stopColor={active.accent} stopOpacity=".65" />
                  <stop offset="1" stopColor={active.accent} stopOpacity=".05" />
                </linearGradient>
              </defs>
              {capabilities.map((capability) => (
                <motion.path
                  key={capability.id}
                  d={`M350 286 L${capability.coordinate.x * 7} ${capability.coordinate.y * 5.9}`}
                  fill="none"
                  stroke={capability.id === active.id ? 'url(#capability-line)' : 'rgba(255,255,255,.08)'}
                  strokeWidth={capability.id === active.id ? 1.8 : 1}
                  strokeDasharray={capability.id === active.id ? '7 8' : undefined}
                  initial={false}
                  animate={reduceMotion ? undefined : { strokeDashoffset: [0, -30] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                />
              ))}
            </svg>

            <div className="relative z-10 flex h-full min-h-[520px] flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="field-label">Live capability graph</p>
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.16em] text-text-muted">Focus to inspect</span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  className="mx-auto w-full max-w-xl rounded-[28px] border bg-[#0c0d0c]/92 p-6 text-center shadow-[0_30px_80px_-48px_rgba(0,0,0,.95)] md:p-8"
                  style={{ borderColor: `${active.accent}35`, boxShadow: `0 30px 90px -58px ${active.accent}` }}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border text-xl" style={{ borderColor: `${active.accent}55`, color: active.accent, background: `${active.accent}12` }}>
                    {String(capabilities.findIndex((item) => item.id === active.id) + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-5 font-display text-[9px] uppercase tracking-[0.22em]" style={{ color: active.accent }}>{active.shortLabel}</p>
                  <h3 className="mt-3 font-editorial text-4xl tracking-[-0.035em] text-text-primary md:text-5xl">{active.label}</h3>
                  <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-text-secondary md:text-base">{active.description}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {active.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-white/9 bg-white/[0.025] px-3 py-1.5 text-xs text-text-secondary">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div>
                <p className="field-label mb-3">Connected systems</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {relatedProjects.map((project) => project && (
                    <Link key={project.id} href={`/systems/${project.id}`} className="premium-action group flex min-h-12 items-center justify-between rounded-2xl border border-white/9 bg-white/[0.025] px-4 text-sm text-text-secondary hover:border-white/18 hover:text-text-primary">
                      {project.name}<ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
