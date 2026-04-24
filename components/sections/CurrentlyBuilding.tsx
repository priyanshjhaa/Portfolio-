import { currentBuild } from '@/lib/data';

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="section-shell relative overflow-hidden px-4 py-12 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(76,175,80,0.08),transparent_26%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="rounded-[28px] border border-white/8 bg-white/[0.025] p-6 md:p-8">
          <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            {currentBuild.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[0.04em] text-text-primary md:text-4xl">
            {currentBuild.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            {currentBuild.description}
          </p>
        </div>
      </div>
    </section>
  );
}
