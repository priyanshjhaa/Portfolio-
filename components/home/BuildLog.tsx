import { recentBuilds } from '@/lib/data';
import ArchiveGallery from '@/components/home/ArchiveGallery';

export default function BuildLog() {
  return (
    <section id="log" className="section" aria-labelledby="log-title">
      <div className="wrap">
        <div className="section__head" data-reveal>
          <div>
            <p className="eyebrow">03 / Evidence</p>
            <h2 id="log-title" className="h-section">
              The work leaves
              <br />
              a <em>signal.</em>
            </h2>
          </div>
          <p className="lede">Claims fade quickly. Real interfaces and a visible shipping trail make the engineering legible.</p>
        </div>

        <ArchiveGallery />

        <div className="log__head" data-reveal>
          <p className="eyebrow">Recent shipping</p>
          <p className="archive__hint">A visible trail of iteration, month by month.</p>
        </div>

        <ol className="log">
          {recentBuilds.map((entry) => (
            <li key={entry.period} className="log__entry" data-reveal>
              <h3 className="log__period">{entry.period}</h3>
              <ul className="log__items">
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
