import { about } from '@/lib/data';

export default function About() {
  const stats = [
    { label: 'CS', value: 'Student', color: 'text-text-primary' },
    { label: 'Full', value: 'Stack', color: 'text-text-primary' },
    { label: 'ON', value: 'Grind', color: 'text-accent' },
    { label: '24/7', value: 'Shipping', color: 'text-text-primary' },
  ];

  return (
    <section className="py-24 px-4 border-t border-[#1a1a1a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-sm" />
            Profile
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Stats
          </h2>
          <p className="text-text-muted text-sm">
            Territory: Full-stack systems with real execution
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <p className={`text-3xl font-bold mb-2 relative ${stat.color}`}>
                {stat.label}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted relative">
                {stat.value}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-accent/0 group-hover:bg-accent/30 transition-colors" />
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="p-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent pointer-events-none" />
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-4">Bio</p>
            <p className="text-lg text-text-secondary leading-relaxed">
              {about.bio}
            </p>
          </div>
        </div>

        {/* Save Points */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-accent/50 rounded-full" />
          <p className="text-sm text-text-muted">
            Built to run, not reset.
          </p>
        </div>
      </div>
    </section>
  );
}
