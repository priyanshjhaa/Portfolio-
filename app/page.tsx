'use client';

import Navigation from '@/components/ui/Navigation';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import Hero from '@/components/sections/Hero';
import BuildLogs from '@/components/sections/BuildLogs';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Timeline from '@/components/sections/Timeline';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <Navigation />
      <ScrollIndicator />

      <section id="hero">
        <Hero />
      </section>

      <section>
        <BuildLogs />
      </section>

      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>

      <section id="about" className="scroll-mt-20">
        <About />
      </section>

      <section id="timeline" className="scroll-mt-20">
        <Timeline />
      </section>

      <section id="skills" className="scroll-mt-20">
        <Skills />
      </section>

      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>

      <footer className="section-shell relative overflow-hidden px-4 py-12">
        <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
        <div className="relative mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 rounded-[28px] border border-white/6 bg-white/[0.025] px-6 py-6 md:flex-row">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Priyansh Jha
          </p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-accent/50" />
            <span className="font-display text-[10px] uppercase tracking-[0.24em] text-accent/70">
              Progress saved
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
