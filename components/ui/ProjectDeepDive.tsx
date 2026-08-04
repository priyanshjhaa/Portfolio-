'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, GitBranch, Github, ShieldCheck, X } from 'lucide-react';
import { Project } from '@/types/project';
import ArchitecturePlayback from '@/components/ui/ArchitecturePlayback';

interface ProjectDeepDiveProps {
  project: Project | null;
  onClose?: () => void;
  pageMode?: boolean;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="field-label">{children}</p>;
}

export default function ProjectDeepDive({ project, onClose, pageMode = false }: ProjectDeepDiveProps) {
  useEffect(() => {
    if (!project || pageMode) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project, pageMode]);

  if (!project) return null;

  const Wrapper = pageMode ? 'main' : 'div';

  return (
    <Wrapper className={pageMode ? 'min-h-screen' : 'fixed inset-0 z-[90] overflow-y-auto bg-[#0c0d0c]'}>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(183,198,170,0.06),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1320px] px-4 pb-12 pt-4 md:px-8">
        <header className="sticky top-4 z-30 flex items-center justify-between rounded-full border border-white/10 bg-[#111210]/88 px-4 py-3 shadow-[0_16px_60px_-40px_rgba(0,0,0,.95)] backdrop-blur-xl md:px-5">
          {pageMode ? (
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary">
              <ArrowLeft className="h-4 w-4" />
              Selected work
            </Link>
          ) : (
            <button type="button" onClick={onClose} className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
              <X className="h-4 w-4" />
              Close
            </button>
          )}

          <div className="flex items-center gap-3">
            <span className="hidden font-display text-[9px] uppercase tracking-[0.16em] text-text-muted sm:block">
              {project.name} / case study
            </span>
            <span className="flex items-center gap-2 rounded-full border border-[#b7c6aa]/20 bg-[#b7c6aa]/[0.06] px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.16em] text-[#b7c6aa]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b7c6aa]" />
              {project.status}
            </span>
          </div>
        </header>

        <section className="grid min-h-[72vh] items-end gap-12 border-b border-white/8 pb-16 pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20 lg:pt-32">
          <div>
            <SectionLabel>Build deep dive / {project.proofFrame?.eyebrow ?? 'Product system'}</SectionLabel>
            <h1 className="mt-6 font-editorial text-[clamp(5rem,12vw,11rem)] leading-[0.78] tracking-[-0.07em] text-text-primary">
              {project.name}
            </h1>
          </div>
          <div className="lg:pb-3">
            <p className="text-2xl leading-relaxed text-text-primary md:text-3xl">{project.summary}</p>
            <p className="mt-5 text-base leading-relaxed text-text-secondary">{project.details}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-[#b7c6aa]">
                  Live product <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
                  GitHub <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        {project.image && (
          <section className="border-b border-white/8 py-10 md:py-16">
            <div className="mb-5 flex items-center justify-between">
              <SectionLabel>Product proof</SectionLabel>
              <span className="font-display text-[8px] uppercase tracking-[0.16em] text-text-muted">Real interface / landing surface</span>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_42px_120px_-70px_rgba(0,0,0,.95)]">
              <div className="flex items-center gap-2 border-b border-white/8 px-5 py-4">
                <span className="h-2.5 w-2.5 rounded-full bg-white/75" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-auto font-display text-[8px] uppercase tracking-[0.16em] text-text-muted">{project.name} / production frame</span>
              </div>
              <div className="relative aspect-[16/9]">
                <Image
                  src={project.image}
                  alt={`${project.name} landing page preview`}
                  fill
                  quality={84}
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1320px) 100vw, 1320px"
                />
              </div>
            </div>
          </section>
        )}

        <section className="grid border-b border-white/8 lg:grid-cols-2">
          <div className="border-b border-white/8 py-14 lg:border-b-0 lg:border-r lg:pr-14">
            <SectionLabel>Why this exists</SectionLabel>
            <p className="mt-6 font-editorial text-3xl leading-snug tracking-[-0.025em] text-text-primary md:text-4xl">
              {project.whyBuiltThis ?? project.problem}
            </p>
          </div>
          <div className="py-14 lg:pl-14">
            <SectionLabel>Product approach</SectionLabel>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">{project.approach}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/8 px-3 py-1.5 text-xs text-text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <SectionLabel>Architecture walkthrough</SectionLabel>
              <h2 className="mt-5 font-editorial text-4xl tracking-[-0.035em] text-text-primary md:text-5xl">
                From intent to outcome.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-text-secondary lg:pt-2">
              Follow the product path one boundary at a time. Each stage exposes the responsibility it owns and the failure it is designed to prevent.
            </p>
          </div>
          <ArchitecturePlayback project={project} />
        </section>

        <section className="grid border-b border-white/8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-white/8 py-16 lg:border-b-0 lg:border-r lg:pr-14">
            <SectionLabel>Engineering judgment</SectionLabel>
            <h2 className="mt-5 font-editorial text-4xl tracking-[-0.035em] text-text-primary md:text-5xl">The decision that shaped the system.</h2>
            <div className="relative mt-8 overflow-hidden rounded-[24px] border border-[#b7c6aa]/20 bg-[#b7c6aa]/[0.045] p-6">
              <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-[#b7c6aa]/10 blur-3xl" />
              <div className="relative flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b7c6aa]/25 text-[#b7c6aa]">
                  <GitBranch className="h-4 w-4" />
                </span>
                <div>
                  <SectionLabel>Decision record / 01</SectionLabel>
                  <p className="mt-4 text-xl leading-relaxed text-text-primary">{project.keyDecision}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8 py-16 lg:pl-14">
            <div>
              <SectionLabel>Tradeoff</SectionLabel>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.tradeoff}</p>
            </div>
            <div>
              <SectionLabel>Next step</SectionLabel>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.nextStep}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-12 border-b border-white/8 py-16 lg:grid-cols-3">
          <div>
            <SectionLabel>What this proves</SectionLabel>
            <div className="mt-6 space-y-4">
              {(project.proofPoints ?? []).map((point) => (
                <p key={point} className="border-l border-[#b7c6aa]/30 pl-4 text-sm leading-relaxed text-text-secondary">{point}</p>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Architecture notes</SectionLabel>
            <div className="mt-6 space-y-4">
              {(project.architectureNotes ?? []).map((note) => (
                <p key={note} className="border-l border-white/10 pl-4 text-sm leading-relaxed text-text-secondary">{note}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#b7c6aa]" />
              <SectionLabel>Production signals</SectionLabel>
            </div>
            <div className="mt-6 divide-y divide-white/8 border-y border-white/8">
              {(project.productionSignals ?? []).map((signal) => (
                <div key={signal} className="flex items-start gap-3 py-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b7c6aa] shadow-[0_0_10px_rgba(183,198,170,.35)]" />
                  <p className="text-sm leading-relaxed text-text-secondary">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8 py-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>End of case study</SectionLabel>
            <h2 className="mt-4 font-editorial text-5xl tracking-[-0.045em] text-text-primary">Back to the work.</h2>
          </div>
          <Link href="/#projects" className="inline-flex items-center gap-3 self-start rounded-full border border-white/12 px-6 py-3 text-sm text-text-primary transition hover:border-[#b7c6aa]/40 hover:bg-[#b7c6aa]/[0.05] sm:self-auto">
            Selected work <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </Wrapper>
  );
}
