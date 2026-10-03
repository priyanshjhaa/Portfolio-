import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types/project';
import { projects } from '@/lib/data';
import { getProjectImageAspectRatio } from '@/lib/project-images';
import { getProjectState, getWalkthroughHref, projectNumber } from '@/lib/project-state';
import TiltCard from '@/components/fun/TiltCard';
import Pipeline from '@/components/fun/Pipeline';

const featuredIds = ['sprout', 'atlas', 'execute', 'codemap'];

const featured = featuredIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project));

const earlier = projects.filter((project) => !featuredIds.includes(project.id));

function hostLabel(project: Project) {
  if (project.liveUrl) return project.liveUrl.replace(/^https?:\/\//, '');
  return `${project.name.toLowerCase()} — local build`;
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const state = getProjectState(project);
  const caseHref = `/systems/${project.id}/`;
  const [width, height] = getProjectImageAspectRatio(project.id).split(' / ').map(Number);

  return (
    <li className="work" data-reveal>
      <div className="work__text">
        <span className="work__bignum" aria-hidden="true">{projectNumber(index)}</span>
        <div className="work__top">
          <span className="work__index">{project.proofFrame?.eyebrow ?? 'Product'}</span>
          <span className={`status status--${state.tone}`}>{state.label}</span>
        </div>

        <h3 className="work__name">
          <Link href={caseHref}>{project.name}</Link>
        </h3>
        <p className="work__summary">{project.summary}</p>

        {project.keyDecision && (
          <p className="work__decision">
            <span>Key decision</span>
            {project.keyDecision}
          </p>
        )}

        {project.proofPoints && (
          <ul className="work__proof">
            {project.proofPoints.slice(0, 3).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}

        <p className="work__stack">{project.stack.join(' · ')}</p>

        <div className="work__links">
          <Link className="btn btn--primary btn--small" href={caseHref}>
            Read case study <ArrowRight aria-hidden="true" />
          </Link>
          {project.liveUrl ? (
            <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit live <ArrowUpRight aria-hidden="true" />
            </a>
          ) : (
            <a className="text-link" href={getWalkthroughHref(project)}>
              Request a walkthrough <ArrowUpRight aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              Source <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
        {state.note && <p className="work__note">{state.note}</p>}
      </div>

      {project.image && (
        <div className="work__media">
          <TiltCard>
            <Link href={caseHref} className="shot" aria-label={`${project.name} case study`}>
              <div className="shot__bar" aria-hidden="true">
                <i /> <i /> <i />
                <span>{hostLabel(project)}</span>
              </div>
              <Image
                src={project.image}
                alt={`${project.name} product landing page`}
                width={width || 1600}
                height={height || 900}
                sizes="(max-width: 960px) 100vw, 640px"
              />
            </Link>
          </TiltCard>
          {project.flowSteps && <Pipeline steps={project.flowSteps} duration={4 + project.flowSteps.length} />}
        </div>
      )}
    </li>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <div className="section__head" data-reveal>
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title" className="h-section">
              Enter a system.
              <br />
              Follow the <em>decisions.</em>
            </h2>
          </div>
          <p className="lede">
            Developer tools and AI systems built end to end — interface, data model, execution path, and the safeguards in between. Each case study explains the decisions, not just the stack.
          </p>
        </div>

        <ol className="work-list">
          {featured.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </ol>

        {earlier.length > 0 && (
          <div className="earlier" data-reveal>
            <h3 className="eyebrow earlier__title">Earlier work</h3>
            <ul className="earlier__list">
              {earlier.map((project) => {
                const state = getProjectState(project);
                return (
                  <li key={project.id} className="earlier__row">
                    <h3>
                      <Link href={`/systems/${project.id}/`}>{project.name}</Link>
                    </h3>
                    <p>{project.summary}</p>
                    <span className={`status status--${state.tone}`}>{state.label}</span>
                    <div className="earlier__links">
                      <Link className="text-link text-link--forward" href={`/systems/${project.id}/`}>
                        Case study <ArrowRight aria-hidden="true" />
                      </Link>
                      {project.liveUrl && (
                        <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live <ArrowUpRight aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
