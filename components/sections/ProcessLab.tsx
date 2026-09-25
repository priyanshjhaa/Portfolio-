'use client';

import { CheckCircle2, CircleDot, GitBranch, Radar, Rocket, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { buildStages } from '@/lib/data';
import { AnimatePresence, MotionReveal, motion, useReducedMotion } from '@/components/ui/LabMotion';
import { cn } from '@/lib/utils';

import ProcessIllustration from '@/components/ui/ProcessIllustration';
import SectionAtmosphere from '@/components/ui/SectionAtmosphere';

const icons = [Radar, GitBranch, CircleDot, ShieldCheck, Rocket, CheckCircle2];

function StageVisual({ index }: { index: number }) {
  const stage = buildStages[index];
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={stage.id}
        className="theme-control-surface relative min-h-[310px] overflow-hidden rounded-[26px] border border-white/10 p-5 sm:p-7"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.975 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, scale: 1.015 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]" style={{ background: `${stage.accent}18` }} />

        <div className="relative flex items-center justify-between">
          <span className="field-label">{stage.artifact}</span>
          <span className="rounded-full border border-white/10 px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.16em]" style={{ color: stage.accent }}>Stage {String(index + 1).padStart(2, '0')}</span>
        </div>

        <ProcessIllustration index={index} accent={stage.accent} />

        <div className="relative mt-8 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: stage.accent, boxShadow: `0 0 14px ${stage.accent}` }} />
          <p className="font-display text-[8px] uppercase leading-relaxed tracking-[0.15em] text-text-muted">{stage.evidence}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProcessLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end center'] });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (reduceMotion || !window.matchMedia('(min-width: 1024px)').matches) return;
    const next = Math.min(buildStages.length - 1, Math.max(0, Math.floor(progress * buildStages.length)));
    setActiveIndex(next);
  });

  useEffect(() => {
    if (reduceMotion) setActiveIndex(0);
  }, [reduceMotion]);

  const active = buildStages[activeIndex];
  const ActiveIcon = icons[activeIndex];

  return (
    <section ref={sectionRef} className="relative px-4 py-24 md:px-8 md:py-32 lg:min-h-[180vh]">
      <SectionAtmosphere tone="#ffd27d" pattern="grid" />
      <div className="relative mx-auto max-w-[1240px] lg:sticky lg:top-24">
        <MotionReveal className="grid gap-7 border-b border-white/8 pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="field-label text-[#ffd27d]">Build choreography / 02</p>
            <h2 className="mt-5 font-editorial text-[clamp(3.4rem,7vw,6.6rem)] leading-[0.88] tracking-[-0.055em] text-text-primary">
              From ambiguity
              <br />
              to <span className="italic text-[#ffd27d]">operation.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-text-secondary lg:justify-self-end">
            Scroll through the path or choose a stage. Each transition produces an artifact and protects the next decision.
          </p>
        </MotionReveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1" role="tablist" aria-label="Build stages">
            {buildStages.map((stage, index) => {
              const Icon = icons[index];
              const isActive = index === activeIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="active-build-stage"
                  onClick={() => setActiveIndex(index)}
                  className={cn('premium-action flex min-h-[64px] items-center gap-3 rounded-[18px] border px-3 text-left', isActive ? 'border-white/14 bg-white/[0.06]' : 'border-transparent hover:border-white/8 hover:bg-white/[0.025]')}
                >
                  <span className="theme-inset-surface flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10" style={{ color: isActive ? stage.accent : undefined }}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-display text-[8px] uppercase tracking-[0.15em] text-text-muted">0{index + 1}</span>
                    <span className="mt-1 block text-xs text-text-primary sm:text-sm">{stage.verb}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="active-build-stage" role="tabpanel" className="premium-surface rounded-[32px] border border-white/10 bg-[#10110f]/82 p-5 md:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border" style={{ borderColor: `${active.accent}45`, background: `${active.accent}10`, color: active.accent }}>
                <ActiveIcon className="h-5 w-5" />
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active.id} initial={reduceMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
                  <p className="field-label" style={{ color: active.accent }}>{active.verb} / {active.artifact}</p>
                  <h3 className="mt-3 font-editorial text-4xl tracking-[-0.035em] text-text-primary md:text-5xl">{active.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">{active.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-7"><StageVisual index={activeIndex} /></div>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/6" aria-hidden="true">
              <motion.span className="block h-full origin-left rounded-full" style={{ background: active.accent }} animate={{ scaleX: (activeIndex + 1) / buildStages.length }} transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
