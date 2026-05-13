'use client';

import { ArrowRight, ArrowUpRight, Github, Layers3, Workflow } from 'lucide-react';
import { contact, heroContent, projects } from '@/lib/data';

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
        <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent/75">
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

interface HeroProps {
  onOpenProject: (projectId: string) => void;
}

export default function Hero({ onOpenProject }: HeroProps) {
  const liveProjects = projects.filter((project) => project.liveUrl).length;
  const featuredProject = projects.find((project) => project.featured);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-shell relative overflow-hidden px-4 pb-16 pt-24 md:pb-24 md:pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(76,175,80,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(76,175,80,0.08),transparent_24%)] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-[0.08]" />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="rounded-[36px] border border-white/8 bg-[#090909]/88 p-8 shadow-[0_32px_80px_-52px_rgba(0,0,0,0.95)] backdrop-blur-xl md:p-12">
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

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={scrollToProjects}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-gta transition-all duration-300 hover:scale-[1.02] hover:bg-accent-hover"
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
              </div>

              <div className="mt-8">
                <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">
                  Choose Your Path
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={scrollToProjects}
                    className="group rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-left transition-all duration-300 hover:border-accent/20 hover:bg-accent/[0.06]"
                  >
                    <div className="flex items-center justify-between">
                      <Layers3 className="h-4 w-4 text-accent" />
                      <ArrowRight className="h-4 w-4 text-text-muted transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    <p className="mt-4 font-display text-xs uppercase tracking-[0.18em] text-text-primary">
                      Explore Builds
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const element = document.querySelector('#process');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-left transition-all duration-300 hover:border-accent/20 hover:bg-accent/[0.06]"
                  >
                    <div className="flex items-center justify-between">
                      <Workflow className="h-4 w-4 text-accent" />
                      <ArrowRight className="h-4 w-4 text-text-muted transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    <p className="mt-4 font-display text-xs uppercase tracking-[0.18em] text-text-primary">
                      See How I Build
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => featuredProject && onOpenProject(featuredProject.id)}
                    className="group rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-left transition-all duration-300 hover:border-accent/20 hover:bg-accent/[0.06]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        <div className="h-4 w-4 rounded-full border border-accent/40 bg-accent/10" />
                        <div className="absolute inset-1 rounded-full bg-accent" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-text-muted transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    <p className="mt-4 font-display text-xs uppercase tracking-[0.18em] text-text-primary">
                      Open System
                    </p>
                  </button>
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
                      <p className="font-display text-[10px] uppercase tracking-[0.28em] text-text-muted">
                        System Dashboard
                      </p>
                      <p className="mt-2 font-display text-2xl font-semibold uppercase tracking-[0.1em] text-text-primary">
                        Operational Focus
                      </p>
                    </div>
                    <div className="rounded-xl border border-accent/20 bg-accent/10 px-3 py-2 font-display text-[10px] uppercase tracking-[0.24em] text-accent">
                      Live
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: 'System Status', value: 'Live' },
                      { label: 'Active Builds', value: '1' },
                      { label: 'Live Releases', value: String(liveProjects) },
                      { label: 'Tracked Systems', value: String(projects.length - 1) },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/6 bg-black/20 p-4">
                        <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                          {item.label}
                        </p>
                        <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.08em] text-text-primary">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
                      <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">
                        Primary Stack
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        Next.js, Node.js, LLM APIs, queues, webhooks.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
                      <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">
                        Operating Mode
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        Build fast, tighten systems, iterate with intent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ambient-orb -right-10 bottom-4 h-48 w-48 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
