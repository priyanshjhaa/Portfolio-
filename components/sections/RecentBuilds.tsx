import { recentBuilds } from '@/lib/data';

interface RecentBuildsProps {
  active?: boolean;
}

export default function RecentBuilds({ active = false }: RecentBuildsProps) {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
      <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent transition-opacity duration-500 pointer-events-none ${active ? 'opacity-100' : 'opacity-40'}`} />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-text-secondary transition-all duration-500">
            <span className={`h-2 w-2 rounded-full ${active ? 'bg-accent shadow-[0_0_16px_rgba(76,175,80,0.55)]' : 'bg-white/20'}`} />
            {active ? 'Shipping Timeline Active' : 'Recent Builds'}
          </div>
          <p className="mt-4 font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            Recent Builds
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[0.04em] text-text-primary md:text-5xl">
            A running log of shipped work, refactors, and active engineering momentum.
          </h2>
        </div>

        <div className="space-y-4">
          {recentBuilds.map((group) => (
            <div
              key={group.period}
              className="rounded-[26px] border border-white/8 bg-white/[0.025] p-6"
            >
              <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent/85">
                {group.period}
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/6 bg-black/20 px-4 py-3"
                  >
                    <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
