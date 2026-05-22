import { receipts } from '@/lib/data';

interface ReceiptsProps {
  active?: boolean;
}

export default function Receipts({ active = false }: ReceiptsProps) {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.07),transparent_36%)] pointer-events-none" />
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent transition-opacity duration-500 pointer-events-none ${active ? 'opacity-100' : 'opacity-40'}`} />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-text-secondary transition-all duration-500">
            <span className={`h-2 w-2 rounded-full ${active ? 'bg-accent shadow-[0_0_16px_rgba(76,175,80,0.55)]' : 'bg-white/20'}`} />
            {active ? 'Receipts Active' : 'Receipts'}
          </div>
          <p className="mt-4 font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            Receipts
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[0.04em] text-text-primary md:text-5xl">
            Concrete engineering outcomes a startup can evaluate quickly.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {receipts.map((receipt, index) => (
            <div
              key={receipt}
              className="rounded-[24px] border border-white/8 bg-white/[0.025] p-5 transition-all duration-300 hover:border-accent/18 hover:bg-accent/[0.04]"
            >
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-accent/80">
                Receipt 0{index + 1}
              </p>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">{receipt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
