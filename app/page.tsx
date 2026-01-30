'use client';

import Navigation from '@/components/ui/Navigation';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ScrollIndicator />

      <section id="hero">
        <Hero />
      </section>

      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>

      <section id="about" className="scroll-mt-20">
        <About />
      </section>

      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>

      {/* Footer - Save Points */}
      <footer className="py-12 px-4 border-t border-[#1a1a1a]">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Priyansh
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-accent/50 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent/60">
              Progress saved
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
