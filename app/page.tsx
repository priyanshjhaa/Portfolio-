'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import BuildExplorer from '@/components/ui/BuildExplorer';
import SystemStateRail from '@/components/ui/SystemStateRail';
import ProjectDeepDive from '@/components/ui/ProjectDeepDive';
import Hero from '@/components/sections/Hero';
import CurrentlyBuilding from '@/components/sections/CurrentlyBuilding';
import Projects from '@/components/sections/Projects';
import HowIBuild from '@/components/sections/HowIBuild';
import { contact, projects } from '@/lib/data';

const sectionIds = ['hero', 'building', 'projects', 'process', 'contact'] as const;

export default function Home() {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('hero');
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsExplorerOpen((current) => !current);
      }

      if (event.key === 'Escape') {
        setIsExplorerOpen(false);
        setFocusedProjectId(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id as (typeof sectionIds)[number]);
        }
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.18, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const focusedProject = projects.find((project) => project.id === focusedProjectId) ?? null;

  return (
    <main className="min-h-screen overflow-x-clip">
      <Navigation activeSection={`#${activeSection}`} onOpenExplorer={() => setIsExplorerOpen(true)} />
      <ScrollIndicator activeSection={activeSection} />
      <SystemStateRail activeSection={activeSection} />
      <BuildExplorer
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
        onOpenProject={(projectId) => {
          setFocusedProjectId(projectId);
          setIsExplorerOpen(false);
        }}
      />
      <ProjectDeepDive project={focusedProject} onClose={() => setFocusedProjectId(null)} />

      <section id="hero">
        <Hero onOpenProject={(projectId) => setFocusedProjectId(projectId)} />
      </section>

      <section id="building" className="scroll-mt-20">
        <CurrentlyBuilding active={activeSection === 'building'} />
      </section>

      <section id="projects" className="scroll-mt-20">
        <Projects
          active={activeSection === 'projects'}
          focusedProjectId={focusedProjectId}
          onOpenProject={(projectId) => setFocusedProjectId(projectId)}
        />
      </section>

      <section id="process" className="scroll-mt-20">
        <HowIBuild active={activeSection === 'process'} />
      </section>

      <footer id="contact" className="section-shell relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.08),transparent_34%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-[1120px] rounded-[32px] border border-white/8 bg-white/[0.025] px-6 py-10 md:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            Footer
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-text-secondary transition-all duration-500">
            <span className={`h-2 w-2 rounded-full ${activeSection === 'contact' ? 'bg-accent shadow-[0_0_16px_rgba(76,175,80,0.55)]' : 'bg-white/20'}`} />
            Channel {activeSection === 'contact' ? 'Open' : 'Standby'}
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[0.04em] text-text-primary md:text-4xl">
            Let&apos;s build something impactful.
          </h2>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 font-display text-sm uppercase tracking-[0.18em] text-text-primary transition-all duration-300 hover:scale-[1.02] hover:border-accent/20 hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 font-display text-sm uppercase tracking-[0.18em] text-text-primary transition-all duration-300 hover:scale-[1.02] hover:border-accent/20 hover:text-accent"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
