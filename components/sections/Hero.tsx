'use client';

import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Github, MapPin } from 'lucide-react';
import { contact, currentBuild, heroContent, projects } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';

function WorkbenchTrace() {
  const atlas = projects.find((project) => project.id === 'atlas')!;

  return (
    <div className="relative">
      <div className="absolute -inset-12 bg-[radial-gradient(circle,rgba(183,198,170,0.13),transparent_64%)] blur-2xl" />
      <div className="field-card relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111311]/92 shadow-[0_35px_90px_-45px_rgba(0,0,0,0.95)]">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div>
            <p className="font-display text-[9px] uppercase tracking-[0.2em] text-[#b7c6aa]">Live workbench</p>
            <p className="mt-1 text-sm text-text-primary">Atlas / change intelligence</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#b7c6aa]/20 bg-[#b7c6aa]/[0.07] px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.16em] text-[#b7c6aa]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#b7c6aa]" />
            Building
          </div>
        </div>

        <div className="p-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-white/10 bg-black">
            <Image
              src={atlas.image!}
              alt="Atlas engineering intelligence product"
              fill
              priority
              quality={82}
              className="object-cover object-top opacity-90 transition duration-700 hover:scale-[1.02] hover:opacity-100"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0f0d]/75 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <p className="max-w-[250px] text-sm leading-relaxed text-white/85">
                Evidence-backed impact reports before software changes reach production.
              </p>
              <span className="rounded-full border border-white/15 bg-black/55 p-2 text-white backdrop-blur">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/8 px-5 py-5">
          <svg viewBox="0 0 620 104" className="h-auto w-full" aria-hidden="true">
            <defs>
              <linearGradient id="traceLine" x1="0" x2="1">
                <stop offset="0" stopColor="#b7c6aa" stopOpacity=".18" />
                <stop offset=".5" stopColor="#b7c6aa" stopOpacity=".65" />
                <stop offset="1" stopColor="#b7c6aa" stopOpacity=".18" />
              </linearGradient>
            </defs>
            <path d="M28 52H152L202 24H326L380 76H498L592 36" fill="none" stroke="url(#traceLine)" strokeWidth="1.3" />
            {[28, 152, 202, 326, 380, 498, 592].map((x, index) => (
              <g key={x}>
                <circle cx={x} cy={[52, 52, 24, 24, 76, 76, 36][index]} r={index === 3 ? 7 : 4} fill="#101210" stroke="#b7c6aa" strokeWidth="1.5" />
                {index === 3 && <circle cx={x} cy="24" r="14" fill="none" stroke="#b7c6aa" strokeOpacity=".14" />}
              </g>
            ))}
          </svg>
          <div className="mt-2 grid grid-cols-3 gap-3 font-display text-[8px] uppercase tracking-[0.16em] text-text-muted">
            <span>Change intent</span>
            <span className="text-center">Evidence graph</span>
            <span className="text-right">Impact report</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-7 -left-7 hidden w-56 rounded-2xl border border-white/10 bg-[#171816]/94 p-4 shadow-2xl backdrop-blur md:block">
        <p className="font-display text-[8px] uppercase tracking-[0.2em] text-text-muted">Now shipping</p>
        <p className="mt-2 text-sm leading-snug text-text-primary">{currentBuild.items[0]}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollToProjects = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 md:px-8 md:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[72vh] bg-[radial-gradient(circle_at_72%_22%,rgba(183,198,170,0.08),transparent_38%)]" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid min-h-[calc(100vh-9rem)] items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] font-editorial text-2xl text-text-primary">
                PJ
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Priyansh Jha</p>
                <p className="mt-1 flex items-center gap-1.5 font-display text-[9px] uppercase tracking-[0.16em] text-text-muted">
                  <MapPin className="h-3 w-3" /> India / remote worldwide
                </p>
              </div>
            </div>

            <p className="mt-10 font-display text-[10px] uppercase tracking-[0.24em] text-[#b7c6aa]">
              {heroContent.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[760px] font-editorial text-[clamp(3.6rem,7.5vw,7.2rem)] leading-[0.88] tracking-[-0.055em] text-text-primary">
              Products with <span className="italic text-[#b7c6aa]">clarity.</span>
              <br />
              Systems with spine.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              I turn ambiguous product ideas into reliable developer tools, workflow systems, and SaaS products built to survive real use.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-white/8 py-4">
              {heroContent.hiringValues.map((item) => (
                <span key={item} className="text-sm text-text-secondary">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToProjects}
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#e7e5df] px-6 text-sm font-medium text-[#101110] transition hover:bg-white"
              >
                Explore work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-6 text-sm text-text-primary transition hover:border-[#b7c6aa]/40 hover:bg-[#b7c6aa]/[0.06]"
              >
                GitHub <Github className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-[52px] items-center justify-center gap-3 px-3 text-sm text-text-secondary transition hover:text-text-primary"
              >
                Start a conversation <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-9 flex items-center gap-3 text-sm text-text-muted">
              <span className="h-2 w-2 rounded-full bg-[#b7c6aa] shadow-[0_0_16px_rgba(183,198,170,0.45)]" />
              {contact.availability}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:pl-4">
            <WorkbenchTrace />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
