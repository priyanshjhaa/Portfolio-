'use client';

import { useEffect, useRef, useState } from 'react';
import { heroContent, projects } from '@/lib/data';

const systemNodes = [
  { id: 'core', label: 'Execution Core', x: 210, y: 146, size: 22, delay: '0s', drift: 'node-drift-slow' },
  { id: 'llm', label: 'LLM', x: 210, y: 54, size: 8, delay: '0.5s', drift: 'node-drift-mid' },
  { id: 'api', label: 'API', x: 314, y: 98, size: 10, delay: '1.1s', drift: 'node-drift-slow' },
  { id: 'worker', label: 'Worker', x: 326, y: 208, size: 9, delay: '1.5s', drift: 'node-drift-fast' },
  { id: 'auth', label: 'Auth', x: 210, y: 256, size: 8, delay: '0.9s', drift: 'node-drift-mid' },
  { id: 'queue', label: 'Queue', x: 94, y: 208, size: 10, delay: '1.8s', drift: 'node-drift-fast' },
  { id: 'systems', label: 'Systems', x: 106, y: 98, size: 9, delay: '0.3s', drift: 'node-drift-slow' },
];

const systemLinks = [
  { from: [210, 54], to: [210, 146], delay: '0.2s' },
  { from: [314, 98], to: [210, 146], delay: '0.9s' },
  { from: [326, 208], to: [210, 146], delay: '1.4s' },
  { from: [210, 256], to: [210, 146], delay: '0.6s' },
  { from: [94, 208], to: [210, 146], delay: '1.8s' },
  { from: [106, 98], to: [210, 146], delay: '1.1s' },
  { from: [106, 98], to: [210, 54], delay: '2.1s' },
  { from: [314, 98], to: [326, 208], delay: '2.5s' },
  { from: [94, 208], to: [210, 256], delay: '2.9s' },
];

function SystemVisual() {
  return (
    <div className="system-visual group relative h-[380px] rounded-[32px] border border-white/6 bg-black/25 xl:h-[410px]">
      <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-accent/[0.04] via-transparent to-white/[0.02]" />
      <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(76,175,80,0.14),rgba(76,175,80,0.05)_38%,transparent_72%)] blur-2xl pointer-events-none" />
      <div className="absolute inset-0 topographic-pattern opacity-10 pointer-events-none" />
      <div className="absolute left-8 top-6">
        <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent/75">System Core • Running</p>
        <p className="mt-2 font-display text-lg font-semibold uppercase tracking-[0.1em] text-text-primary">
          Live Execution Engine
        </p>
      </div>

      <div className="absolute inset-x-8 bottom-7 grid grid-cols-3 gap-3 text-[9px]">
        {['AI Systems', 'Backend Infra', 'Automation Pipelines'].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-white/6 bg-black/20 px-3 py-2.5 text-center font-display uppercase tracking-[0.18em] text-text-muted"
          >
            {label}
          </div>
        ))}
      </div>

      <svg
        viewBox="0 0 420 320"
        className="absolute inset-x-6 bottom-20 top-16 h-auto w-[calc(100%-3rem)]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(153,255,170,0.92)" />
            <stop offset="35%" stopColor="rgba(76,175,80,0.34)" />
            <stop offset="100%" stopColor="rgba(76,175,80,0)" />
          </radialGradient>
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <g className="system-visual-rotate origin-center opacity-70">
          {systemLinks.map((link, index) => (
            <g key={`${link.from.join('-')}-${link.to.join('-')}`}>
              <line
                x1={link.from[0]}
                y1={link.from[1]}
                x2={link.to[0]}
                y2={link.to[1]}
                stroke="rgba(76,175,80,0.13)"
                strokeWidth="1.2"
                className="system-link-base"
              />
              <line
                x1={link.from[0]}
                y1={link.from[1]}
                x2={link.to[0]}
                y2={link.to[1]}
                stroke="rgba(153,255,170,0.34)"
                strokeWidth="1"
                strokeDasharray="10 180"
                strokeLinecap="round"
                className="line-signal"
                style={{ animationDelay: `${index * 0.25}s, ${link.delay}` }}
              />
            </g>
          ))}
        </g>

        <g className="system-visual-rotate origin-center">
          <circle cx="210" cy="146" r="62" fill="url(#coreGlow)" filter="url(#softGlow)" className="core-halo" />

          {systemNodes.map((node) => (
            <g
              key={node.id}
              className={`network-node ${node.drift}`}
              style={{ animationDelay: node.delay }}
            >
              {node.id === 'core' && (
                <>
                  <circle cx={node.x} cy={node.y} r={32} fill="rgba(76,175,80,0.1)" className="core-ring" />
                  <circle cx={node.x} cy={node.y} r={24} fill="rgba(76,175,80,0.18)" className="core-ring-inner" />
                </>
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={node.id === 'core' ? 'rgba(9,16,10,0.96)' : 'rgba(7,10,8,0.96)'}
                stroke={node.id === 'core' ? 'rgba(153,255,170,0.88)' : 'rgba(76,175,80,0.5)'}
                strokeWidth={node.id === 'core' ? '1.9' : '1.2'}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={Math.max(2.2, node.size * 0.24)}
                fill={node.id === 'core' ? 'rgba(214,255,221,0.95)' : 'rgba(153,255,170,0.78)'}
              />

              {node.id !== 'core' && (
                <g className="node-label">
                  <rect
                    x={node.x - 24}
                    y={node.y - 32}
                    rx="8"
                    width="48"
                    height="18"
                    fill="rgba(6,10,7,0.92)"
                    stroke="rgba(76,175,80,0.18)"
                  />
                  <text
                    x={node.x}
                    y={node.y - 19}
                    textAnchor="middle"
                    className="fill-text-primary text-[8px] font-display uppercase tracking-[0.18em]"
                  >
                    {node.label}
                  </text>
                </g>
              )}
            </g>
          ))}
        </g>

        <text
          x="210"
          y="150"
          textAnchor="middle"
          className="fill-text-primary text-[9px] font-display uppercase tracking-[0.24em]"
        >
          EXECUTION CORE
        </text>
      </svg>
    </div>
  );
}

export default function Hero() {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const targetProgress = 78;
  const liveProjects = projects.filter((project) => project.liveUrl).length;

  useEffect(() => {
    const duration = 1200;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const currentValue = Math.floor(startValue + (targetProgress - startValue) * easeOut);

      setDisplayProgress(currentValue);

      if (progressRatio < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 md:py-20">
      <div className="absolute inset-0 grid-pattern opacity-[0.02] md:opacity-[0.04]" />
      <div className="absolute inset-0 topographic-pattern pointer-events-none opacity-70" />
      <div className="ambient-orb left-[-10%] top-[10%] h-[300px] w-[300px] opacity-90 md:h-[430px] md:w-[430px]" />
      <div className="ambient-orb right-[4%] top-[16%] h-[380px] w-[380px] opacity-55 md:h-[470px] md:w-[470px]" />
      <div className="ambient-orb-sharp right-[16%] top-[18%] h-24 w-24 opacity-80 md:h-32 md:w-32" />
      <div className="absolute inset-0 bg-gradient-to-b from-gta via-transparent to-gta/90 pointer-events-none" />

      <div className="absolute left-6 top-8 hidden h-24 w-24 md:block">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/60 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-accent/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="hero-frame animate-fade-up lg:pl-6">
          <div className="mb-6 inline-flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5">
            <span className="font-display text-[10px] uppercase tracking-[0.28em] text-text-muted">Player</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="font-display text-lg font-semibold uppercase tracking-[0.18em] text-accent">Priyansh Jha</span>
          </div>

          <div className="mb-10 max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative status-ring">
                <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-accent animate-ping opacity-60" />
                <div className="absolute -inset-4 rounded-full bg-accent/10 blur-lg" />
              </div>
              <span className="font-display text-[11px] uppercase tracking-[0.35em] text-accent">
                {heroContent.eyebrow}
              </span>
            </div>

            <h1 className="max-w-3xl font-display text-4xl font-semibold uppercase leading-[0.98] tracking-[0.04em] text-text-primary sm:text-5xl md:text-7xl xl:text-[6rem]">
              <span className="headline-highlight">{heroContent.title}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-text-secondary md:text-xl">
              {heroContent.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5 md:gap-3">
              {heroContent.proofItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/6 bg-white/[0.035] px-3.5 py-2.5 font-display text-[10px] uppercase tracking-[0.18em] text-text-secondary md:px-4 md:text-[11px] md:tracking-[0.2em]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10 grid gap-5 md:grid-cols-[minmax(0,1fr)_240px]">
            <div className="panel-chrome hud-corners gradient-border rounded-3xl p-6 md:p-7">
              <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.28em] text-text-muted/80">Status</p>
                    <p className="mt-2 font-display text-2xl font-semibold uppercase tracking-[0.1em] text-text-primary">
                      {heroContent.statusTitle}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-accent/15 bg-accent/10 px-3 py-2 text-right">
                    <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent/80">Current Build</p>
                    <p className="font-display text-lg font-semibold uppercase tracking-[0.12em] text-accent">Execute</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {heroContent.statusItems.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/6 bg-black/20 px-4 py-3">
                      <p className="font-display text-[9px] uppercase tracking-[0.24em] text-text-muted">{item.label}</p>
                      <p className="mt-2 text-sm font-semibold text-text-primary">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel-chrome signal-sweep rounded-3xl p-5">
              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">Primary Metric</p>
                    <p className="mt-2 font-display text-3xl font-semibold text-accent">{displayProgress}%</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl border border-accent/20 bg-accent/10 p-2">
                    <div className="flex h-full items-center justify-center rounded-xl border border-accent/15 bg-black/20 font-display text-xs uppercase tracking-[0.2em] text-accent">
                      Live
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-text-secondary">
                  Prioritizing deterministic workflows, observability, and frictionless developer tooling.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-3xl border border-white/6 bg-white/[0.025] p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-[10px] uppercase tracking-[0.26em] text-text-muted">Execute Progress</span>
              <span className="font-display text-lg font-semibold text-accent">{displayProgress}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full border border-white/5 bg-[#121212]">
              <div
                className="progress-glow relative h-full rounded-full bg-gradient-to-r from-accent/60 via-accent to-[#9dffb0] transition-all duration-[1400ms] ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />
                <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white/25 to-transparent" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={scrollToProjects}
              className="group shimmer inline-flex min-h-[54px] items-center justify-center gap-3 rounded-2xl bg-accent px-7 py-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-gta shadow-[0_18px_38px_-20px_rgba(76,175,80,0.5)] transition-all duration-300 hover:scale-[1.01] hover:bg-accent-hover hover:shadow-[0_22px_44px_-20px_rgba(76,175,80,0.58)]"
            >
              <span className="relative z-10">{heroContent.cta}</span>
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            <div className="flex min-h-[54px] items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.025] px-4 py-3 md:px-5">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">Current Direction</p>
                <p className="text-sm text-text-primary">{heroContent.direction}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="mb-5">
            <SystemVisual />
          </div>

          <div className="panel-drift panel-chrome rounded-[32px] p-6">
            <div className="absolute inset-0 topographic-pattern opacity-14 pointer-events-none" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.28em] text-text-muted">System Dashboard</p>
                  <p className="mt-2 font-display text-2xl font-semibold uppercase tracking-[0.1em] text-text-primary">
                    Operational Focus
                  </p>
                </div>
                <div className="rounded-xl border border-accent/20 bg-accent/10 px-3 py-2 font-display text-[10px] uppercase tracking-[0.24em] text-accent">
                  Live
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {heroContent.dashboardItems.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/6 bg-black/20 p-4">
                    <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">{item.label}</p>
                    <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.08em] text-text-primary">
                      {item.label === 'Live Releases' ? liveProjects : item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
                  <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">Primary Stack</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">Next.js, Node.js, LLM APIs, queues, webhooks.</p>
                </div>
                <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
                  <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">Operating Mode</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">Build fast, tighten systems, iterate with intent.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ambient-orb -right-10 bottom-4 h-48 w-48 opacity-50" />
        </div>
      </div>
    </section>
  );
}
