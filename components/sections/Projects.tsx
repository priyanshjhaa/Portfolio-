import ProjectCard from '@/components/cards/ProjectCard';
import { projects } from '@/lib/data';

export default function Projects() {
  const currentBuild = projects.find(p => p.featured);
  const otherBuilds = projects.filter(p => !p.featured);

  return (
    <section className="py-16 md:py-24 px-4 border-t border-[#1a1a1a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30 md:opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-accent/3 md:bg-accent/4 rounded-full blur-[100px] md:blur-[150px] pointer-events-none glow-pulse" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-accent mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent rounded-sm" />
            Builds
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-3 md:mb-4">
            Current Work
          </h2>
          <p className="text-text-muted text-xs md:text-sm max-w-lg">
            Focus Area: Automation · Developer Tools · AI Systems
          </p>
        </div>

        {/* Progression statement */}
        <div className="mb-10 md:mb-16 p-4 md:p-6 bg-[#080808] border border-[#1a1a1a] rounded-xl relative overflow-hidden hover:border-accent/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] md:from-accent/[0.04] to-transparent pointer-events-none" />
          <div className="flex items-start gap-3 md:gap-4 relative">
            <div className="w-1 h-1 bg-accent/60 rounded-full mt-1 md:mt-1.5" />
            <p className="text-text-secondary text-xs md:text-sm">
              Most of my work is still evolving — that's intentional.
            </p>
          </div>
        </div>

        {/* Current Build - featured */}
        {currentBuild && (
          <div className="mb-10 md:mb-16">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="relative">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full" />
                <div className="absolute inset-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full animate-ping opacity-75" />
                <div className="absolute -inset-1.5 md:-inset-2 bg-accent/15 rounded-full blur-sm md:blur-md" />
              </div>
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-accent">
                In Progress
              </span>
            </div>
            <ProjectCard project={currentBuild} index={0} featured />
          </div>
        )}

        {/* Other Builds */}
        {otherBuilds.length > 0 && (
          <div>
            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-text-muted mb-4 md:mb-6">
              Completed
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
