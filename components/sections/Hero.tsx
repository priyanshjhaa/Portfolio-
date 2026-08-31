'use client';

import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Braces, Github, MapPin, Terminal } from 'lucide-react';
import { contact, heroContent, heroRoles, runnerSceneById } from '@/lib/data';
import { KineticWords, MotionReveal, PointerParallax, motion, useReducedMotion } from '@/components/ui/LabMotion';
import RunnerChapterScene from '@/components/ui/RunnerChapterScene';
import { TechCreature } from '@/components/ui/RunnerVisuals';

function PortraitScene() {
  const reduceMotion = useReducedMotion();

  return (
    <PointerParallax className="relative mx-auto h-[430px] w-full max-w-[560px] [transform-style:preserve-3d] sm:h-[610px]">
      <div className="absolute inset-[4%] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0d0f0e]/35">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(159,200,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(159,200,255,.055)_1px,transparent_1px)] [background-size:34px_34px]" />
        <motion.div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-[#9fc8ff]/35 to-transparent" animate={reduceMotion ? undefined : { x: [20, 470, 20] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#b8e986]/30 to-transparent" animate={reduceMotion ? undefined : { y: [40, 510, 40] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <div className="absolute left-[1%] top-[5%] h-14 w-14 border-l border-t border-[#9fc8ff]/30" />
      <div className="absolute bottom-[5%] right-[1%] h-14 w-14 border-b border-r border-[#b8e986]/25" />
      <div className="absolute right-[7%] top-[9%] font-display text-[8px] uppercase tracking-[0.18em] text-text-muted">x:72.40 / y:18.06</div>

      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 560 610" fill="none" aria-hidden="true">
        <path d="M22 168H118L162 122H248L292 166H406L454 118H538" stroke="rgba(159,200,255,.18)" />
        <path d="M18 452H102L150 500H248L296 450H396L446 492H542" stroke="rgba(184,233,134,.14)" />
        {[22, 118, 162, 248, 292, 406, 454, 538].map((x, index) => <circle key={`top-${x}`} cx={x} cy={[168, 168, 122, 122, 166, 166, 118, 118][index]} r="3" fill="#0d0f0e" stroke="rgba(159,200,255,.5)" />)}
        {[18, 102, 150, 248, 296, 396, 446, 542].map((x, index) => <rect key={`bottom-${x}`} x={x - 3} y={[449, 449, 497, 497, 447, 447, 489, 489][index]} width="6" height="6" fill="#0d0f0e" stroke="rgba(184,233,134,.4)" />)}
        <motion.path d="M22 168H118L162 122H248L292 166H406L454 118H538" stroke="#9fc8ff" strokeWidth="2" strokeDasharray="12 190" animate={reduceMotion ? undefined : { strokeDashoffset: [0, -420] }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} />
        <motion.circle cx="280" cy="305" r="238" stroke="rgba(255,255,255,.09)" strokeDasharray="3 15" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 54, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '280px 305px' }} />
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 z-10 w-[64%] max-w-[370px] -translate-x-1/2 -translate-y-1/2 sm:w-[66%]"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative overflow-hidden rounded-[22px] border border-white/15 bg-[#0b0c0b] p-2 shadow-[0_45px_110px_-48px_rgba(0,0,0,.98)]">
          <div className="relative aspect-[272/363] overflow-hidden rounded-[16px]">
            <Image src="/profile/priyansh.webp" alt="Priyansh Jha" fill priority quality={75} className="object-cover object-center saturate-[0.92] contrast-[1.03]" sizes="(max-width: 640px) 64vw, 370px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a09]/75 via-transparent to-[#9fc8ff]/[0.06]" />
            <div className="absolute inset-x-4 bottom-4 rounded-[10px] border border-white/15 bg-black/55 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">Priyansh Jha</p>
                  <p className="mt-1 font-display text-[8px] uppercase tracking-[0.17em] text-white/55">Product engineer / builder</p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-[#b8e986] shadow-[0_0_16px_rgba(184,233,134,.6)]" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute left-0 top-[35%] z-20 flex items-center gap-3 rounded-[8px] border border-white/12 bg-[#0c0e0d]/90 px-4 py-2.5 font-display text-[8px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-xl" animate={reduceMotion ? undefined : { x: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="h-1.5 w-1.5 bg-[#9fc8ff] shadow-[0_0_10px_rgba(159,200,255,.45)]" /> Identity node / Priyansh
      </motion.div>
      <motion.div className="absolute bottom-[18%] right-0 z-20 flex items-center gap-2 rounded-[8px] border border-[#9fc8ff]/20 bg-[#0c0f12]/90 px-4 py-2.5 font-display text-[8px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-xl" animate={reduceMotion ? undefined : { x: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <Braces className="h-3.5 w-3.5" /> Full-stack / end to end
      </motion.div>
      <motion.div className="absolute right-[2%] top-[24%] z-20 rounded-[6px] border border-[#b8e986]/20 bg-[#0d110e]/90 px-3 py-2 font-display text-[8px] uppercase tracking-[0.17em] text-[#cdeab5] backdrop-blur-xl" animate={reduceMotion ? undefined : { y: [0, 5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
        Status // available
      </motion.div>
      <div className="absolute bottom-[5%] left-[5%] z-20 flex items-end gap-2" aria-hidden="true">
        <TechCreature state="running" className="w-[72px] drop-shadow-[0_12px_18px_rgba(0,0,0,.55)]" />
        <span className="mb-2 font-display text-[7px] uppercase tracking-[0.14em] text-text-muted">run / identity</span>
      </div>
    </PointerParallax>
  );
}

function HeroDetails({ onEnterWork }: { onEnterWork: () => void }) {
  return (
    <>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
        {heroContent.description} This page is the lab bench: follow the signals from capability to architecture to shipped proof.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {heroContent.hiringValues.map((item, index) => (
          <span key={item} className="rounded-full border border-white/9 bg-white/[0.025] px-3 py-2 text-xs text-text-secondary">
            <span className="mr-2 font-display text-[8px] text-text-muted">0{index + 1}</span>{item}
          </span>
        ))}
      </div>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={onEnterWork} className="premium-action group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#eeeae2] px-6 text-sm font-medium text-[#101110] hover:bg-white">
          Enter the work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </button>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="premium-action inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-6 text-sm text-text-primary hover:border-[#9fc8ff]/45 hover:bg-[#9fc8ff]/[0.06]">
          GitHub <Github className="h-4 w-4" />
        </a>
        <a href={`mailto:${contact.email}`} className="inline-flex min-h-[52px] items-center justify-center gap-3 px-3 text-sm text-text-secondary transition hover:text-text-primary">
          Start a conversation <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-9 flex items-center gap-3 text-sm text-text-muted">
        <span className="h-2 w-2 rounded-full bg-[#b8e986] shadow-[0_0_16px_rgba(184,233,134,.45)]" />
        {contact.availability}
      </div>
    </>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const scrollToWork = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 md:px-8 md:pt-36">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(159,200,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(159,200,255,.025)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-[-18rem] top-[-14rem] h-[40rem] w-[40rem] rounded-full bg-[#9fc8ff]/[0.055] blur-[150px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-20rem] top-[8rem] h-[42rem] w-[42rem] rounded-full bg-[#b8e986]/[0.035] blur-[170px]" aria-hidden="true" />
      <div className="hero-pixel-sky" aria-hidden="true"><span /><span /><span /></div>
      <div className="pointer-events-none absolute left-6 top-[44%] hidden items-center gap-3 font-display text-[8px] uppercase tracking-[0.18em] text-white/20 xl:flex" aria-hidden="true">
        <span className="h-px w-10 bg-white/15" /> runner.kernel / ready
      </div>
      <div className="pointer-events-none absolute bottom-[10%] right-8 hidden font-display text-[8px] uppercase tracking-[0.18em] text-white/20 xl:block" aria-hidden="true">viewport / responsive</div>

      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid min-h-[calc(100vh-9rem)] gap-x-16 gap-y-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <MotionReveal className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-editorial text-2xl text-text-primary">
                PJ
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#0d0e0d] bg-[#b8e986]" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Priyansh Jha</p>
                <p className="mt-1 flex items-center gap-1.5 font-display text-[9px] uppercase tracking-[0.16em] text-text-muted">
                  <MapPin className="h-3 w-3" /> India / remote worldwide
                </p>
              </div>
            </div>

            <div className="mt-10 inline-flex items-center gap-2 rounded-[6px] border border-[#9fc8ff]/20 bg-[#9fc8ff]/[0.04] px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.2em] text-text-secondary">
              <Terminal className="h-3 w-3" /> Active product lab
            </div>
            <h1 className="mt-6 max-w-[760px] font-editorial text-[clamp(3.7rem,7.4vw,7.3rem)] leading-[0.86] tracking-[-0.06em] text-text-primary">
              I make complex systems feel <span className="italic text-[#f0a6ca]">clear.</span>
            </h1>
            <p className="mt-7 text-lg text-text-secondary md:text-xl">
              Full-stack <KineticWords words={heroRoles} className="min-w-[13rem] font-editorial text-[1.12em] italic text-[#9fc8ff] md:min-w-[17rem]" />
            </p>
            <div className="hidden lg:block"><HeroDetails onEnterWork={scrollToWork} /></div>
          </MotionReveal>

          <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1 lg:pl-2">
            <PortraitScene />
          </MotionReveal>

          <MotionReveal delay={0.08} className="-mt-2 lg:hidden">
            <HeroDetails onEnterWork={scrollToWork} />
          </MotionReveal>
        </div>
        <MotionReveal delay={0.08} className="mt-10 md:mt-16">
          <div data-runner-origin>
            <RunnerChapterScene scene={runnerSceneById.intro} compact />
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
