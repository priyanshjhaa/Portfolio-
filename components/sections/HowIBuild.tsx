import { howIBuild } from '@/lib/data';

interface HowIBuildProps {
  active?: boolean;
}

export default function HowIBuild({ active = false }: HowIBuildProps) {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
      <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent transition-opacity duration-500 pointer-events-none ${active ? 'opacity-100' : 'opacity-40'}`} />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-text-secondary transition-all duration-500">
            <span className={`h-2 w-2 rounded-full ${active ? 'bg-accent shadow-[0_0_16px_rgba(76,175,80,0.55)]' : 'bg-white/20'}`} />
            {active ? 'Process Active' : 'Process Layer'}
          </div>
          <p className="mt-4 font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            How I Build
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[0.04em] text-text-primary md:text-5xl">
            Systems first. Production ready by default.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {howIBuild.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 transition-all duration-300 hover:scale-[1.02] hover:border-accent/16"
            >
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
