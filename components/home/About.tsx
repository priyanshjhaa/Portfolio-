import Image from 'next/image';
import Link from 'next/link';
import { contact, currentBuild, leverageAreas, projects, readme } from '@/lib/data';
import Parallax from '@/components/motion/Parallax';
import Stagger from '@/components/motion/Stagger';

const projectByName = (name: string) => projects.find((project) => project.name === name.trim());

function Heading({ children }: { children: string }) {
  return (
    <h3 className="readme__h">
      <span aria-hidden="true">## </span>
      {children}
    </h3>
  );
}

export default function About() {
  const keyWidth = Math.max(...readme.principles.map((item) => item.key.length));
  const valueWidth = Math.max(...readme.principles.map((item) => item.value.length));

  return (
    <section id="about" className="section section--plate about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="section__head" data-reveal>
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">01</span> whoami
            </p>
            <h2 id="about-title" className="h-section">
              The engineer
              <br />
              behind the <em>systems.</em>
            </h2>
          </div>
          <p className="lede">
            The short version of who I am, how I work, and what I optimise for — written like the first file you open in a new repo.
          </p>
        </div>

        <div className="about__grid">
          <Parallax distance={22} className="about__id">
            <figure className="idcard" data-reveal>
              <div className="idcard__photo">
                <Image
                  src="/profile/priyansh.webp"
                  alt="Portrait of Priyansh Jha"
                  width={840}
                  height={1120}
                  sizes="(max-width: 900px) 70vw, 340px"
                />
                <span className="idcard__sweep" aria-hidden="true" />
              </div>
              <figcaption>
                <p className="idcard__status">
                  <span className="status status--live">{contact.availability}</span>
                </p>
                <dl className="idcard__rows">
                  {readme.idCard.map((row) => (
                    <div key={row.key}>
                      <dt>{row.key}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </figcaption>
            </figure>
          </Parallax>

          <article className="readme" data-reveal aria-label="README">
            <header className="readme__tab">
              <span className="readme__dots" aria-hidden="true">
                <i /> <i /> <i />
              </span>
              <span className="readme__file">README.md</span>
              <span className="readme__branch">main</span>
            </header>

            <Stagger className="readme__body" step={90}>
              <div className="readme__block">
                <h3 className="readme__title">
                  <span aria-hidden="true"># </span>Priyansh Jha
                </h3>
                {readme.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="readme__block">
                <Heading>what I do</Heading>
                <ul className="readme__do">
                  {leverageAreas.map((area) => (
                    <li key={area.title}>
                      <strong>{area.title}</strong>
                      <span className="readme__refs">
                        {area.evidence.split(',').map((name) => {
                          const project = projectByName(name);
                          return project ? (
                            <Link key={project.id} href={`/systems/${project.id}/`}>
                              {project.name}
                            </Link>
                          ) : null;
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="readme__block">
                <Heading>how I work</Heading>
                <pre className="readme__code" aria-label="Operating principles">
                  <code>
                    <span className="tok-comment"># principles.yml</span>
                    {'\n'}
                    {readme.principles.map((item) => (
                      <span key={item.key} className="readme__line">
                        <span className="tok-key">{item.key.padEnd(keyWidth)}</span>
                        <span className="tok-punct">: </span>
                        <span className="tok-value">{item.value.padEnd(valueWidth)}</span>
                        <span className="tok-comment">  # {item.note}</span>
                        {'\n'}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>

              <div className="readme__block">
                <Heading>working with me</Heading>
                <ul className="readme__list">
                  {readme.workingWithMe.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="readme__block">
                <Heading>currently</Heading>
                <ul className="readme__now">
                  {currentBuild.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="readme__block">
                <Heading>things I believe</Heading>
                <ol className="readme__beliefs">
                  {readme.beliefs.map((belief) => (
                    <li key={belief}>{belief}</li>
                  ))}
                </ol>
              </div>

              <p className="readme__prompt" aria-hidden="true">
                <span>{readme.prompt}</span> ~ % <i className="readme__cursor" />
              </p>
            </Stagger>
          </article>
        </div>
      </div>
    </section>
  );
}
