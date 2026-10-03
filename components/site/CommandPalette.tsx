'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowUpRight, CornerDownLeft, Github, Hash, Layers3, Mail, Moon, Rocket, Search, Sparkles } from 'lucide-react';
import { contact, projects } from '@/lib/data';
import { triggerBurst } from '@/components/fun/PacketBurst';
import { summonCompanion } from '@/components/fun/Companion';

type Group = 'Projects' | 'Sections' | 'Contact' | 'Fun';

interface PaletteItem {
  id: string;
  label: string;
  hint: string;
  group: Group;
  href?: string;
  external?: boolean;
  action?: () => void;
  /** Hidden until the query matches one of these words. */
  secret?: string[];
  keywords: string;
  icon: typeof Search;
}

const groups: Group[] = ['Projects', 'Sections', 'Contact', 'Fun'];

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  document.documentElement.style.colorScheme = next;
  try {
    window.localStorage.setItem('portfolio-theme', next);
  } catch {
    /* ignore */
  }
}

function buildItems(): PaletteItem[] {
  const projectItems = projects.flatMap<PaletteItem>((project) => {
    const keywords = [project.name, project.summary, project.stack.join(' '), project.status].join(' ');
    const items: PaletteItem[] = [
      {
        id: `${project.id}-case`,
        label: project.name,
        hint: project.summary ?? 'Case study',
        group: 'Projects',
        href: `/systems/${project.id}/`,
        keywords,
        icon: Layers3,
      },
    ];
    if (project.liveUrl) {
      items.push({
        id: `${project.id}-live`,
        label: `${project.name} — live site`,
        hint: project.liveUrl.replace('https://', ''),
        group: 'Projects',
        href: project.liveUrl,
        external: true,
        keywords: `${keywords} live demo website`,
        icon: ArrowUpRight,
      });
    }
    if (project.githubUrl) {
      items.push({
        id: `${project.id}-code`,
        label: `${project.name} — source`,
        hint: 'GitHub repository',
        group: 'Projects',
        href: project.githubUrl,
        external: true,
        keywords: `${keywords} github code repository source`,
        icon: Github,
      });
    }
    return items;
  });

  const sectionItems: PaletteItem[] = [
    { id: 's-work', label: 'Selected work', hint: 'Projects and case studies', group: 'Sections', href: '/#work', keywords: 'work projects', icon: Hash },
    { id: 's-approach', label: 'Approach', hint: 'How I build and what I can own', group: 'Sections', href: '/#approach', keywords: 'process skills capabilities how i build', icon: Hash },
    { id: 's-log', label: 'Evidence', hint: 'Product archive and shipping trail', group: 'Sections', href: '/#log', keywords: 'log shipping recent changelog', icon: Hash },
    { id: 's-contact', label: 'Contact', hint: 'Availability and links', group: 'Sections', href: '/#contact', keywords: 'contact hire availability', icon: Hash },
  ];

  const contactItems: PaletteItem[] = [
    { id: 'c-email', label: 'Email Priyansh', hint: contact.email, group: 'Contact', href: `mailto:${contact.email}`, external: true, keywords: 'email mail hire contact', icon: Mail },
    { id: 'c-github', label: 'GitHub', hint: 'github.com/priyanshjhaa', group: 'Contact', href: contact.github, external: true, keywords: 'github code profile', icon: Github },
    { id: 'c-linkedin', label: 'LinkedIn', hint: 'Professional profile', group: 'Contact', href: contact.linkedin, external: true, keywords: 'linkedin profile', icon: ArrowUpRight },
    { id: 'c-x', label: 'X', hint: '@PriyaanshhJhaa', group: 'Contact', href: contact.x, external: true, keywords: 'x twitter', icon: ArrowUpRight },
  ];

  const funItems: PaletteItem[] = [
    { id: 'f-ship', label: 'Ship it', hint: 'Deploy to production (no rollback needed)', group: 'Fun', keywords: 'ship it deploy release launch party', icon: Rocket, action: () => triggerBurst() },
    { id: 'f-mini', label: 'Bring back mini Priyansh', hint: 'The little guy who walks with you', group: 'Fun', keywords: 'mini priyansh companion buddy run character pixel', icon: Sparkles, action: summonCompanion },
    { id: 'f-theme', label: 'Toggle theme', hint: 'Paper or ink', group: 'Fun', keywords: 'theme dark light mode toggle', icon: Moon, action: toggleTheme },
    {
      id: 'f-hire',
      label: 'sudo hire priyansh',
      hint: 'Permission granted. Opens a pre-written email.',
      group: 'Fun',
      keywords: 'sudo hire recruit job offer',
      secret: ['sudo', 'hire', 'recruit', 'offer'],
      icon: Sparkles,
      action: () => {
        triggerBurst();
        const subject = encodeURIComponent('sudo hire priyansh');
        const body = encodeURIComponent("Hi Priyansh,\n\nWe're building something ambitious and I'd like to talk about a role.\n\n");
        window.setTimeout(() => {
          window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
        }, 700);
      },
    },
    { id: 'f-coffee', label: 'Brew coffee', hint: '418: I’m a teapot. Try “ship it” instead.', group: 'Fun', keywords: 'coffee brew tea', secret: ['coffee', 'brew', 'tea'], icon: Sparkles, action: () => triggerBurst() },
  ];

  return [...projectItems, ...sectionItems, ...contactItems, ...funItems];
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const items = useMemo(buildItems, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const visible = items.filter((item) => !item.secret || (q && item.secret.some((word) => word.startsWith(q) || q.includes(word))));
    const matched = q ? visible.filter((item) => `${item.label} ${item.hint} ${item.keywords}`.toLowerCase().includes(q) || Boolean(item.secret)) : visible;
    if (!q) return groups.flatMap((group) => matched.filter((item) => item.group === group));

    // Rank: label starts with query > word in label starts with query > label contains > anywhere.
    const score = (item: PaletteItem) => {
      const label = item.label.toLowerCase();
      if (label.startsWith(q)) return 4;
      if (label.split(/[\s—-]+/).some((word) => word.startsWith(q))) return 3;
      if (label.includes(q)) return 2;
      return item.secret ? 3 : 1;
    };
    const ranked = matched.map((item) => ({ item, s: score(item) }));
    const bestByGroup = new Map<Group, number>();
    ranked.forEach(({ item, s }) => bestByGroup.set(item.group, Math.max(bestByGroup.get(item.group) ?? 0, s)));
    // Keep items grouped (so headings stay tidy) but put the best group first.
    const orderedGroups = [...groups].filter((group) => bestByGroup.has(group)).sort((a, b) => (bestByGroup.get(b) ?? 0) - (bestByGroup.get(a) ?? 0));
    return orderedGroups.flatMap((group) =>
      ranked
        .filter(({ item }) => item.group === group)
        .sort((a, b) => b.s - a.s)
        .map(({ item }) => item)
    );
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const run = (item: PaletteItem) => {
    onClose();
    if (item.action) {
      item.action();
      return;
    }
    if (!item.href) return;
    if (item.external) {
      if (item.href.startsWith('mailto:')) window.location.href = item.href;
      else window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    window.location.href = item.href;
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter' && results[active]) {
      event.preventDefault();
      run(results[active]);
    } else if (event.key === 'Tab') {
      // Keep focus inside the dialog; the input is the only tab stop.
      event.preventDefault();
    }
  };

  let lastGroup: Group | null = null;

  return (
    <div className="palette" onMouseDown={(event) => event.target === event.currentTarget && onClose()} onKeyDown={onKeyDown}>
      <div className="palette__panel" role="dialog" aria-modal="true" aria-label="Search the portfolio">
        <div className="palette__search">
          <Search aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, sections, links…"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <span className="kbd">esc</span>
        </div>

        <ul className="palette__list" id="palette-results" role="listbox" ref={listRef} aria-label="Results">
          {results.length === 0 && <li className="palette__empty">Nothing matches “{query}”.</li>}
          {results.map((item, index) => {
            const heading = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            const Icon = item.icon;
            return (
              <li key={item.id} role="presentation">
                {heading && <div className="palette__group" aria-hidden="true">{heading}</div>}
                <button
                  type="button"
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={index === active}
                  className="palette__item"
                  tabIndex={-1}
                  onMouseMove={() => setActive(index)}
                  onClick={() => run(item)}
                >
                  <Icon aria-hidden="true" />
                  <span className="palette__item-text">
                    <span>{item.label}</span>
                    <small>{item.hint}</small>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="palette__foot" aria-hidden="true">
          <span>↑↓ to move</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <CornerDownLeft width={13} height={13} /> to open
          </span>
        </div>
      </div>
    </div>
  );
}
