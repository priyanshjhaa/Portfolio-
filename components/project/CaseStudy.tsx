import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/types/project';
import { projects } from '@/lib/data';
import { getProjectImageAspectRatio } from '@/lib/project-images';
import { getProjectState, getWalkthroughHref } from '@/lib/project-state';
import ArchitectureFlow from '@/components/project/ArchitectureFlow';

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="cs-block" data-reveal>
      <h2 className="cs-block__label">{label}</h2>
      <div className="cs-block__content">{children}</div>
    </section>
  );
}

export default function CaseStudy({ project }: { project: Project }) {
  const state = getProjectState(project);
  const position = projects.findIndex((entry) => entry.id === project.id);
  const next = projects[(position + 1) % projects.length];
  const [width, height] = getProjectImageAspectRatio(project.id).split(' / ').map(Number);

  return (
    <article>
      <header className="cs-hero">
        <div className="wrap">
          <Link href="/#work" className="cs-back">
            <ArrowLeft aria-hidden="true" /> All work
          </Link>

          <div data-reveal>
            <h1 className="display cs-hero__title">{project.name}</h1>
            <p className="cs-hero__summary">{project.summary}</p>
          </div>

          <dl className="cs-meta" data-reveal>
            <div>
              <dt>Status</dt>
              <dd>
                <span className={`status status--${state.tone}`}>{state.label}</span>
              </dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>
                <ul>
                  {(project.ownership ?? ['Design and engineering, end to end']).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.join(', ')}</dd>
            </div>
            <div>
              <dt>Links</dt>
              <dd className="cs-links">
                {project.liveUrl ? (
                  <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live site <ArrowUpRight aria-hidden="true" />
                  </a>
                ) : (
                  <a className="text-link" href={getWalkthroughHref(project)}>
                    Request a walkthrough <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
                {project.githubUrl && (
                  <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden="true" /> Source
                  </a>
                )}
              </dd>
            </div>
          </dl>
          {state.note && <p className="cs-note">{state.note}</p>}
        </div>
      </header>

      {project.image && (
        <div className="wrap cs-shot" data-reveal>
          <figure className="shot" style={{ margin: 0 }}>
            <div className="shot__bar" aria-hidden="true">
              <i /> <i /> <i />
              <span>{project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '') : `${project.name.toLowerCase()} — local build`}</span>
            </div>
            <Image src={project.image} alt={`${project.name} product landing page`} width={width || 1600} height={height || 900} priority sizes="(max-width: 1240px) 100vw, 1200px" />
          </figure>
        </div>
      )}

      <div className="wrap cs-body">
        <Block label="The problem">
          <h2>{project.problem}</h2>
          {project.whyBuiltThis && <p>{project.whyBuiltThis}</p>}
        </Block>

        <Block label="The approach">
          <p>{project.approach}</p>
          {project.details && <p>{project.details}</p>}
        </Block>

        {project.keyDecision && (
          <Block label="Defining decision">
            <figure className="cs-quote">
              <blockquote>{project.keyDecision}</blockquote>
              {project.tradeoff && (
                <figcaption className="cs-tradeoff">
                  <span>The tradeoff</span>
                  <p>{project.tradeoff}</p>
                </figcaption>
              )}
            </figure>
          </Block>
        )}

        {project.architectureStages && project.architectureStages.length > 0 && (
          <Block label="How it works">
            <p>Step through the system. Each stage lists the safeguard that keeps it trustworthy.</p>
            <ArchitectureFlow stages={project.architectureStages} projectId={project.id} />
          </Block>
        )}

        {project.architectureNotes && project.architectureNotes.length > 0 && (
          <Block label="Architecture notes">
            <ul className="cs-list">
              {project.architectureNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </Block>
        )}

        {(project.proofPoints || project.productionSignals) && (
          <Block label={project.proofTitle ?? 'What is built'}>
            <div className="cs-two">
              {project.proofPoints && (
                <div>
                  <h3>Built and working</h3>
                  <ul className="cs-list">
                    {project.proofPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.productionSignals && (
                <div>
                  <h3>Engineering signals</h3>
                  <ul className="cs-list">
                    {project.productionSignals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Block>
        )}

        {project.nextStep && (
          <Block label="What’s next">
            <p>{project.nextStep}</p>
          </Block>
        )}
      </div>

      {next && next.id !== project.id && (
        <nav className="wrap cs-next" aria-label="Next project">
          <span className="eyebrow">Next project</span>
          <Link href={`/systems/${next.id}/`}>
            {next.name} <ArrowRight aria-hidden="true" />
          </Link>
          <p className="muted" style={{ margin: 0 }}>{next.summary}</p>
        </nav>
      )}
    </article>
  );
}
