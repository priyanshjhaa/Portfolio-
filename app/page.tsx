'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import BuildExplorer from '@/components/ui/BuildExplorer';
import Hero from '@/components/sections/Hero';
import Receipts from '@/components/sections/Receipts';
import Projects from '@/components/sections/Projects';
import Leverage from '@/components/sections/Leverage';
import HowIBuild from '@/components/sections/HowIBuild';
import { contact } from '@/lib/data';

const sectionIds = ['hero', 'projects', 'leverage', 'receipts', 'process', 'contact'] as const;

export default function Home() {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('hero');

  const openProject = (projectId: string) => {
    window.location.href = `/systems/${projectId}`;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsExplorerOpen((current) => !current);
      }

      if (event.key === 'Escape') {
        setIsExplorerOpen(false);
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

  return (
    <main className="min-h-screen overflow-x-clip">
      <Navigation activeSection={`#${activeSection}`} onOpenExplorer={() => setIsExplorerOpen(true)} />
      <BuildExplorer
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
        onOpenProject={(projectId) => {
          setIsExplorerOpen(false);
          openProject(projectId);
        }}
      />

      <section id="hero">
        <Hero />
      </section>

      <section id="projects" className="scroll-mt-20">
        <Projects
          active={activeSection === 'projects'}
          onOpenProject={openProject}
        />
      </section>

      <section id="leverage" className="scroll-mt-20">
        <Leverage active={activeSection === 'leverage'} />
      </section>

      <section id="receipts" className="scroll-mt-20">
        <Receipts active={activeSection === 'receipts'} />
      </section>

      <section id="process" className="scroll-mt-20">
        <HowIBuild active={activeSection === 'process'} />
      </section>

      <footer id="contact" className="section-shell relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,90,0.09),transparent_34%)] pointer-events-none" />
        <div className="absolute inset-0 texture-dot-matrix opacity-[0.14] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)] pointer-events-none" />
        <div className="etched-surface technical-marker relative mx-auto max-w-[1120px] rounded-[32px] border border-white/8 bg-[#0E1426]/88 px-6 py-10 md:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            Let&apos;s Work Together
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-text-secondary transition-all duration-500">
            <span className={`h-2 w-2 rounded-full ${activeSection === 'contact' ? 'bg-signal shadow-[0_0_16px_rgba(255,107,90,0.55)]' : 'bg-white/20'}`} />
            {contact.availability}
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[0.04em] text-text-primary md:text-4xl">
            Have a product that needs thoughtful engineering and decisive execution?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            {contact.focus}
          </p>

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
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 font-display text-sm uppercase tracking-[0.18em] text-text-primary transition-all duration-300 hover:scale-[1.02] hover:border-accent/20 hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={contact.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 font-display text-sm uppercase tracking-[0.18em] text-text-primary transition-all duration-300 hover:scale-[1.02] hover:border-accent/20 hover:text-accent"
            >
              X
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
