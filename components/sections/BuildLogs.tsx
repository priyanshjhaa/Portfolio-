import { buildLogs } from '@/lib/data';

export default function BuildLogs() {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-14 md:py-18">
      <div className="absolute inset-0 grid-pattern opacity-[0.14]" />
      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-accent">
            What I&apos;ve Built
          </p>
        </div>

        <div className="grid gap-4 md:gap-5">
          {buildLogs.map((log) => (
            <div
              key={log.id}
              className="rounded-[24px] border border-white/6 bg-white/[0.025] px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/18"
            >
              <div className="grid gap-3 md:grid-cols-[130px_minmax(0,220px)_minmax(0,1fr)] md:items-start">
                <span className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
                  {log.label}
                </span>
                <span className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-text-primary">
                  {log.name}
                </span>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {log.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
