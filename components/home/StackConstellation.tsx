'use client';

import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { projects, stackLayers } from '@/lib/data';

type Active = { kind: 'tool' | 'project'; id: string } | null;

interface Edge {
  key: string;
  d: string;
}

// Build tool → projects from each project's own stack, so the map can't drift from the case studies.
function buildIndex() {
  const toolProjects = new Map<string, string[]>();
  const projectTools = new Map<string, string[]>();
  for (const layer of stackLayers) {
    for (const tool of layer.tools) {
      const names = [tool.name, ...(tool.aliases ?? [])];
      const users = projects.filter((project) => project.stack.some((item) => names.includes(item))).map((project) => project.id);
      toolProjects.set(tool.name, users);
      users.forEach((id) => projectTools.set(id, [...(projectTools.get(id) ?? []), tool.name]));
    }
  }
  return { toolProjects, projectTools };
}

const { toolProjects, projectTools } = buildIndex();

export default function StackConstellation() {
  const [active, setActive] = useState<Active>(null);
  const [pinned, setPinned] = useState<Active>(null);
  const [edges, setEdges] = useState<Edge[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = active ?? pinned;
  const litProjects = new Set(current ? (current.kind === 'tool' ? toolProjects.get(current.id) : [current.id]) : []);
  const litTools = new Set(current ? (current.kind === 'project' ? projectTools.get(current.id) : [current.id]) : []);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root || !current) {
      setEdges([]);
      return;
    }
    const box = root.getBoundingClientRect();
    const find = (kind: string, id: string) => root.querySelector<HTMLElement>(`[data-node="${kind}:${CSS.escape(id)}"]`);
    const pairs: [string, string][] =
      current.kind === 'tool'
        ? (toolProjects.get(current.id) ?? []).map((pid) => [pid, current.id])
        : (projectTools.get(current.id) ?? []).map((tool) => [current.id, tool]);

    const stacked = root.offsetWidth < 760;
    setEdges(
      pairs.flatMap(([pid, tool]) => {
        const a = find('project', pid)?.getBoundingClientRect();
        const b = find('tool', tool)?.getBoundingClientRect();
        if (!a || !b) return [];
        if (stacked) {
          // Projects sit above the layers: connect bottom-centre to top-centre.
          const x1 = a.left + a.width / 2 - box.left;
          const y1 = a.bottom - box.top;
          const x2 = b.left + b.width / 2 - box.left;
          const y2 = b.top - box.top;
          const mid = (y1 + y2) / 2;
          return [{ key: `${pid}-${tool}`, d: `M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}` }];
        }
        const x1 = a.right - box.left;
        const y1 = a.top + a.height / 2 - box.top;
        const x2 = b.left - box.left;
        const y2 = b.top + b.height / 2 - box.top;
        const bend = Math.max(40, (x2 - x1) * 0.45);
        return [{ key: `${pid}-${tool}`, d: `M${x1},${y1} C${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}` }];
      }),
    );
  }, [current]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(root);
    return () => observer.disconnect();
  }, [measure]);

  const toggle = (next: NonNullable<Active>) => {
    const unpin = pinned?.kind === next.kind && pinned.id === next.id;
    setPinned(unpin ? null : next);
    // Tapping the pinned tool again clears the trace, even though it keeps focus.
    if (unpin) setActive(null);
  };

  const hint = current
    ? current.kind === 'tool'
      ? `${current.id} → ${(toolProjects.get(current.id) ?? []).length} project${(toolProjects.get(current.id) ?? []).length === 1 ? '' : 's'}`
      : `${projects.find((project) => project.id === current.id)?.name} → ${(projectTools.get(current.id) ?? []).length} tools`
    : 'hover or tap a tool to trace where it shipped';

  return (
    <div className={`stackmap${current ? ' is-tracing' : ''}`} ref={rootRef} onPointerLeave={(event) => event.pointerType === 'mouse' && setActive(null)}>
      <div className="stackmap__head">
        <span className="stackmap__file">stack.map</span>
        <span className="stackmap__hint" aria-live="polite">
          {hint}
        </span>
      </div>

      <div className="stackmap__grid">
        <ul className="stackmap__projects" aria-label="Projects">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                href={`/systems/${project.id}/`}
                data-node={`project:${project.id}`}
                className={`stackmap__project${litProjects.has(project.id) ? ' is-lit' : ''}`}
                onPointerEnter={(event) => event.pointerType === 'mouse' && setActive({ kind: 'project', id: project.id })}
                onFocus={() => setActive({ kind: 'project', id: project.id })}
                onBlur={() => setActive(null)}
              >
                <span className="stackmap__dot" aria-hidden="true" />
                {project.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="stackmap__layers">
          {stackLayers.map((layer) => (
            <div key={layer.id} className="stackmap__layer">
              <span className="stackmap__label">{layer.label}</span>
              <ul className="stackmap__tools">
                {layer.tools.map((tool) => {
                  const users = toolProjects.get(tool.name) ?? [];
                  const names = users.map((id) => projects.find((project) => project.id === id)?.name).join(', ');
                  const isPinned = pinned?.kind === 'tool' && pinned.id === tool.name;
                  return (
                    <li key={tool.name}>
                      <button
                        type="button"
                        data-node={`tool:${tool.name}`}
                        className={`stackmap__tool${litTools.has(tool.name) ? ' is-lit' : ''}`}
                        style={{ '--weight': Math.min(users.length, 5) } as React.CSSProperties}
                        aria-pressed={isPinned}
                        aria-label={`${tool.name}, used in ${names || 'no listed projects'}`}
                        onPointerEnter={(event) => event.pointerType === 'mouse' && setActive({ kind: 'tool', id: tool.name })}
                        onFocus={() => setActive({ kind: 'tool', id: tool.name })}
                        onBlur={() => setActive(null)}
                        onClick={() => toggle({ kind: 'tool', id: tool.name })}
                      >
                        {tool.name}
                        <span className="stackmap__count" aria-hidden="true">
                          ×{users.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <svg className="stackmap__wires" aria-hidden="true">
        {edges.map((edge) => (
          <path key={edge.key} d={edge.d} pathLength={1} />
        ))}
      </svg>
    </div>
  );
}
