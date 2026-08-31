'use client';

import { Check, GitCommitHorizontal, Radio, Sparkles } from 'lucide-react';
import { currentBuild, receipts, recentBuilds } from '@/lib/data';
import { MotionReveal, motion, useReducedMotion } from '@/components/ui/LabMotion';

export default function EvidenceLab() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute left-[-12rem] top-1/4 h-[34rem] w-[34rem] rounded-full bg-[#b8e986]/[0.055] blur-[120px]" />
      <div className="relative mx-auto max-w-[1240px]">
        <MotionReveal className="grid gap-7 border-b border-white/8 pb-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="field-label text-[#b8e986]">Shipping evidence / 04</p>
            <h2 className="mt-5 font-editorial text-[clamp(3.5rem,7vw,6.8rem)] leading-[0.88] tracking-[-0.055em] text-text-primary">
              The work leaves
              <br />
              a <span className="italic text-[#b8e986]">signal.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-text-secondary lg:justify-self-end">
            Claims fade quickly. Current work, implementation receipts, and a visible shipping trail make the engineering legible.
          </p>
        </MotionReveal>

        <div className="mt-14 grid border-b border-white/8 lg:grid-cols-[0.82fr_1.18fr]">
          <MotionReveal className="border-b border-white/8 py-14 lg:border-b-0 lg:border-r lg:pr-12">
            <div className="flex items-center justify-between gap-4">
              <p className="field-label">Live build feed</p>
              <span className="flex items-center gap-2 rounded-full border border-[#b8e986]/20 bg-[#b8e986]/[0.05] px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.15em] text-[#b8e986]">
                <Radio className="h-3 w-3" /> Active
              </span>
            </div>
            <h3 className="mt-6 font-editorial text-4xl tracking-[-0.035em] text-text-primary">{currentBuild.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">{currentBuild.description}</p>

            <div className="relative mt-8 overflow-hidden rounded-[26px] border border-white/9 bg-[#0e100e] p-5">
              <div className="absolute bottom-0 left-[29px] top-0 w-px bg-white/8" />
              <motion.div className="absolute left-[27px] top-0 h-20 w-[5px] rounded-full bg-[#b8e986] blur-[1px]" animate={reduceMotion ? undefined : { y: [0, 250, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
              <div className="relative space-y-5">
                {currentBuild.items.map((item, index) => (
                  <div key={item} className="grid grid-cols-[18px_1fr] gap-4">
                    <span className="mt-1.5 h-3 w-3 rounded-full border border-[#b8e986]/55 bg-[#0e100e]" />
                    <div>
                      <p className="font-display text-[8px] uppercase tracking-[0.15em] text-text-muted">Workstream 0{index + 1}</p>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08} className="py-14 lg:pl-12">
            <div className="flex items-center justify-between gap-4">
              <p className="field-label">Implementation receipts</p>
              <Sparkles className="h-4 w-4 text-[#b8e986]" />
            </div>
            <div className="mt-7 grid gap-px overflow-hidden rounded-[26px] border border-white/8 bg-white/8 sm:grid-cols-2">
              {receipts.map((receipt, index) => (
                <motion.div key={receipt} className="group min-h-44 bg-[#111210] p-5" whileHover={reduceMotion ? undefined : { backgroundColor: '#151814' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[9px] text-[#b8e986]">0{index + 1}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-text-muted transition group-hover:border-[#b8e986]/30 group-hover:text-[#b8e986]"><Check className="h-3.5 w-3.5" /></span>
                  </div>
                  <p className="mt-8 text-sm leading-relaxed text-text-secondary">{receipt}</p>
                </motion.div>
              ))}
            </div>
          </MotionReveal>
        </div>

        <MotionReveal className="py-16">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
            <div>
              <p className="field-label">Recent shipping</p>
              <h3 className="mt-4 font-editorial text-4xl tracking-[-0.035em] text-text-primary md:text-5xl">A visible trail of iteration.</h3>
              <p className="mt-5 text-sm leading-relaxed text-text-muted">The timeline favors concrete changes over generic activity.</p>
            </div>

            <div className="relative">
              <div className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-[#b8e986]/70 via-white/14 to-transparent" />
              <div className="space-y-9">
                {recentBuilds.map((entry, index) => (
                  <motion.div key={entry.period} className="relative grid gap-4 pl-8 sm:grid-cols-[110px_1fr]" initial={reduceMotion ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.5, delay: index * 0.08 }}>
                    <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-[#b8e986]/70 bg-[#0d0e0d] shadow-[0_0_14px_rgba(184,233,134,.18)]" />
                    <p className="font-display text-[9px] uppercase tracking-[0.16em] text-[#b8e986]">{entry.period}</p>
                    <div className="space-y-2 rounded-[20px] border border-white/8 bg-white/[0.018] p-4">
                      {entry.items.map((item) => (
                        <p key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                          <GitCommitHorizontal className="mt-1 h-3.5 w-3.5 shrink-0 text-text-muted" />{item}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
