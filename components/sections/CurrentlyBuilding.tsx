import { currentBuild } from '@/lib/data';

interface CurrentlyBuildingProps {
  active?: boolean;
}

export default function CurrentlyBuilding({ active = false }: CurrentlyBuildingProps) {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-12 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(167,162,154,0.08),transparent_26%)] pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="rounded-[28px] border border-white/8 bg-white/[0.025] p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-text-secondary transition-all duration-500">
            <span className={`h-2 w-2 rounded-full ${active ? 'bg-accent shadow-[0_0_16px_rgba(167,162,154,0.45)]' : 'bg-white/20'}`} />
            {active ? 'Build Feed Active' : 'Build Feed'}
          </div>
          <p className="mt-4 font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            {currentBuild.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[0.04em] text-text-primary md:text-4xl">
            {currentBuild.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            {currentBuild.description}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {currentBuild.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/6 bg-black/20 px-4 py-3"
              >
                <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
