import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { leverageAreas } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';

interface LeverageProps {
  active?: boolean;
}

export default function Leverage({ active = false }: LeverageProps) {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,124,255,0.07),transparent_28%)] pointer-events-none" />
      <div className="absolute inset-0 texture-dot-matrix opacity-[0.18] [mask-image:radial-gradient(circle_at_75%_45%,black,transparent_68%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <Reveal className="max-w-xl lg:sticky lg:top-28">
            <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
              Where I Add Leverage
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[0.04em] text-text-primary md:text-5xl">
              Give me a product problem with real ambiguity.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              I work best when the product needs someone to connect user experience, system design, and delivery instead of treating them as separate jobs.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-hover"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={100} className="etched-surface technical-marker overflow-hidden rounded-[28px] border border-white/8 bg-[#0b0b0b]/90">
            {leverageAreas.map((area, index) => (
              <div
                key={area.title}
                className="border-b border-white/8 p-6 transition-colors duration-300 last:border-b-0 hover:bg-accent/[0.035] md:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/18 bg-accent/[0.08] text-accent">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.2em] text-accent/75">
                      Ownership 0{index + 1}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-[0.03em] text-text-primary">
                      {area.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-text-secondary">
                      {area.description}
                    </p>
                    <p className="mt-4 font-display text-[10px] uppercase tracking-[0.16em] text-text-muted">
                      Evidence: {area.evidence}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
