import { ArrowDownRight, Github } from 'lucide-react';
import { contact, currentBuild, heroContent } from '@/lib/data';
import DotField from '@/components/fun/DotField';
import Magnetic from '@/components/fun/Magnetic';
import Marquee from '@/components/fun/Marquee';
import ScrambleText from '@/components/fun/ScrambleText';
import SystemGraph from '@/components/fun/SystemGraph';

const tickerItems = [
  'TypeScript',
  'Next.js',
  'Go',
  'PostgreSQL',
  'pgvector',
  'Redis + BullMQ',
  'NestJS',
  'LLM tool loops',
  'Approval gates',
  'Cited evidence',
  'Tenant isolation',
  'Docker',
  'Observability',
  'Idempotency',
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <DotField />
      <div className="wrap hero__wrap">
        <div className="hero__grid">
          <div data-reveal>
            <p className="status status--live">{contact.availability}</p>
            <h1 id="hero-title" className="display hero__title">
              I make <span className="hero__complex">complex</span> systems feel{' '}
              <em>
                <ScrambleText text="clear." delay={500} />
              </em>
            </h1>
            <p className="lede hero__intro">{heroContent.description}</p>

            <div className="hero__actions">
              <Magnetic>
                <a className="btn btn--primary" href="#work">
                  See selected work <ArrowDownRight aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn" href={`mailto:${contact.email}`}>
                  Email me
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn" href={contact.github} target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" /> GitHub
                </a>
              </Magnetic>
            </div>

            <dl className="hero__meta">
              <div>
                <dt className="sr-only">Role</dt>
                <dd>
                  <strong>Full-stack product engineer</strong>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Focus</dt>
                <dd>Developer tools · AI workflows · SaaS</dd>
              </div>
              <div>
                <dt className="sr-only">Location</dt>
                <dd>{contact.location}</dd>
              </div>
            </dl>
          </div>

          <div className="hero__graph" data-reveal>
            <SystemGraph />
          </div>
        </div>

        <div className="now" data-reveal>
          <p className="eyebrow now__label">
            <span className="now__pulse" aria-hidden="true" /> Now building
          </p>
          <ul className="now__list">
            {currentBuild.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <Marquee items={tickerItems} label="Tools and practices I work with" />
    </section>
  );
}
