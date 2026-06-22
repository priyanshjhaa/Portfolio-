'use client';

import { ArrowUpRight, Github } from 'lucide-react';
import { contact, heroContent, projects } from '@/lib/data';
import PointerSurface from '@/components/ui/PointerSurface';

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
      <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(201, 135, 111,0.18),rgba(167, 162, 154,0.08)_42%,transparent_72%)] blur-2xl pointer-events-none" />
      <div className="absolute inset-0 topographic-pattern opacity-10 pointer-events-none" />

      <div className="absolute left-8 top-6">
        <p className="font-display text-[10px] uppercase tracking-[0.24em] text-signal/85">
          System Core • Running
        </p>
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
            <stop offset="0%" stopColor="rgba(222, 217, 209,0.94)" />
            <stop offset="35%" stopColor="rgba(201, 135, 111,0.42)" />
            <stop offset="100%" stopColor="rgba(201, 135, 111,0)" />
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
                stroke="rgba(167, 162, 154,0.14)"
                strokeWidth="1.2"
                className="system-link-base"
              />
              <line
                x1={link.from[0]}
                y1={link.from[1]}
                x2={link.to[0]}
                y2={link.to[1]}
                stroke="rgba(222, 217, 209,0.4)"
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
                  <circle cx={node.x} cy={node.y} r={32} fill="rgba(201, 135, 111,0.14)" className="core-ring" />
                  <circle cx={node.x} cy={node.y} r={24} fill="rgba(201, 135, 111,0.22)" className="core-ring-inner" />
                </>
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={node.id === 'core' ? 'rgba(14,14,14,0.96)' : 'rgba(23,23,22,0.96)'}
                stroke={node.id === 'core' ? 'rgba(239, 203, 188,0.92)' : 'rgba(167, 162, 154,0.56)'}
                strokeWidth={node.id === 'core' ? '1.9' : '1.2'}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={Math.max(2.2, node.size * 0.24)}
                fill={node.id === 'core' ? 'rgba(241,239,234,0.95)' : 'rgba(222,217,209,0.82)'}
              />

              {node.id !== 'core' && (
                <g className="node-label">
                  <rect
                    x={node.x - 24}
                    y={node.y - 32}
                    rx="8"
                    width="48"
                    height="18"
                    fill="rgba(14,14,14,0.94)"
                    stroke="rgba(167, 162, 154,0.2)"
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
  const liveProjects = projects.filter((project) => project.liveUrl).length;

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-shell relative overflow-hidden px-4 pb-16 pt-24 md:pb-24 md:pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(167, 162, 154,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(201, 135, 111,0.09),transparent_24%)] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
      <div className="absolute inset-0 texture-circuit opacity-[0.13] [mask-image:linear-gradient(to_bottom,black,transparent_82%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <PointerSurface className="hero-pointer-surface etched-surface technical-marker rounded-[36px] border border-white/8 bg-[#171716]/88 p-8 shadow-[0_32px_80px_-52px_rgba(0,0,0,0.95)] backdrop-blur-xl md:p-12">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] xl:gap-12">
            <div className="max-w-4xl">
              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-accent/80">
                {heroContent.eyebrow}
              </p>

              <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.95] tracking-[0.03em] text-text-primary md:text-6xl xl:text-7xl">
                {heroContent.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary">
                {heroContent.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {heroContent.hiringValues.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.18em] text-text-secondary"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-signal/90 md:text-base">
                {heroContent.hiringNote}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={scrollToProjects}
                  className="primary-action inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-signal px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-[#0E0E0E] transition-all duration-300 hover:scale-[1.02] hover:bg-signal-hover"
                >
                  {heroContent.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-text-primary transition-all duration-300 hover:scale-[1.02] hover:border-accent/20 hover:text-accent"
                >
                  {heroContent.secondaryCta}
                  <Github className="h-4 w-4" />
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-signal/22 bg-signal/[0.08] px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-signal transition-all duration-300 hover:scale-[1.02] hover:border-signal/35 hover:bg-signal/[0.13]"
                >
                  Let&apos;s Work Together
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-9 grid gap-3 border-t border-white/8 pt-6 sm:grid-cols-3">
                {[
                  { value: String(projects.length), label: 'Products built' },
                  { value: String(liveProjects), label: 'Live releases' },
                  { value: 'End to end', label: 'Product ownership' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-lg font-semibold tracking-[0.05em] text-text-primary">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <SystemVisual />

              <div className="ambient-orb -right-10 bottom-4 h-48 w-48 opacity-50" />
            </div>
          </div>
        </PointerSurface>
      </div>
    </section>
  );
}
