'use client';

import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const targetProgress = 78;

  // Animate the progress number with counting effect
  useEffect(() => {
    const duration = 1200;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const currentValue = Math.floor(startValue + (targetProgress - startValue) * easeOut);

      setDisplayProgress(currentValue);

      if (progressRatio < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    // Also animate the progress bar after a small delay
    const barTimer = setTimeout(() => setProgress(targetProgress), 100);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(barTimer);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Multi-layered ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/1 rounded-full blur-[150px] pointer-events-none" />

      {/* Corner accents with glow */}
      <div className="absolute top-8 left-8 w-20 h-20 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/50 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-accent/50 to-transparent" />
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-accent/30 rounded-tl-sm" />
      </div>
      <div className="absolute bottom-8 right-8 w-20 h-20 pointer-events-none hidden md:block">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-accent/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-accent/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-accent/30 rounded-br-sm" />
      </div>

      <div className="max-w-[1000px] w-full mx-auto relative z-10">
        <div className="animate-fade-up">
          {/* PLAYER HUD */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#080808] border border-[#1a1a1a] rounded-lg">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted">Player</span>
              <span className="w-px h-3 bg-[#1a1a1a]" />
              <span className="text-sm font-bold text-accent tracking-wide">Priyansh</span>
            </div>
          </div>

          {/* NOW BUILDING */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative status-ring">
                <div className="w-2.5 h-2.5 bg-accent rounded-full" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-accent rounded-full animate-ping opacity-60" />
                <div className="absolute -inset-4 bg-accent/15 rounded-full blur-lg" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">
                Now Building
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-6">
              I build systems that <span className="text-accent relative inline-block">ship<span className="absolute -bottom-2 left-0 right-0 h-3 bg-accent/25 -skew-x-12 rounded-sm blur-[1px]" /></span>.
            </h1>

            <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
              Computer science student. Focused on execution-driven software, not demo apps.
            </p>
          </div>

          {/* STATUS BLOCK */}
          <div className="mb-12 p-8 bg-[#080808] border border-[#1a1a1a] rounded-xl relative overflow-hidden gradient-border">
            {/* Inner gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-accent/[0.01] pointer-events-none" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-8 relative">Status</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 relative">
              <div className="flex items-center gap-4 group">
                <span className="text-text-muted text-sm w-32 group-hover:text-text-primary transition-colors">Primary Focus</span>
                <span className="text-text-primary font-semibold">Execution Systems</span>
              </div>
              <div className="flex items-center gap-4 group">
                <span className="text-text-muted text-sm w-32 group-hover:text-text-primary transition-colors">Current Build</span>
                <span className="text-accent font-semibold relative">
                  Execute
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <span className="text-text-muted text-sm w-32 group-hover:text-text-primary transition-colors">Background</span>
                <span className="text-text-primary font-semibold">Full-stack / AI</span>
              </div>
              <div className="flex items-center gap-4 group">
                <span className="text-text-muted text-sm w-32 group-hover:text-text-primary transition-colors">Mode</span>
                <div className="flex items-center gap-2">
                  <span className="text-text-primary font-semibold">Shipping</span>
                  <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* SKILL STATS */}
          <div className="mb-12 p-6 bg-[#080808] border border-[#1a1a1a] rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent pointer-events-none" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-6 relative">Skill Stats</p>
            <div className="space-y-4 relative">
              {[
                { name: 'Full-stack', level: 72 },
                { name: 'AI / LLMs', level: 65 },
                { name: 'Systems Design', level: 58 },
              ].map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-text-primary group-hover:text-accent transition-colors">{skill.name}</span>
                    <span className="text-xs font-mono text-text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-[#121212] rounded-full overflow-hidden border border-[#1a1a1a]">
                    <div
                      className="h-full bg-gradient-to-r from-accent/50 to-accent/70 rounded-full transition-all duration-1000 ease-out relative"
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white/15 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Execute Progress</span>
              <span className="text-base font-mono font-bold text-accent">{displayProgress}%</span>
            </div>
            <div className="h-2.5 bg-[#121212] rounded-full overflow-hidden shadow-inner border border-[#1a1a1a]">
              <div
                className="h-full bg-gradient-to-r from-accent/60 via-accent to-accent/60 rounded-full transition-all duration-1200 ease-out relative progress-glow"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/20 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={scrollToProjects}
            className="group shimmer relative inline-flex items-center gap-4 bg-accent text-gta px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent-hover transition-all duration-200 focus-ring rounded-lg overflow-hidden shadow-xl shadow-accent/15"
          >
            <span className="relative flex items-center gap-3">
              View Current Build
              <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-110 inline-block">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
