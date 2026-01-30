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
      className="min-h-screen flex items-center justify-center px-4 py-16 md:py-20 relative overflow-hidden"
    >
      {/* Background grid - even lighter on mobile */}
      <div className="absolute inset-0 grid-pattern opacity-[0.01] md:opacity-[0.015]" />

      {/* Grid fade overlay behind hero content */}
      <div className="absolute inset-0 bg-gradient-to-b from-gta via-transparent to-gta/80 pointer-events-none" />

      {/* Multi-layered ambient glows - reduced on mobile */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/4 md:bg-accent/6 rounded-full blur-[100px] md:blur-[120px] pointer-events-none glow-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-accent/3 md:bg-accent/4 rounded-full blur-[80px] md:blur-[100px] pointer-events-none glow-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-accent/2 md:bg-accent/3 rounded-full blur-[120px] md:blur-[150px] pointer-events-none glow-pulse" style={{ animationDelay: '0.75s' }} />

      {/* Corner accents with glow - asymmetric (top-left only) */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 w-16 h-16 md:w-24 md:h-24 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/40 md:from-accent/60 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-accent/40 md:from-accent/60 to-transparent" />
        <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-l-2 border-t-2 border-accent/30 md:border-accent/40 rounded-tl-sm" />
      </div>

      <div className="max-w-[1000px] w-full mx-auto relative z-10">
        <div className="animate-fade-up md:ml-8">
          {/* PLAYER HUD */}
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 bg-[#080808] border border-[#1a1a1a] rounded-lg hover:border-accent/30 transition-all duration-300">
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-text-muted">Player</span>
              <span className="w-px h-2.5 md:h-3 bg-[#1a1a1a]" />
              <span className="text-xs md:text-sm font-bold text-accent tracking-wide">Priyansh Jha</span>
            </div>
          </div>

          {/* NOW BUILDING */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-8">
              <div className="relative status-ring">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-accent rounded-full" />
                <div className="absolute inset-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-accent rounded-full animate-ping opacity-60" />
                <div className="absolute -inset-3 md:-inset-4 bg-accent/10 md:bg-accent/15 rounded-full blur-md md:blur-lg" />
              </div>
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.25em] md:tracking-[0.35em] text-accent">
                Now Building
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-tight mb-4 md:mb-6">
              I build systems that <span className="text-accent relative inline-block">ship<span className="absolute -bottom-1.5 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-accent/25 -skew-x-12 rounded-sm blur-[1px]" /></span>.
            </h1>

            <p className="text-sm md:text-lg text-text-secondary max-w-xl leading-relaxed">
              Computer science student. Focused on execution-driven software, not demo apps.
            </p>
          </div>

          {/* STATUS BLOCK */}
          <div className="mb-8 md:mb-12 p-5 md:p-8 bg-[#080808] border border-[#1a1a1a] rounded-xl relative overflow-hidden gradient-border hover:border-accent/20 transition-all duration-300">
            {/* Inner gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] md:from-accent/[0.05] via-transparent to-accent/[0.01] md:to-accent/[0.02] pointer-events-none" />

            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-text-muted/60 mb-5 md:mb-8 relative">Status</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-16 gap-y-4 md:gap-y-5 relative">
              <div className="flex items-center justify-between md:justify-start md:gap-4 group">
                <span className="text-text-muted/60 text-[10px] md:text-xs uppercase tracking-wider">Primary Focus</span>
                <span className="text-text-primary font-semibold text-sm md:text-base">Execution Systems</span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-4 group">
                <span className="text-text-muted/60 text-[10px] md:text-xs uppercase tracking-wider">Current Build</span>
                <span className="text-accent font-bold text-base md:text-lg relative">
                  Execute
                </span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-4 group">
                <span className="text-text-muted/60 text-[10px] md:text-xs uppercase tracking-wider">Background</span>
                <span className="text-text-primary font-semibold text-sm md:text-base">Full-stack / AI</span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-4 group">
                <span className="text-text-muted/60 text-[10px] md:text-xs uppercase tracking-wider">Mode</span>
                <div className="flex items-center gap-2">
                  <span className="text-accent font-bold text-sm md:text-base whitespace-nowrap">Shipping</span>
                  <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* SKILL STATS */}
          <div className="mb-8 md:mb-12 p-4 md:p-6 bg-[#080808] border border-[#1a1a1a] rounded-xl relative overflow-hidden hover:border-accent/15 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] md:from-accent/[0.04] to-transparent pointer-events-none" />
            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-text-muted mb-4 md:mb-6 relative">Capabilities</p>
            <div className="space-y-3 md:space-y-4 relative">
              {[
                { name: 'Full-stack', level: 72 },
                { name: 'AI / LLMs', level: 65 },
                { name: 'Systems Design', level: 58 },
              ].map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex items-center mb-1.5 md:mb-2">
                    <span className="text-[11px] md:text-xs font-semibold text-text-primary group-hover:text-accent transition-colors">{skill.name}</span>
                  </div>
                  <div className="h-1 md:h-1.5 bg-[#121212] rounded-full overflow-hidden border border-[#1a1a1a]">
                    <div
                      className="h-full bg-gradient-to-r from-accent/60 to-accent/80 rounded-full transition-all duration-1000 ease-out relative"
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-2 md:w-4 bg-gradient-to-l from-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-text-muted">Execute Progress</span>
              <span className="text-sm md:text-base font-mono font-bold text-accent">{displayProgress}%</span>
            </div>
            <div className="h-2 md:h-2.5 bg-[#121212] rounded-full overflow-hidden shadow-inner border border-[#1a1a1a]">
              <div
                className="h-full bg-gradient-to-r from-accent/70 via-accent to-accent/70 rounded-full transition-all duration-1200 ease-out relative progress-glow"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-l from-white/25 via-white/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />
              </div>
            </div>
          </div>

          {/* CTA - thumb friendly */}
          <button
            onClick={scrollToProjects}
            className="group shimmer relative inline-flex items-center justify-center gap-3 md:gap-4 w-full sm:w-auto bg-accent text-gta px-6 md:px-10 py-4 min-h-[48px] text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-accent-hover transition-all duration-300 focus-ring rounded-lg overflow-hidden shadow-xl shadow-accent/20 hover:shadow-accent/30"
          >
            <span className="relative flex items-center gap-2 md:gap-3">
              View Current Build
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-105 md:group-hover:translate-x-1.5 md:group-hover:scale-110 inline-block">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
