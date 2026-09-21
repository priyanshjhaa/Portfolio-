import Image from 'next/image';
import type { ReactNode } from 'react';
import { about, buildStages, capabilities, contact, currentBuild, heroContent, howIBuild, projects, receipts, recentBuilds } from '@/lib/data';
import { bookChapters, bookHref, bookPages, type BookPage } from '@/lib/book';
import { getProjectImageAspectRatio } from '@/lib/project-images';
import type { Project } from '@/types/project';

function Note({ label, children }: { label: string; children: ReactNode }) {
  return <section className="book-note"><h3>{label}</h3>{children}</section>;
}
function Lines({ items }: { items: string[] }) {
  return <ul className="book-lines">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
export function ProjectLinks({ project }: { project: Project }) {
  return <div className="book-links">
    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source on GitHub <span aria-hidden="true">↗</span></a>}
    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit product <span aria-hidden="true">↗</span></a>}
  </div>;
}
export function BookPageContent({ page }: { page: BookPage }) {
  const project = projects.find(item => item.id === page.projectId);
  switch (page.kind) {
    case 'cover': return <div className="book-cover">
      <p className="book-eyebrow">Priyansh Jha · Product engineer</p>
      <div className="book-cover-title"><span className="book-ornament" aria-hidden="true">✳</span><h1 tabIndex={-1} data-page-heading>A book<br />of <em>work.</em></h1><p>Ideas, systems, and the care<br />that connects them.</p></div>
      <figure className="book-cover-portrait"><Image src="/profile/priyansh.webp" alt="Priyansh Jha" width={180} height={210} priority sizes="140px" /><figcaption>A little about me.<br />A lot about what I build.</figcaption></figure>
      <div className="book-cover-actions"><a className="book-button book-button-filled" href={bookHref('contents')}>Open the book <span aria-hidden="true">→</span></a><a href={bookHref('contents')}>Browse contents</a></div>
      <div className="book-cover-bottom"><p>{contact.availability}</p><div className="book-links"><a href={`mailto:${contact.email}`}>Email me</a><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={contact.x} target="_blank" rel="noopener noreferrer">Twitter / X ↗</a></div></div>
    </div>;
    case 'contents': return <><p className="book-lead">Read from the beginning, or follow your curiosity.</p><nav aria-label="Book chapters" className="book-contents">{bookChapters.map((chapter, index) => <a key={chapter.id} href={bookHref(chapter.pageId)}><span className="book-contents-index">{String(index + 1).padStart(2, '0')}</span><span><strong>{chapter.title}</strong><small>{chapter.description}</small>{chapter.status && <span className="book-status">{chapter.status}</span>}</span><span className="book-contents-number">{String(bookPages.findIndex(p => p.id === chapter.pageId) + 1).padStart(2, '0')}</span></a>)}</nav><p className="book-small">Every project includes its story, architecture, decisions, and evidence. You can switch to Reading mode at any time.</p></>;
    case 'introduction': return <><div className="book-intro"><Image src="/profile/priyansh.webp" alt="Priyansh Jha" width={260} height={347} sizes="(max-width: 600px) 45vw, 220px" /><div><p className="book-lead">{heroContent.title}</p><p>{about.bio}</p></div></div><Note label="The kind of work I care about"><p>{heroContent.description}</p></Note><Note label="How I like to work"><p>{contact.operatingStatement}</p></Note><div className="book-colophon"><span>{contact.location}</span><span>{contact.collaboration}</span></div></>;
    case 'overview': return project && <><p className="book-status">{project.id === 'sprout' ? 'In development · product prototype' : `${project.status} project`}</p><p className="book-lead">{project.summary}</p>{project.image && <figure className="book-project-image" style={{ aspectRatio: getProjectImageAspectRatio(project.id) }}><Image src={project.image} alt={`${project.name} landing page`} fill sizes="(max-width: 768px) 90vw, 720px" className="object-contain" /></figure>}<p>{project.details}</p>{project.id === 'sprout' && <p className="book-aside">Current implementation: frontend prototype, PostgreSQL schema, and Go executable foundation. Hosting, agent execution, and runtime operations are planned.</p>}<ProjectLinks project={project} /><a className="book-small book-inline-link" href={`/systems/${project.id}/`}>Read this case study as one page ↗</a></>;
    case 'story': return project && <><Note label="The question"><p className="book-lead">{project.whyBuiltThis ?? project.problem}</p></Note><Note label="The problem in practice"><p>{project.problem}</p></Note><Note label="The approach"><p>{project.approach}</p></Note><Note label="The intended impact"><p>{project.impact}</p></Note><Note label="My part in the work"><Lines items={project.ownership ?? []} /></Note></>;
    case 'architecture': return project && <><p className="book-small">{project.id === 'sprout' ? 'Product architecture · includes planned runtime capabilities' : 'Architecture walkthrough'}</p><ol className="book-flow" aria-label={`${project.name} architecture stages`}>{(project.flowSteps ?? []).map((step, i) => <li key={step} data-current={i >= (page.offset ?? 0) && i < (page.offset ?? 0) + 2}>{step}</li>)}</ol><div className="book-stages">{(project.architectureStages ?? []).slice(page.offset ?? 0, (page.offset ?? 0) + 2).map((stage, i) => <section key={stage.label}><span className="book-step-number">{String((page.offset ?? 0) + i + 1).padStart(2, '0')}</span><div><h3>{stage.label}</h3><p>{stage.description}</p><p className="book-aside"><strong>Boundary protected</strong>{stage.safeguard}</p></div></section>)}</div></>;
    case 'judgment': return project && <><Note label="The key decision"><blockquote>{project.keyDecision}</blockquote></Note><Note label="The tradeoff"><p>{project.tradeoff}</p></Note><Note label="What comes next"><p>{project.nextStep}</p></Note></>;
    case 'proof': return project && <><Note label={project.proofTitle ?? 'Implementation evidence'}><Lines items={project.proofPoints ?? []} /></Note><Note label={project.id === 'sprout' ? 'Foundation verified so far' : 'Operating signals'}><Lines items={project.productionSignals ?? []} /></Note><div className="book-colophon">{(project.highlightMetrics ?? []).map(metric => <span key={metric}>{metric}</span>)}</div></>;
    case 'notes': return project && <><Note label="Architecture notes"><Lines items={project.architectureNotes ?? []} /></Note><Note label="Built with"><ul className="book-stack">{project.stack.map(item => <li key={item}>{item}</li>)}</ul></Note>{project.proofFrame && <Note label={project.proofFrame.eyebrow}><p>{project.proofFrame.title}</p><p className="book-small">{project.proofFrame.rails.join(' → ')}</p><p>{project.proofFrame.callout}</p></Note>}<ProjectLinks project={project} /><p className="book-endnote">End of {project.name} · <a href={bookHref('contents')}>Back to contents</a></p></>;
    case 'capability': {
      const capability = capabilities.find(item => item.id === page.itemId)!;
      return <><p className="book-lead">{capability.description}</p><Note label="Tools of the trade"><ul className="book-stack">{capability.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></Note><Note label="Where it became tangible"><div className="book-related">{capability.projectIds.map(id => { const related = projects.find(p => p.id === id)!; return <a key={id} href={bookHref(`${id}-overview`)}><strong>{related.name}</strong><span>{related.summary}</span><span aria-hidden="true">→</span></a>; })}</div></Note><p className="book-aside">Tools are useful when they serve a real problem. The project chapters document the choices, constraints, and current implementation behind each build.</p></>;
    }
    case 'process': return <><p className="book-lead">{howIBuild[(page.offset ?? 0) / 2]}</p><div className="book-stages">{buildStages.slice(page.offset ?? 0, (page.offset ?? 0) + 2).map((stage, i) => <section key={stage.id}><span className="book-step-number">{String((page.offset ?? 0) + i + 1).padStart(2, '0')}</span><div><p className="book-eyebrow">{stage.verb}</p><h3>{stage.title}</h3><p>{stage.description}</p><p className="book-aside"><strong>{stage.artifact}</strong>{stage.evidence}</p></div></section>)}</div>{page.offset === 4 && <p className="book-endnote">{howIBuild[3]}</p>}</>;
    case 'current': return <><p className="book-lead">{currentBuild.description}</p><Lines items={currentBuild.items} /><p className="book-aside">These are active workstreams. The project chapters distinguish finished foundations from the next steps still being built.</p></>;
    case 'receipts': return <><p className="book-lead">A few things you can inspect behind the interface.</p><Lines items={receipts} /></>;
    case 'history': { const entry = recentBuilds[page.offset ?? 0]; return <><p className="book-eyebrow">From the shipping notebook</p><Lines items={entry.items} /><p className="book-endnote">Small, deliberate iterations. A visible trail of work.</p></>; }
    case 'contact': return <><p className="book-lead">{contact.focus}</p><blockquote>{contact.operatingStatement}</blockquote><div className="book-contact"><p className="book-eyebrow">{contact.availability}</p><a className="book-button book-button-filled" href={`mailto:${contact.email}`}>Start a conversation <span aria-hidden="true">↗</span></a><a className="book-email" href={`mailto:${contact.email}`}>{contact.email}</a></div><div className="book-colophon"><span>{contact.location}</span><span>{contact.collaboration}</span><span>{contact.response}</span></div><div className="book-links"><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={contact.x} target="_blank" rel="noopener noreferrer">X / Twitter ↗</a></div><p className="book-endnote">Thank you for reading. <a href={bookHref('cover')}>Back to the cover</a></p></>;
  }
}

export function BookSheet({ page, index }: { page: BookPage; index: number }) {
  return <article id={`book/${page.id}`} className={`book-sheet book-sheet-${page.kind}`} aria-labelledby={`heading-${page.id}`}>
    {page.kind !== 'cover' && <><header className="book-running-head"><span>Priyansh Jha</span><span>{page.chapter}</span></header><h2 id={`heading-${page.id}`} tabIndex={-1} data-page-heading>{page.title}</h2></>}
    {page.kind === 'cover' && <span id={`heading-${page.id}`} className="sr-only">A book of work by Priyansh Jha</span>}
    <div className="book-page-body"><BookPageContent page={page} /></div>
    <footer className="book-sheet-footer"><span>{page.kind === 'cover' ? 'Selected work · An ongoing collection' : page.chapter}</span><span>{String(index + 1).padStart(2, '0')}</span></footer>
  </article>;
}
