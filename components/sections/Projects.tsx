import ProjectCard from '@/components/cards/ProjectCard';
import { projects, sectionCopy } from '@/lib/data';

export default function Projects() {
  const currentBuild = projects.find((p) => p.featured);
  const otherBuilds = projects.filter((p) => !p.featured);

  return (
    <section className="section-shell section-shell-alt relative overflow-hidden px-4 py-20 md:py-28">
      <div className="absolute inset-0 grid-pattern opacity-25 md:opacity-45" />
      <div className="absolute inset-0 topographic-pattern opacity-20 pointer-events-none" />
      <div className="ambient-orb left-[8%] top-[18%] h-[360px] w-[360px] opacity-60 md:h-[520px] md:w-[520px]" />
      <div className="ambient-orb right-[-4%] bottom-[8%] h-[320px] w-[320px] opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <p className="section-kicker mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-sm bg-accent" />
              {sectionCopy.projects.eyebrow}
            </p>
            <h2 className="section-heading mb-4">{sectionCopy.projects.title}</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
              {sectionCopy.projects.description}
            </p>
          </div>

          <div className="panel-chrome rounded-3xl p-5">
            <p className="font-display text-[10px] uppercase tracking-[0.26em] text-text-muted">{sectionCopy.projects.focusTitle}</p>
            <p className="mt-3 font-display text-xl font-semibold uppercase tracking-[0.1em] text-text-primary">
              {sectionCopy.projects.focusValue}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {sectionCopy.projects.focusDescription}
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-[28px] border border-white/6 bg-white/[0.025] p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_6px_rgba(76,175,80,0.08)]" />
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.28em] text-text-muted">{sectionCopy.projects.philosophyTitle}</p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary md:text-base">
                {sectionCopy.projects.philosophyText}
              </p>
            </div>
          </div>
        </div>

        {currentBuild && (
          <div className="relative mb-14">
            <div className="absolute -inset-2 rounded-[36px] border border-accent/10 bg-accent/[0.03] blur-2xl pointer-events-none" />
            <div className="mb-5 flex items-center gap-3">
              <div className="relative">
                <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-accent animate-ping opacity-70" />
              </div>
              <span className="font-display text-[11px] uppercase tracking-[0.28em] text-accent">Featured Build</span>
            </div>
            <ProjectCard project={currentBuild} index={0} featured />
          </div>
        )}

        {otherBuilds.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-text-muted">
                {sectionCopy.projects.completedLabel}
              </p>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 via-accent/20 to-transparent md:block" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {otherBuilds.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
