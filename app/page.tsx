'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/ui/Navigation';
import BuildExplorer from '@/components/ui/BuildExplorer';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import EngineeringTrace from '@/components/sections/EngineeringTrace';
import FieldContact from '@/components/sections/FieldContact';

const sectionIds = ['hero', 'projects', 'trace', 'contact'] as const;

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
        <Projects onOpenProject={openProject} />
      </section>

      <section id="trace" className="scroll-mt-20">
        <EngineeringTrace />
      </section>

      <FieldContact active={activeSection === 'contact'} />
    </main>
  );
}
