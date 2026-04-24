import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/lib/data';

const previewTone: Record<string, string> = {
  codemap: 'from-accent/[0.18] via-accent/[0.05] to-transparent',
  execute: 'from-accent/[0.14] via-accent/[0.04] to-transparent',
  axiom: 'from-yellow-500/18 via-yellow-500/6 to-transparent',
  cinematch: 'from-slate-400/14 via-slate-400/5 to-transparent',
};

const previewContent: Record<
  string,
  {
    label: string;
    rail: string;
    modules: string[];
    activeModule: number;
    status: string;
  }
> = {
  codemap: {
    label: 'Codebase Intelligence',
    rail: 'Ingest -> Index -> Query',
    modules: ['Repo Import', 'Embedding Index', 'Natural Language Query'],
    activeModule: 1,
    status: 'Live graph',
  },
  execute: {
    label: 'Automation Engine',
    rail: 'Intent -> Plan -> Run',
    modules: ['Trigger Layer', 'Workflow Queue', 'Webhook Actions'],
    activeModule: 1,
    status: 'Running flows',
  },
  axiom: {
    label: 'Operations System',
    rail: 'Leads -> Projects -> Invoices',
    modules: ['Client Pipeline', 'Project Ops', 'Billing Flow'],
    activeModule: 0,
    status: 'Stable ops',
  },
  cinematch: {
    label: 'Discovery System',
    rail: 'Search -> Match -> Watch',
    modules: ['Content API', 'Recommendation Logic', 'User Flow'],
    activeModule: 2,
    status: 'Active routes',
  },
};

export default function Projects() {
  const featuredProject = projects.find((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  const renderCard = (project: typeof projects[number], featured?: boolean) => {
    const preview = previewContent[project.id];

    return (
      <article
        key={project.id}
        className={`group rounded-2xl border border-white/8 bg-[#0b0b0b]/92 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-accent/18 ${featured ? 'shadow-[0_24px_60px_-44px_rgba(76,175,80,0.28)]' : ''}`}
      >
        <div
          className={`preview-live mb-6 overflow-hidden rounded-2xl border border-white/6 bg-gradient-to-br ${previewTone[project.id] ?? 'from-accent/[0.12] via-transparent to-transparent'} p-5`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.22em] text-text-muted">
                {featured ? 'Featured Build' : 'Project Preview'}
              </p>
              <p className="mt-2 font-display text-[11px] uppercase tracking-[0.22em] text-text-secondary">
                {preview?.label}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display text-[9px] uppercase tracking-[0.2em] text-text-muted">
                {preview?.status}
              </span>
              <div className="preview-pulse-dot h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_16px_rgba(76,175,80,0.6)]" />
            </div>
          </div>

          <div className="mt-5 rounded-full border border-white/8 bg-black/25 px-4 py-3">
            <div className="preview-rail relative h-2 overflow-hidden rounded-full bg-white/8">
              <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(76,175,80,0.16),rgba(76,175,80,0.55),rgba(76,175,80,0.16))]" />
              <div className="preview-core absolute right-[14%] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-accent/50 bg-[#0a180d] shadow-[0_0_18px_rgba(76,175,80,0.4)]" />
            </div>
            <p className="mt-3 font-display text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              {preview?.rail}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 pt-1">
            {preview?.modules.map((module, index) => (
              <div
                key={module}
                className={`preview-module min-w-0 rounded-xl border px-3 py-4 transition-all duration-300 ${
                  preview.activeModule === index
                    ? 'border-accent/20 bg-accent/[0.08] shadow-[0_0_24px_rgba(76,175,80,0.12)]'
                    : 'border-white/6 bg-black/20'
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      preview.activeModule === index ? 'bg-accent' : 'bg-white/20'
                    }`}
                  />
                  <span className="font-display text-[9px] uppercase tracking-[0.2em] text-text-muted">
                    Node {index + 1}
                  </span>
                </div>
                <p className="min-w-0 break-words text-[11px] leading-snug text-text-secondary sm:text-[13px] sm:leading-relaxed">
                  {module}
                </p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-display text-2xl font-semibold tracking-[0.04em] text-text-primary">
          {project.name}
        </h3>
        <p className="mt-3 text-lg text-text-primary">
          {project.summary}
        </p>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          {project.details}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 font-display text-xs uppercase tracking-[0.18em] text-text-primary transition-all duration-300 hover:border-accent/20 hover:text-accent sm:min-h-[44px] sm:w-auto sm:justify-center sm:px-4"
            >
              Live
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 font-display text-xs uppercase tracking-[0.18em] text-text-primary transition-all duration-300 hover:border-accent/20 hover:text-accent sm:min-h-[44px] sm:w-auto sm:justify-center sm:px-4"
            >
              GitHub
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>
    );
  };

  return (
    <section id="projects" className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(76,175,80,0.08),transparent_22%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-12 max-w-3xl">
          <p className="font-display text-[11px] uppercase tracking-[0.24em] text-accent">
            Selected Work
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[0.04em] text-text-primary md:text-5xl">
            Products built with architecture, reliability, and shipping speed in mind.
          </h2>
        </div>

        <div className="space-y-6">
          {featuredProject && renderCard(featuredProject, true)}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {otherProjects.map((project) => renderCard(project))}
          </div>
        </div>
      </div>
    </section>
  );
}
