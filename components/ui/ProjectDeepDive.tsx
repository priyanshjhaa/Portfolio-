'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Github, X } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectDeepDiveProps {
  project: Project | null;
  onClose?: () => void;
  pageMode?: boolean;
}

const visualProofContent = {
  atlas: {
    badge: 'Engineering Intelligence • Change Impact',
    headline: ['Understand what changes', 'before you change it.'],
    description:
      'Map code, architecture, history, and technical evidence before a software change reaches production.',
    primaryCta: 'Analyze a change',
    secondaryCta: 'Explore the system',
    shellClass:
      'bg-[radial-gradient(circle_at_18%_12%,rgba(237,221,182,0.10),transparent_30%),radial-gradient(circle_at_82%_80%,rgba(201,135,111,0.10),transparent_28%),linear-gradient(155deg,#12110f_0%,#191713_52%,#0d0d0c_100%)]',
    badgeClass: 'border-signal/25 bg-signal/[0.09] text-signal-hover',
    accentClass: 'from-[#f3ead8] via-white to-[#d7bd87]',
    primaryClass: 'bg-[#eee1c4] text-[#17130d]',
  },
  execute: {
    badge: 'Quick commands, forms, schedules, and live workflow execution',
    headline: ['Turn instructions', 'into workflows that actually', 'run.'],
    description:
      'Send emails, post to Slack, call APIs, add delays, and branch with logic from plain English.',
    primaryCta: 'Start building workflows',
    secondaryCta: 'View demo',
    shellClass:
      'bg-[radial-gradient(circle_at_12%_12%,rgba(255,78,148,0.18),transparent_28%),radial-gradient(circle_at_90%_90%,rgba(57,206,255,0.16),transparent_28%),linear-gradient(160deg,#0E0E0E_0%,#171716_55%,#0E0E0E_100%)]',
    badgeClass: 'border-white/10 bg-white/[0.04] text-white/85',
    accentClass: 'from-pink-300 via-pink-400 to-sky-200',
    primaryClass: 'bg-gradient-to-r from-pink-300 to-sky-200 text-black',
  },
  codemap: {
    badge: 'AI-Powered Code Understanding',
    headline: ['Chat with your', 'codebase.'],
    description:
      'Understand architecture, repository flows, and code context instantly. Turn onboarding from weeks into hours.',
    primaryCta: 'Get Started',
    secondaryCta: 'View Demo',
    shellClass:
      'bg-[radial-gradient(circle_at_50%_24%,rgba(102,255,223,0.16),transparent_26%),radial-gradient(circle_at_50%_58%,rgba(180,255,220,0.18),transparent_22%),linear-gradient(180deg,#020303_0%,#050807_55%,#020303_100%)]',
    badgeClass: 'border-accent/22 bg-accent/[0.09] text-accent',
    accentClass: 'from-white via-white to-[#17d2b2]',
    primaryClass: 'bg-gradient-to-r from-[#18c9ae] to-[#1dde8c] text-[#04130e]',
  },
  axiom: {
    badge: 'About • Features • Pricing • Contact',
    headline: ['Transform Job Descriptions', 'Into Professional Documents'],
    description:
      'Describe your project in simple terms and instantly generate professional proposals and invoices.',
    primaryCta: 'Get Started Free',
    secondaryCta: 'Learn More',
    shellClass:
      'bg-[linear-gradient(180deg,#f4dfb8_0%,#f7c88a_52%,#d88f62_100%)] text-[#fff8ec]',
    badgeClass: 'border-white/15 bg-white/10 text-white/80',
    accentClass: 'from-white via-white to-white',
    primaryClass: 'bg-white text-[#6f6252]',
  },
  cinematch: {
    badge: 'Search • Save • Mood Picks',
    headline: ['Find Your Next', 'Favorite Movie'],
    description:
      'Search for movies, browse recommendation flows, and jump into mood-based picks without leaving the experience.',
    primaryCta: 'Search',
    secondaryCta: 'Get Movies Based on Your Mood',
    shellClass:
      'bg-[radial-gradient(circle_at_50%_26%,rgba(33,199,214,0.14),transparent_24%),linear-gradient(180deg,#08192f_0%,#0c1c37_100%)]',
    badgeClass: 'border-cyan-400/18 bg-cyan-400/[0.08] text-cyan-200',
    accentClass: 'from-white via-white to-cyan-300',
    primaryClass: 'bg-[#13c9c3] text-[#04202a]',
  },
} as const;

function ProductProofVisual({ project }: { project: Project }) {
  const visual = visualProofContent[project.id as keyof typeof visualProofContent];

  if (!visual) {
    return (
      <div className="rounded-2xl border border-white/6 bg-[#081008]/85 p-4">
        <div className="h-3 w-28 rounded-full bg-accent/25" />
        <div className="mt-4 h-28 rounded-2xl border border-accent/16 bg-[radial-gradient(circle_at_30%_30%,rgba(167, 162, 154,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-[28px] border border-white/8 ${visual.shellClass}`}>
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-white/85" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <div className={`rounded-full border px-3 py-1 font-display text-[9px] uppercase tracking-[0.18em] ${visual.badgeClass}`}>
          {visual.badge}
        </div>
      </div>

      <div className="p-5">
        {project.image ? (
          <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-4 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.92)]">
            <div className="rounded-[22px] border border-white/8 bg-black/28 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/85" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <div className="font-display text-[10px] uppercase tracking-[0.2em] text-white/55">
                  {project.name} landing page
                </div>
              </div>

              <div className="rounded-[20px] border border-white/8 bg-[#040604]/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/85" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <div className={`rounded-full border px-3 py-1 font-display text-[9px] uppercase tracking-[0.16em] ${visual.badgeClass}`}>
                    {visual.badge}
                  </div>
                </div>

                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[16px] border border-white/8 bg-black/40 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.85)]">
                  <Image
                    src={project.image}
                    alt={`${project.name} landing page preview`}
                    fill
                    unoptimized
                    className="object-contain object-top"
                    sizes="(max-width: 768px) 100vw, 900px"
                    priority={project.featured}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),transparent_22%,transparent_70%,rgba(0,0,0,0.26))]" />
                </div>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[18px] border border-white/8 bg-black/24 p-4">
                  <p className="font-display text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    {project.name}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm text-text-secondary">
                    <span className="h-2.5 w-2.5 rounded-sm bg-accent shadow-[0_0_16px_rgba(167, 162, 154,0.5)]" />
                    All systems operational
                  </div>
                </div>

                <div className="rounded-[18px] border border-white/8 bg-black/24 p-4">
                  <p className="font-display text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    Infrastructure &amp; Engineering
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.14em] text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-text-primary transition-all duration-300 hover:border-accent/20 hover:text-accent"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-text-primary transition-all duration-300 hover:border-accent/20 hover:text-accent"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {project.id === 'cinematch' && (
              <div className="mb-6 flex justify-center gap-3">
                {['-rotate-[8deg]', 'rotate-0', 'rotate-[8deg]'].map((rotation, index) => (
                  <div
                    key={rotation}
                    className={`h-28 w-24 rounded-2xl border border-white/10 bg-gradient-to-b ${
                      index === 0
                        ? 'from-amber-200/90 to-amber-700/40'
                        : index === 1
                          ? 'from-red-200/90 to-red-700/40'
                          : 'from-slate-100/85 to-slate-500/40'
                    } ${rotation} shadow-[0_18px_30px_-18px_rgba(0,0,0,0.7)]`}
                  />
                ))}
              </div>
            )}

            {project.id === 'axiom' && (
              <div className="mb-8 h-24 overflow-hidden rounded-2xl">
                <div className="h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent),radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.26),transparent_28%)]" />
                <div className="relative -mt-8 h-24">
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#1e2943]" style={{ clipPath: 'polygon(0 100%, 0 65%, 18% 45%, 26% 70%, 40% 38%, 55% 60%, 70% 34%, 80% 68%, 100% 44%, 100% 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0f1730]" style={{ clipPath: 'polygon(0 100%, 0 74%, 15% 60%, 34% 78%, 48% 52%, 62% 84%, 80% 58%, 100% 74%, 100% 100%)' }} />
                </div>
              </div>
            )}

            <div className={`bg-gradient-to-r bg-clip-text text-transparent ${visual.accentClass}`}>
              {visual.headline.map((line) => (
                <p
                  key={line}
                  className={`font-display font-semibold leading-[0.95] ${
                    project.id === 'execute'
                      ? 'text-[42px] md:text-[52px]'
                      : project.id === 'codemap'
                        ? 'text-[42px] md:text-[56px]'
                        : project.id === 'axiom'
                          ? 'text-[34px] md:text-[46px]'
                          : 'text-[40px] md:text-[52px]'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            <p className={`mt-5 max-w-2xl text-sm leading-relaxed ${project.id === 'axiom' ? 'text-white/80' : 'text-white/70'}`}>
              {visual.description}
            </p>

            {project.id === 'codemap' ? (
              <div className="mt-6 flex max-w-xl overflow-hidden rounded-full border border-white/10 bg-black/30">
                <div className="flex-1 px-4 py-3 text-sm text-white/45">Enter your email</div>
                <div className={`px-5 py-3 font-display text-sm font-semibold ${visual.primaryClass}`}>{visual.primaryCta}</div>
                <div className="border-l border-white/10 px-5 py-3 text-sm text-white/80">{visual.secondaryCta}</div>
              </div>
            ) : project.id === 'cinematch' ? (
              <>
                <div className="mt-6 flex max-w-2xl overflow-hidden rounded-full border border-cyan-300/20 bg-white/10">
                  <div className="flex-1 px-4 py-3 text-sm text-white/45">Search for movies...</div>
                  <div className={`px-5 py-3 font-display text-sm font-semibold ${visual.primaryClass}`}>{visual.primaryCta}</div>
                </div>
                <div className={`mt-4 inline-flex rounded-full px-5 py-3 font-display text-sm font-semibold ${visual.primaryClass}`}>
                  {visual.secondaryCta}
                </div>
              </>
            ) : (
              <div className="mt-6 flex flex-wrap gap-3">
                <div className={`rounded-full px-5 py-3 font-display text-sm font-semibold ${visual.primaryClass}`}>
                  {visual.primaryCta}
                </div>
                <div className="rounded-full border border-white/15 px-5 py-3 text-sm text-white/85">
                  {visual.secondaryCta}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ProjectDeepDive({
  project,
  onClose,
  pageMode = false,
}: ProjectDeepDiveProps) {
  useEffect(() => {
    if (!project || pageMode) {
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
    <div className={pageMode ? 'min-h-screen bg-[#0E0E0E]' : 'fixed inset-0 z-[90] overflow-y-auto bg-[#0E0E0E]/98'}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167, 162, 154,0.09),transparent_26%),radial-gradient(circle_at_85%_20%,rgba(167, 162, 154,0.05),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <div className="pointer-events-none absolute inset-0 texture-blueprint opacity-[0.13] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-6 md:px-8 md:py-8">
        <div className="etched-surface technical-marker sticky top-0 z-20 mb-6 overflow-hidden rounded-[28px] border border-white/8 bg-[#171716]/92 shadow-[0_24px_80px_-50px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-white/[0.02] pointer-events-none" />
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent pointer-events-none" />
          <div className="relative flex items-start justify-between gap-4 px-5 py-5 md:px-7">
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

          {pageMode ? (
            <Link
              href="/#projects"
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2 font-display text-[11px] uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-accent/20 hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-text-secondary transition-colors hover:border-accent/20 hover:text-accent"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/6 bg-[#171716]/92 p-5 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.9)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                    System Brief
                  </p>
                  <p className="mt-2 font-display text-xl uppercase tracking-[0.08em] text-text-primary">
                    {project.impact ?? project.details}
                  </p>
                </div>
                <div className="rounded-xl border border-signal/25 bg-signal/10 px-3 py-2 font-display text-[10px] uppercase tracking-[0.22em] text-signal">
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
              <div className="rounded-[24px] border border-white/6 bg-[#171716]/92 p-5">
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                  Why I Built This
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                  {project.whyBuiltThis ?? project.problem}
                </p>
              </div>

              <div className="rounded-[24px] border border-white/6 bg-[#171716]/92 p-5">
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                  Approach
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                  {project.approach}
                </p>
              </div>
            </div>

            {(project.keyDecision || project.tradeoff || project.nextStep) && (
              <div className="rounded-[24px] border border-white/6 bg-[#171716]/92 p-5">
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                  Engineering Judgment
                </p>
                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  {project.keyDecision && (
                    <div className="rounded-2xl border border-accent/14 bg-accent/[0.04] px-4 py-4">
                      <p className="font-display text-[10px] uppercase tracking-[0.18em] text-accent/80">
                        Key Decision
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {project.keyDecision}
                      </p>
                    </div>
                  )}
                  {project.tradeoff && (
                    <div className="rounded-2xl border border-white/6 bg-black/20 px-4 py-4">
                      <p className="font-display text-[10px] uppercase tracking-[0.18em] text-text-muted">
                        Tradeoff
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {project.tradeoff}
                      </p>
                    </div>
                  )}
                  {project.nextStep && (
                    <div className="rounded-2xl border border-white/6 bg-black/20 px-4 py-4">
                      <p className="font-display text-[10px] uppercase tracking-[0.18em] text-text-muted">
                        Next Step
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {project.nextStep}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-[28px] border border-white/6 bg-[#171716]/92 p-5 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                    {project.proofFrame?.eyebrow ?? 'Proof Surface'}
                  </p>
                  <p className="mt-2 font-display text-lg uppercase tracking-[0.08em] text-text-primary">
                    {project.proofFrame?.title ?? project.proofTitle ?? 'Product proof'}
                  </p>
                </div>
                <div className="rounded-xl border border-accent/18 bg-accent/[0.08] px-3 py-2 font-display text-[10px] uppercase tracking-[0.18em] text-accent">
                  Visual proof
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-white/6 bg-black/25 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <p className="font-display text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    Product frame
                  </p>
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[20px] border border-white/6 bg-white/[0.02] p-4">
                    <ProductProofVisual project={project} />
                  </div>

                  <div className="rounded-[20px] border border-white/6 bg-white/[0.02] p-4">
                    <p className="font-display text-[10px] uppercase tracking-[0.18em] text-accent/80">
                      What this proves
                    </p>
                    <div className="mt-4 space-y-3">
                      {(project.proofPoints ?? []).map((point) => (
                        <div
                          key={point}
                          className="rounded-2xl border border-white/6 bg-black/20 px-4 py-3"
                        >
                          <p className="text-sm leading-relaxed text-text-secondary">{point}</p>
                        </div>
                      ))}
                    </div>
                    {project.proofFrame?.callout && (
                      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                        {project.proofFrame.callout}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/6 bg-[#171716]/92 p-5">
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Architecture Walkthrough
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-[repeat(4,minmax(0,1fr))]">
                {(project.flowSteps ?? []).map((step, index) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-white/6 bg-black/20 px-4 py-4"
                  >
                    <p className="font-display text-[10px] uppercase tracking-[0.18em] text-accent/80">
                      Step 0{index + 1}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/6 bg-[#171716]/92 p-5">
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
            {project.ownership && (
              <div className="rounded-[28px] border border-white/6 bg-[#171716]/92 p-5 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.9)]">
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                  Scope I Owned
                </p>
                <div className="mt-4 space-y-3">
                  {project.ownership.map((scope) => (
                    <div
                      key={scope}
                      className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgba(167, 162, 154,0.45)]" />
                      <p className="text-sm leading-relaxed text-text-secondary">{scope}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-[28px] border border-white/6 bg-[#171716]/92 p-5 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.9)] xl:sticky xl:top-[8.5rem]">
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Infrastructure &amp; Engineering
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

            <div className="rounded-[28px] border border-white/6 bg-[#171716]/92 p-5 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.9)]">
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                Production Signals
              </p>
              <div className="mt-4 space-y-3">
                {(project.productionSignals ?? []).map((signal) => (
                  <div
                    key={signal}
                    className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
                  >
                    <p className="text-sm leading-relaxed text-text-secondary">{signal}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/6 bg-[#171716]/92 p-5 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.9)]">
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

            <div className="rounded-[28px] border border-white/6 bg-[#171716]/92 p-5 shadow-[0_24px_70px_-48px_rgba(0,0,0,0.9)]">
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
