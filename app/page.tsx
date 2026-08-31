'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/ui/Navigation';
import BuildExplorer from '@/components/ui/BuildExplorer';
import Hero from '@/components/sections/Hero';
import FieldContact from '@/components/sections/FieldContact';

function ChapterLoading() {
  return (
    <div className="mx-auto min-h-[70vh] max-w-[1240px] px-4 py-24 md:px-8" aria-hidden="true">
      <div className="h-3 w-36 animate-pulse rounded-full bg-white/8" />
      <div className="mt-7 h-16 max-w-2xl animate-pulse rounded-3xl bg-white/[0.045]" />
      <div className="mt-12 h-80 animate-pulse rounded-[32px] border border-white/8 bg-white/[0.025]" />
    </div>
  );
}

const CapabilitiesLab = dynamic(() => import('@/components/sections/CapabilitiesLab'), { loading: ChapterLoading });
const ProcessLab = dynamic(() => import('@/components/sections/ProcessLab'), { loading: ChapterLoading });
const ProjectPortals = dynamic(() => import('@/components/sections/ProjectPortals'), { loading: ChapterLoading });
const EvidenceLab = dynamic(() => import('@/components/sections/EvidenceLab'), { loading: ChapterLoading });

const sectionIds = ['intro', 'skills', 'process', 'work', 'evidence', 'contact'] as const;

export default function Home() {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('intro');

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

    let frame = 0;
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const marker = window.scrollY + window.innerHeight * 0.38;
        let current: (typeof sectionIds)[number] = 'intro';
        sections.forEach((section) => {
          if (section.offsetTop <= marker) current = section.id as (typeof sectionIds)[number];
        });
        setActiveSection(current);
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
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

      <section id="intro">
        <Hero />
      </section>

      <section id="skills" className="scroll-mt-20">
        <CapabilitiesLab />
      </section>

      <section id="process" className="scroll-mt-20">
        <ProcessLab />
      </section>

      <section id="work" className="scroll-mt-20">
        <ProjectPortals />
      </section>

      <section id="evidence" className="scroll-mt-20">
        <EvidenceLab />
      </section>

      <FieldContact active={activeSection === 'contact'} />
    </main>
  );
}
