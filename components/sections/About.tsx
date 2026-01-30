import { about } from '@/lib/data';

export default function About() {
  const stats = [
    { label: 'CS', value: 'Student', color: 'text-text-primary' },
    { label: 'Full', value: 'Stack', color: 'text-text-primary' },
    { label: 'ON', value: 'Grind', color: 'text-accent' },
    { label: '24/7', value: 'Shipping', color: 'text-text-primary' },
  ];

  return (
    <section className="py-16 md:py-24 px-4 border-t border-[#1a1a1a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-25 md:opacity-40" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/3 md:bg-accent/4 rounded-full blur-[80px] md:blur-[120px] pointer-events-none glow-pulse" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-accent mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent rounded-sm" />
            Profile
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-3 md:mb-4">
            Stats
          </h2>
          <p className="text-text-muted text-xs md:text-sm">
            Territory: Full-stack systems with real execution
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-4 md:p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] md:from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <p className={`text-2xl md:text-3xl font-bold mb-1.5 md:mb-2 relative ${stat.color}`}>
                {stat.label}
              </p>
              <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-text-muted relative">
                {stat.value}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-3 right-3 md:left-4 md:right-4 h-px bg-accent/0 group-hover:bg-accent/30 transition-colors" />
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="p-5 md:p-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl relative overflow-hidden mb-6 md:mb-8 hover:border-accent/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] md:from-accent/[0.04] to-transparent pointer-events-none" />
          <div className="relative">
            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-text-muted mb-3 md:mb-4">Bio</p>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              {about.bio}
            </p>
          </div>
        </div>

        {/* Save Points */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent/50 rounded-full" />
          <p className="text-xs md:text-sm text-text-muted">
            Built to run, not reset.
          </p>
        </div>
      </div>
    </section>
  );
}
