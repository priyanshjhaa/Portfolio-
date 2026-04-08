import { about, sectionCopy } from '@/lib/data';

export default function About() {
  const stats = [
    { label: 'ENG', value: 'Systems', color: 'text-text-primary' },
    { label: 'Full', value: 'Stack', color: 'text-text-primary' },
    { label: 'ON', value: 'Grind', color: 'text-accent' },
    { label: '24/7', value: 'Shipping', color: 'text-text-primary' },
  ];

  return (
    <section className="section-shell relative overflow-hidden px-4 py-20 md:py-28">
      <div className="absolute inset-0 grid-pattern opacity-20 md:opacity-35" />
      <div className="ambient-orb left-[-6%] bottom-[10%] h-[320px] w-[320px] opacity-50 md:h-[520px] md:w-[520px]" />
      <div className="absolute inset-y-0 left-[max(1rem,calc(50%-34rem))] hidden w-px bg-gradient-to-b from-transparent via-accent/18 to-transparent lg:block" />

      <div className="relative z-10 mx-auto max-w-[1080px]">
        <div className="mb-12 max-w-2xl">
          <p className="section-kicker mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-sm bg-accent" />
            {sectionCopy.about.eyebrow}
          </p>
          <h2 className="section-heading mb-4">{sectionCopy.about.title}</h2>
          <p className="text-sm leading-relaxed text-text-secondary md:text-base">
            {sectionCopy.about.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="panel-chrome rounded-[26px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/20"
                >
                  <p className={`font-display text-4xl font-semibold uppercase tracking-[0.1em] ${stat.color}`}>
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-[11px] uppercase tracking-[0.24em] text-text-muted">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-white/6 bg-white/[0.025] p-5">
              <p className="font-display text-[10px] uppercase tracking-[0.26em] text-text-muted">{sectionCopy.about.territoryTitle}</p>
              <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.08em] text-text-primary">
                {sectionCopy.about.territoryValue}
              </p>
            </div>
          </div>

          <div className="panel-chrome hud-corners rounded-[32px] p-6 md:p-8">
            <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
            <div className="relative">
              <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.26em] text-text-muted">{sectionCopy.about.bioTitle}</p>
                  <p className="mt-3 font-display text-3xl font-semibold uppercase tracking-[0.08em] text-text-primary">
                    {sectionCopy.about.bioHeading}
                  </p>
                </div>
                <div className="rounded-2xl border border-accent/15 bg-accent/10 px-3 py-2 text-left sm:text-right">
                  <p className="font-display text-[9px] uppercase tracking-[0.22em] text-accent/80">{sectionCopy.about.modeTitle}</p>
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent">{sectionCopy.about.modeValue}</p>
                </div>
              </div>

              <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                {about.bio}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
                  <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">{sectionCopy.about.approachTitle}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {sectionCopy.about.approachText}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
                  <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">{sectionCopy.about.signalTitle}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {sectionCopy.about.signalText}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent/60" />
                <p className="text-sm text-text-muted">{sectionCopy.about.footerText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
