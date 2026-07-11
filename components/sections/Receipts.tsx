import { receipts } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';

interface ReceiptsProps {
  active?: boolean;
}

export default function Receipts({ active = false }: ReceiptsProps) {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,162,154,0.07),transparent_36%)] pointer-events-none" />
      <div className="absolute inset-0 texture-rulings opacity-[0.22] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <Reveal className="mb-10 max-w-3xl">
          <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">Engineering Receipts</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[0.04em] text-text-primary md:text-5xl">
            Concrete work behind the product claims.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            A few of the systems and engineering decisions I have implemented across recent builds.
          </p>
        </Reveal>

        <Reveal delay={100} className="etched-surface technical-marker surface-polish overflow-hidden rounded-[28px] border border-white/8 bg-[#0b0b0b]/90">
          {receipts.map((receipt, index) => (
            <div
              key={receipt}
              className="quiet-row grid gap-3 border-b border-white/8 px-5 py-5 transition-colors duration-300 last:border-b-0 hover:bg-accent/[0.045] md:grid-cols-[80px_1fr] md:items-center md:px-7"
            >
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-accent/80">
                0{index + 1}
              </p>
              <p className="text-base leading-relaxed text-text-secondary">{receipt}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
