import ProjectCard from '@/components/cards/ProjectCard';
import { projects } from '@/lib/data';

export default function Projects() {
  const currentBuild = projects.find(p => p.featured);
  const otherBuilds = projects.filter(p => !p.featured);

  return (
    <section className="py-24 px-4 border-t border-[#1a1a1a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/2 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-sm" />
            Builds
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Current Work
          </h2>
          <p className="text-text-muted text-sm max-w-lg">
            Focus Area: Automation · Developer Tools · AI Systems
          </p>
        </div>

        {/* Progression statement */}
        <div className="mb-16 p-6 bg-[#080808] border border-[#1a1a1a] rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent pointer-events-none" />
          <div className="flex items-start gap-4 relative">
            <div className="w-1 h-1 bg-accent/60 rounded-full mt-1.5" />
            <p className="text-text-secondary text-sm">
              Most of my work is still evolving — that's intentional.
            </p>
          </div>
        </div>

        {/* Current Build - featured */}
        {currentBuild && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-accent rounded-full animate-ping opacity-75" />
                <div className="absolute -inset-2 bg-accent/20 rounded-full blur-md" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                In Progress
              </span>
            </div>
            <ProjectCard project={currentBuild} index={0} featured />
          </div>
        )}

        {/* Other Builds */}
        {otherBuilds.length > 0 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-6">
              Completed
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
