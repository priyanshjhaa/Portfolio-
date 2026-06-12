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
          <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            How I Build
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[0.04em] text-text-primary md:text-5xl">
            Product judgment and engineering discipline belong together.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/8 bg-white/8 md:grid-cols-2">
          {howIBuild.map((item, index) => (
            <div
              key={item}
              className="bg-[#0b0b0b] p-6 transition-colors duration-300 hover:bg-accent/[0.035] md:p-8"
            >
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-accent/75">
                Principle 0{index + 1}
              </p>
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
