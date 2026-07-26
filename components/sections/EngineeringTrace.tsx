import { ArrowUpRight, Check, GitCommitHorizontal } from 'lucide-react';
import { currentBuild, howIBuild, leverageAreas, receipts, recentBuilds } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';

export default function EngineeringTrace() {
  return (
    <section className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="grid gap-8 border-b border-white/8 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="field-label">Engineering trace</p>
            <h2 className="mt-4 font-editorial text-[clamp(3.5rem,7vw,6.8rem)] leading-[0.9] tracking-[-0.055em] text-text-primary">
              The work leaves
              <br />
              <span className="italic text-[#b7c6aa]">evidence.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-text-secondary lg:justify-self-end">
            Product claims are easy. These are the implementation decisions, operating habits, and shipped systems behind mine.
          </p>
        </Reveal>

        <div className="grid border-b border-white/8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="border-b border-white/8 py-14 lg:border-b-0 lg:border-r lg:pr-12">
            <div className="flex items-center justify-between gap-4">
              <p className="field-label">Now / build log</p>
              <span className="flex items-center gap-2 text-xs text-[#b7c6aa]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#b7c6aa]" />
                Active
              </span>
            </div>
            <h3 className="mt-5 font-editorial text-4xl tracking-[-0.035em] text-text-primary">{currentBuild.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">{currentBuild.description}</p>
            <div className="mt-8 space-y-0 border-y border-white/8">
              {currentBuild.items.map((item, index) => (
                <div key={item} className="grid grid-cols-[40px_1fr] gap-3 border-b border-white/8 py-4 last:border-0">
                  <span className="font-display text-[9px] text-text-muted">0{index + 1}</span>
                  <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="py-14 lg:pl-12">
            <div className="flex items-center justify-between gap-4">
              <p className="field-label">Receipts</p>
              <span className="font-display text-[8px] uppercase tracking-[0.16em] text-text-muted">Concrete build evidence</span>
            </div>
            <div className="mt-7 grid gap-px overflow-hidden rounded-[24px] border border-white/8 bg-white/8 sm:grid-cols-2">
              {receipts.map((receipt, index) => (
                <div key={receipt} className="min-h-40 bg-[#111210] p-5 transition-colors hover:bg-[#151714]">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[9px] text-[#b7c6aa]">0{index + 1}</span>
                    <Check className="h-3.5 w-3.5 text-text-muted" />
                  </div>
                  <p className="mt-8 text-sm leading-relaxed text-text-secondary">{receipt}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid border-b border-white/8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="border-b border-white/8 py-14 lg:border-b-0 lg:border-r lg:pr-12">
            <p className="field-label">Recent shipping</p>
            <div className="relative mt-8">
              <div className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10" />
              <div className="space-y-9">
                {recentBuilds.map((entry) => (
                  <div key={entry.period} className="relative grid gap-4 pl-8 sm:grid-cols-[110px_1fr] sm:pl-8">
                    <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-[#b7c6aa]/60 bg-[#0d0e0d]" />
                    <p className="font-display text-[9px] uppercase tracking-[0.16em] text-[#b7c6aa]">{entry.period}</p>
                    <div className="space-y-2">
                      {entry.items.map((item) => (
                        <p key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                          <GitCommitHorizontal className="mt-1 h-3.5 w-3.5 shrink-0 text-text-muted" />
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="py-14 lg:pl-12">
            <p className="field-label">Operating principles</p>
            <div className="mt-7 divide-y divide-white/8 border-y border-white/8">
              {howIBuild.map((principle, index) => (
                <div key={principle} className="grid grid-cols-[42px_1fr] gap-3 py-5">
                  <span className="font-editorial text-xl italic text-text-muted">0{index + 1}</span>
                  <p className="text-sm leading-relaxed text-text-secondary">{principle}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="field-label">Where I add leverage</p>
              <h3 className="mt-4 font-editorial text-4xl tracking-[-0.035em] text-text-primary">
                Useful across the product boundary.
              </h3>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm text-[#b7c6aa] hover:text-text-primary">
                Start a conversation <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="divide-y divide-white/8 border-y border-white/8">
              {leverageAreas.map((area, index) => (
                <div key={area.title} className="grid gap-4 py-6 md:grid-cols-[44px_0.8fr_1.2fr]">
                  <span className="font-display text-[9px] text-text-muted">0{index + 1}</span>
                  <h4 className="text-base font-medium text-text-primary">{area.title}</h4>
                  <div>
                    <p className="text-sm leading-relaxed text-text-secondary">{area.description}</p>
                    <p className="mt-3 font-display text-[8px] uppercase tracking-[0.15em] text-text-muted">Evidence / {area.evidence}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
