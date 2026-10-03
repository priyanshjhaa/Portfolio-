import Link from 'next/link';
import { buildStages, capabilities, projects } from '@/lib/data';
import { projectNumber } from '@/lib/project-state';
import StepsProgress from '@/components/fun/StepsProgress';

const projectName = (id: string) => projects.find((project) => project.id === id)?.name ?? id;

export default function Approach() {
  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="section__head" data-reveal>
          <div>
            <p className="eyebrow">02 / Approach</p>
            <h2 id="approach-title" className="h-section">
              From ambiguity
              <br />
              to <em>operation.</em>
            </h2>
          </div>
          <p className="lede">
            The same loop runs through every project: understand the constraint, give the system a spine, make it real early, and put safeguards where mistakes get expensive.
          </p>
        </div>

        <StepsProgress>
        <ol className="steps">
          {buildStages.map((stage, index) => (
            <li key={stage.id} className="step" data-reveal>
              <span className="step__num">{projectNumber(index)}</span>
              <h3 className="step__verb">{stage.verb}</h3>
              <div>
                <p className="step__title">{stage.title}</p>
                <p className="step__desc">{stage.description}</p>
              </div>
              <span className="step__artifact">{stage.artifact}</span>
            </li>
          ))}
        </ol>
        </StepsProgress>

        <div className="caps">
          <div className="caps__intro" data-reveal>
            <p className="eyebrow">What I can own</p>
            <h3 className="h-section caps__title">
              Skills connected to <em>proof.</em>
            </h3>
          </div>
          <ul className="caps__grid" data-reveal>
            {capabilities.map((capability) => (
              <li key={capability.id} className="cap">
                <h3>{capability.label}</h3>
                <p>{capability.description}</p>
                <p className="cap__skills">{capability.skills.join(' · ')}</p>
                <div className="cap__used" aria-label={`Used in ${capability.projectIds.map(projectName).join(', ')}`}>
                  {capability.projectIds.map((id) => (
                    <Link key={id} href={`/systems/${id}/`}>
                      {projectName(id)}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
            <li className="cap">
              <h3>Where I’m going deeper</h3>
              <p>Go service design for Sprout’s control API, and production operations for Atlas: deployment, backups, rollback, and release acceptance.</p>
              <p className="cap__skills">Go · Docker · PostgreSQL operations</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
