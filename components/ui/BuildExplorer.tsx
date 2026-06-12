'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Command, Github, Layers3, Mail, Orbit, Search, UserRound, X } from 'lucide-react';
import { contact, howIBuild, leverageAreas, projects } from '@/lib/data';
import { cn } from '@/lib/utils';

type ExplorerGroup = 'Projects' | 'Process' | 'Contact';
type ExplorerAction = 'scroll' | 'external' | 'project';

interface ExplorerItem {
  id: string;
  label: string;
  description: string;
  group: ExplorerGroup;
  keywords: string[];
  actionType: ExplorerAction;
  href?: string;
  sectionId?: string;
  projectId?: string;
  icon: typeof Layers3;
}

interface BuildExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (projectId: string) => void;
}

const groupOrder: ExplorerGroup[] = ['Projects', 'Process', 'Contact'];

function createItems(): ExplorerItem[] {
  const featuredProject = projects.find((project) => project.featured);
  const liveProjects = projects.filter((project) => project.liveUrl);

  const projectItems: ExplorerItem[] = projects.flatMap((project) => {
    const baseKeywords = [
      project.name,
      project.status,
      ...project.stack,
      project.problem,
      project.approach,
    ];

    const items: ExplorerItem[] = [
      {
        id: `project-${project.id}`,
        label: project.name,
        description: `${project.status} build · ${project.stack.join(' · ')}`,
        group: 'Projects',
        keywords: baseKeywords,
        actionType: 'project',
        projectId: project.id,
        icon: Layers3,
      },
    ];

    if (project.githubUrl) {
      items.push({
        id: `project-${project.id}-code`,
        label: `${project.name} Code`,
        description: 'Open GitHub repository',
        group: 'Projects',
        keywords: [...baseKeywords, 'github', 'code', 'repository'],
        actionType: 'external',
        href: project.githubUrl,
        icon: Github,
      });
    }

    if (project.liveUrl) {
      items.push({
        id: `project-${project.id}-live`,
        label: `${project.name} Live`,
        description: 'Open live project',
        group: 'Projects',
        keywords: [...baseKeywords, 'live', 'website', 'deploy', 'vercel'],
        actionType: 'external',
        href: project.liveUrl,
        icon: ArrowUpRight,
      });
    }

    return items;
  });

  if (featuredProject) {
    projectItems.unshift(
      {
        id: 'project-featured-open',
        label: 'Open Featured Build',
        description: `${featuredProject.name} deep dive`,
        group: 'Projects',
        keywords: [featuredProject.name, 'featured', 'deep dive', 'system'],
        actionType: 'project',
        projectId: featuredProject.id,
        icon: Orbit,
      },
      {
        id: 'project-featured-architecture',
        label: 'See Current Architecture',
        description: `Inspect ${featuredProject.name} system layer`,
        group: 'Projects',
        keywords: [featuredProject.name, 'architecture', 'system', 'nodes'],
        actionType: 'project',
        projectId: featuredProject.id,
        icon: Layers3,
      }
    );
  }

  if (liveProjects.length > 0) {
    projectItems.unshift({
      id: 'project-live-jump',
      label: 'Jump to Live Projects',
      description: `${liveProjects.length} live systems available`,
      group: 'Projects',
      keywords: ['live projects', 'deployed', 'vercel', 'production'],
      actionType: 'scroll',
      sectionId: 'projects',
      icon: ArrowUpRight,
    });
  }

  const processItems: ExplorerItem[] = [
    {
      id: 'process-leverage',
      label: 'Where I Add Leverage',
      description: leverageAreas.map((area) => area.title).join(' · '),
      group: 'Process',
      keywords: ['ownership', 'product engineering', 'scope', 'leverage', ...leverageAreas.map((area) => area.title)],
      actionType: 'scroll',
      sectionId: 'leverage',
      icon: Layers3,
    },
    {
      id: 'process-how-i-build',
      label: 'How I Build',
      description: howIBuild.join(' · '),
      group: 'Process',
      keywords: ['process', 'architecture', 'reliability', 'shipping', ...howIBuild],
      actionType: 'scroll',
      sectionId: 'process',
      icon: Command,
    },
  ];

  const contactItems: ExplorerItem[] = [
    {
      id: 'contact-github',
      label: 'GitHub',
      description: 'Open GitHub profile',
      group: 'Contact',
      keywords: ['github', 'code', 'profile', contact.github],
      actionType: 'external',
      href: contact.github,
      icon: Github,
    },
    {
      id: 'contact-linkedin',
      label: 'LinkedIn',
      description: 'Open LinkedIn profile',
      group: 'Contact',
      keywords: ['linkedin', 'profile', 'network', contact.linkedin],
      actionType: 'external',
      href: contact.linkedin,
      icon: UserRound,
    },
    {
      id: 'contact-x',
      label: 'X',
      description: 'Open X profile',
      group: 'Contact',
      keywords: ['x', 'twitter', 'profile', contact.x],
      actionType: 'external',
      href: contact.x,
      icon: UserRound,
    },
    {
      id: 'contact-email',
      label: 'Email',
      description: 'Start a conversation',
      group: 'Contact',
      keywords: ['email', 'mail', 'contact', contact.email],
      actionType: 'external',
      href: `mailto:${contact.email}`,
      icon: Mail,
    },
    {
      id: 'contact-section',
      label: 'Contact',
      description: 'Jump to footer contact actions',
      group: 'Contact',
      keywords: ['contact', 'reach out', 'availability'],
      actionType: 'scroll',
      sectionId: 'contact',
      icon: UserRound,
    },
  ];

  return [...projectItems, ...processItems, ...contactItems];
}

export default function BuildExplorer({ isOpen, onClose, onOpenProject }: BuildExplorerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const items = useMemo(() => createItems(), []);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return items;
    }

    return items.filter((item) => {
      const haystack = [item.label, item.description, item.group, ...item.keywords]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [items, query]);

  const groupedItems = useMemo(() => {
    return groupOrder
      .map((group) => ({
        group,
        items: filteredItems.filter((item) => item.group === group),
      }))
      .filter((entry) => entry.items.length > 0);
  }, [filteredItems]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const executeItem = (item: ExplorerItem) => {
    if (item.actionType === 'external' && item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      onClose();
      return;
    }

    if (item.actionType === 'project' && item.projectId) {
      onOpenProject(item.projectId);
      onClose();
      return;
    }

    if (item.actionType === 'scroll' && item.sectionId) {
      const element = document.querySelector(`#${item.sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      onClose();
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredItems.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % filteredItems.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + filteredItems.length) % filteredItems.length);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      executeItem(filteredItems[activeIndex]);
    }
  };

  if (!isOpen) {
    return null;
  }

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 py-20 md:py-28">
      <button
        type="button"
        aria-label="Close build explorer"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/8 bg-[#090909]/96 shadow-[0_32px_90px_-48px_rgba(0,0,0,0.95)]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-white/[0.02] pointer-events-none" />
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent pointer-events-none" />

        <div className="relative flex items-center justify-between border-b border-white/6 px-5 py-4 md:px-6">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent/80">Build Explorer</p>
            <p className="mt-1 text-sm text-text-secondary">Search projects, system layers, and contact actions</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/6 bg-white/[0.02] text-text-secondary transition-colors hover:border-accent/20 hover:text-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative border-b border-white/6 px-5 py-4 md:px-6">
          <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-black/20 px-4 py-3">
            <Search className="h-4 w-4 text-text-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onListKeyDown}
              placeholder="Search builds, architecture, stack, contact..."
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
            <div className="hidden items-center gap-1 rounded-lg border border-white/6 bg-white/[0.03] px-2 py-1 font-display text-[10px] uppercase tracking-[0.18em] text-text-muted sm:flex">
              <Command className="h-3 w-3" />
              K
            </div>
          </div>
        </div>

        <div className="relative max-h-[65vh] overflow-y-auto px-3 py-3 md:px-4">
          {groupedItems.length === 0 ? (
            <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-6 text-center">
              <p className="font-display text-[11px] uppercase tracking-[0.22em] text-text-muted">No results</p>
              <p className="mt-2 text-sm text-text-secondary">Try searching by project name, architecture, stack, or contact method.</p>
            </div>
          ) : (
            groupedItems.map((groupEntry) => (
              <div key={groupEntry.group} className="mb-4 last:mb-0">
                <div className="px-2 pb-2 pt-1">
                  <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent/75">
                    {groupEntry.group}
                  </p>
                </div>

                <div className="space-y-2">
                  {groupEntry.items.map((item) => {
                    runningIndex += 1;
                    const isActive = runningIndex === activeIndex;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveIndex(runningIndex)}
                        onClick={() => executeItem(item)}
                        className={cn(
                          'flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-200',
                          isActive
                            ? 'border-accent/20 bg-accent/[0.08]'
                            : 'border-white/6 bg-white/[0.02] hover:border-accent/12 hover:bg-white/[0.03]'
                        )}
                      >
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/15 bg-accent/10 text-accent">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-display text-sm uppercase tracking-[0.16em] text-text-primary">
                              {item.label}
                            </p>
                            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-text-muted">
                              {item.actionType === 'external' ? 'Open' : item.actionType === 'project' ? 'Dive' : 'Jump'}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
