'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import BuildExplorer from '@/components/ui/BuildExplorer';
import Hero from '@/components/sections/Hero';
import CurrentlyBuilding from '@/components/sections/CurrentlyBuilding';
import Projects from '@/components/sections/Projects';
import HowIBuild from '@/components/sections/HowIBuild';
import { contact } from '@/lib/data';

export default function Home() {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

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

  return (
    <main className="min-h-screen overflow-x-clip">
      <Navigation onOpenExplorer={() => setIsExplorerOpen(true)} />
      <ScrollIndicator />
      <BuildExplorer isOpen={isExplorerOpen} onClose={() => setIsExplorerOpen(false)} />

      <section id="hero">
        <Hero />
      </section>

      <section id="building" className="scroll-mt-20">
        <CurrentlyBuilding />
      </section>

      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>

      <section id="process" className="scroll-mt-20">
        <HowIBuild />
      </section>

      <footer id="contact" className="section-shell relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.08),transparent_34%)] pointer-events-none" />
        <div className="relative mx-auto max-w-[1120px] rounded-[32px] border border-white/8 bg-white/[0.025] px-6 py-10 md:px-10">
          <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            Footer
          </p>
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
