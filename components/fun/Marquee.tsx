/** An endless, pausable ticker. Content is duplicated once for a seamless loop. */
export default function Marquee({ items, reverse = false, label }: { items: string[]; reverse?: boolean; label: string }) {
  return (
    <div className={`marquee${reverse ? ' marquee--reverse' : ''}`} role="region" aria-label={label}>
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee__group" aria-hidden={copy === 1 ? 'true' : undefined}>
            {items.map((item) => (
              <li key={`${copy}-${item}`}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
