'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

/**
 * The hero's signature moment: a living system map with Priyansh at the
 * center, projects in orbit, and capabilities on the edge. Data packets
 * flow along the edges, nodes float, and every node can be hovered,
 * dragged (it springs home), or clicked through to its case study.
 */

type Kind = 'core' | 'project' | 'skill';

interface GraphNode {
  id: string;
  label: string;
  hint: string;
  kind: Kind;
  x: number;
  y: number;
  href?: string;
}

const W = 560;
const H = 560;
const CX = W / 2;
const CY = H / 2;

const nodes: GraphNode[] = [
  { id: 'core', label: 'Priyansh', hint: 'Product engineer · builds end to end', kind: 'core', x: CX, y: CY },
  { id: 'sprout', label: 'Sprout', hint: 'Agent-native cloud for small apps', kind: 'project', x: CX - 170, y: CY - 124, href: '/systems/sprout/' },
  { id: 'atlas', label: 'Atlas', hint: 'Cited change-impact intelligence', kind: 'project', x: CX + 172, y: CY - 108, href: '/systems/atlas/' },
  { id: 'execute', label: 'Execute', hint: 'Approval-gated workflow agent', kind: 'project', x: CX + 160, y: CY + 140, href: '/systems/execute/' },
  { id: 'codemap', label: 'CodeMap', hint: 'Understand any codebase fast', kind: 'project', x: CX - 166, y: CY + 132, href: '/systems/codemap/' },
  { id: 'ui', label: 'Interface', hint: 'React · Next.js · TypeScript', kind: 'skill', x: 64, y: 108 },
  { id: 'api', label: 'APIs', hint: 'Go · Node.js · NestJS', kind: 'skill', x: CX + 6, y: 40 },
  { id: 'queue', label: 'Queues', hint: 'Redis · BullMQ · workers', kind: 'skill', x: W - 54, y: CY + 6 },
  { id: 'data', label: 'Data', hint: 'PostgreSQL · pgvector · Drizzle', kind: 'skill', x: W - 36, y: H - 150 },
  { id: 'ai', label: 'AI', hint: 'LLMs · retrieval · tool loops', kind: 'skill', x: CX - 20, y: H - 30 },
  { id: 'ship', label: 'Ship', hint: 'Docker · Vercel · observability', kind: 'skill', x: 40, y: CY + 30 },
];

const edges: [string, string][] = [
  ['core', 'sprout'],
  ['core', 'atlas'],
  ['core', 'execute'],
  ['core', 'codemap'],
  ['ui', 'sprout'],
  ['api', 'sprout'],
  ['api', 'atlas'],
  ['queue', 'atlas'],
  ['queue', 'execute'],
  ['data', 'execute'],
  ['data', 'atlas'],
  ['ai', 'codemap'],
  ['ai', 'execute'],
  ['ship', 'codemap'],
  ['ship', 'sprout'],
  ['ui', 'codemap'],
];

const radius: Record<Kind, number> = { core: 92, project: 30, skill: 7 };

interface Offset {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/** Slow, small drift so the map breathes without jitter. */
function floatPosition(node: GraphNode, time: number) {
  if (node.kind === 'core') return { x: node.x, y: node.y };
  const seed = hash(node.id);
  const amp = node.kind === 'project' ? 5 : 7;
  return {
    x: node.x + Math.sin(time * (0.32 + seed * 0.22) + seed * 6) * amp,
    y: node.y + Math.cos(time * (0.27 + seed * 0.2) + seed * 4) * amp,
  };
}

function hash(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 997;
  return h / 997;
}

export default function SystemGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [time, setTime] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const offsets = useRef<Record<string, Offset>>({});
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);
  const draggingRef = useRef<string | null>(null);
  /** Eased pull toward the pointer, per node, so nodes glide instead of snapping. */
  const pulls = useRef<Record<string, { x: number; y: number }>>({});
  draggingRef.current = dragging;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    if (media.matches) return;

    let frame = 0;
    let last = performance.now();
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (svgRef.current) observer.observe(svgRef.current);

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) {
        // Spring every released node back home.
        Object.entries(offsets.current).forEach(([id, o]) => {
          if (id === draggingRef.current) return;
          o.vx += -o.x * 60 * dt;
          o.vy += -o.y * 60 * dt;
          o.vx *= 0.86;
          o.vy *= 0.86;
          o.x += o.vx * dt * 6;
          o.y += o.vy * dt * 6;
        });
        // Ease each node's pointer pull toward its target.
        const t = now / 1000;
        nodes.forEach((node) => {
          const current = pulls.current[node.id] ?? { x: 0, y: 0 };
          let tx = 0;
          let ty = 0;
          const p = pointer.current;
          if (p && node.kind !== 'core' && node.id !== draggingRef.current) {
            const base = floatPosition(node, t);
            const dx = p.x - base.x;
            const dy = p.y - base.y;
            const d = Math.hypot(dx, dy);
            if (d < 150 && d > 0.01) {
              const pull = (1 - d / 150) ** 2 * (node.kind === 'skill' ? 16 : 10);
              tx = (dx / d) * pull;
              ty = (dy / d) * pull;
            }
          }
          const ease = 1 - Math.exp(-dt * 7);
          pulls.current[node.id] = { x: current.x + (tx - current.x) * ease, y: current.y + (ty - current.y) * ease };
        });
        setTime(t);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const toLocal = (event: { clientX: number; clientY: number }) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return { x: ((event.clientX - rect.left) / rect.width) * W, y: ((event.clientY - rect.top) / rect.height) * H };
  };

  const position = (node: GraphNode) => {
    const o = offsets.current[node.id];
    const base = reduced ? { x: node.x, y: node.y } : floatPosition(node, time);
    const pull = pulls.current[node.id] ?? { x: 0, y: 0 };
    return { x: base.x + (o?.x ?? 0) + pull.x, y: base.y + (o?.y ?? 0) + pull.y };
  };

  const pos = Object.fromEntries(nodes.map((node) => [node.id, position(node)])) as Record<string, { x: number; y: number }>;
  const connected = (id: string) => new Set(edges.filter(([a, b]) => a === id || b === id).flat());
  const active = hovered ? connected(hovered) : null;

  const onPointerDown = (event: ReactPointerEvent<SVGGElement>, id: string) => {
    if (reduced) return;
    (event.target as Element).setPointerCapture?.(event.pointerId);
    moved.current = false;
    setDragging(id);
  };

  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const local = toLocal(event);
    pointer.current = local;
    if (!dragging) return;
    const node = nodes.find((n) => n.id === dragging);
    if (!node) return;
    moved.current = true;
    offsets.current[dragging] = { x: local.x - node.x, y: local.y - node.y, vx: 0, vy: 0 };
  };

  const onPointerUp = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (dragging && moved.current) {
      const local = toLocal(event);
      setBursts((current) => [...current.slice(-4), { id: Date.now(), x: local.x, y: local.y }]);
    }
    setDragging(null);
  };

  const open = (node: GraphNode) => {
    if (moved.current) return;
    if (node.href) window.location.href = node.href;
  };

  const hoveredNode = nodes.find((node) => node.id === hovered);

  return (
    <div className="graph">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="graph__svg"
        role="group"
        aria-label="Interactive map of Priyansh’s projects and skills. Drag nodes, or select a project to open its case study."
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => {
          pointer.current = null;
          setHovered(null);
        }}
      >
        <defs>
          <clipPath id="graph-core-clip">
            <circle cx={0} cy={0} r={radius.core - 6} />
          </clipPath>
          <radialGradient id="graph-glow">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={220} className="graph__orbit" />
        <circle cx={CX} cy={CY} r={150} className="graph__orbit graph__orbit--inner" />

        {edges.map(([a, b], index) => {
          const from = pos[a];
          const to = pos[b];
          const lit = active ? active.has(a) && active.has(b) && (a === hovered || b === hovered) : false;
          const dim = active && !lit;
          const speed = 0.12 + hash(a + b) * 0.12;
          const raw = reduced ? 0.5 : (time * speed + hash(b + a)) % 1;
          const t = raw * raw * (3 - 2 * raw);
          // Packets flow inward: skills feed projects, projects feed the core.
          const px = to.x + (from.x - to.x) * (1 - t);
          const py = to.y + (from.y - to.y) * (1 - t);
          const sx = from.x + (to.x - from.x) * t;
          const sy = from.y + (to.y - from.y) * t;
          const packet = a === 'core' ? { x: px, y: py } : { x: sx, y: sy };
          return (
            <g key={`${a}-${b}`} className={`graph__edge${lit ? ' is-lit' : ''}${dim ? ' is-dim' : ''}`}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
              {!reduced && <circle cx={packet.x} cy={packet.y} r={lit ? 4 : 2.6} className="graph__packet" style={{ animationDelay: `${index * 0.1}s` }} />}
            </g>
          );
        })}

        {bursts.map((burst) => (
          <circle key={burst.id} cx={burst.x} cy={burst.y} r={10} className="graph__burst" onAnimationEnd={() => setBursts((current) => current.filter((b) => b.id !== burst.id))} />
        ))}

        {[...nodes].sort((a, b) => (a.kind === 'core' ? -1 : b.kind === 'core' ? 1 : 0)).map((node) => {
          const p = pos[node.id];
          const r = radius[node.kind];
          const dim = active && !active.has(node.id) && hovered !== node.id;
          const isHover = hovered === node.id;
          const interactive = node.kind !== 'core';
          return (
            <g
              key={node.id}
              className={`graph__node graph__node--${node.kind}${dim ? ' is-dim' : ''}${isHover ? ' is-hover' : ''}${dragging === node.id ? ' is-drag' : ''}`}
              transform={`translate(${p.x} ${p.y})`}
              onPointerEnter={() => setHovered(node.id)}
              onPointerLeave={() => !dragging && setHovered(null)}
              onPointerDown={interactive ? (event) => onPointerDown(event, node.id) : undefined}
              onClick={() => open(node)}
              onFocus={() => setHovered(node.id)}
              onBlur={() => setHovered(null)}
              onKeyDown={(event) => {
                if ((event.key === 'Enter' || event.key === ' ') && node.href) {
                  event.preventDefault();
                  window.location.href = node.href;
                }
              }}
              tabIndex={node.href ? 0 : -1}
              role={node.href ? 'link' : undefined}
              aria-label={node.href ? `${node.label}: ${node.hint}. Open case study` : undefined}
            >
              {node.kind === 'core' && <circle r={r + 46} fill="url(#graph-glow)" className="graph__halo" />}
              {node.kind === 'project' && <circle r={r + 10} className="graph__ring" />}
              <circle r={isHover && node.kind === 'skill' ? r + 3 : r} className="graph__dot" />
              {node.kind === 'core' && (
                <>
                  <image href="/profile/priyansh.webp" x={-r} y={-r * 1.1} width={r * 2} height={r * 2.67} preserveAspectRatio="xMidYMin slice" clipPath="url(#graph-core-clip)" className="graph__portrait" />
                  <circle r={r - 6} className="graph__portrait-ring" />
                </>
              )}
              {node.kind === 'project' && (
                <text className="graph__initial" dy="0.36em" textAnchor="middle">
                  {node.label.slice(0, 1)}
                </text>
              )}
              {node.kind !== 'core' && (
                <text className="graph__label" y={node.kind === 'project' ? r + 24 : -16} textAnchor="middle">
                  {node.label}
                </text>
              )}
            </g>
          );
        })}

      </svg>

      <div className={`graph__card${hoveredNode ? ' is-on' : ''}`} aria-live="polite">
        {hoveredNode ? (
          <>
            <strong>{hoveredNode.label}</strong>
            <span>{hoveredNode.hint}</span>
            {hoveredNode.href && <em>Open · or drag to play</em>}
          </>
        ) : (
          <span className="graph__hint">Drag a node · tap a project to open it</span>
        )}
      </div>
    </div>
  );
}
