'use client';

import { motion, useReducedMotion } from '@/components/ui/LabMotion';
import { projectVisuals } from '@/lib/data';

/** Decorative identities derived from each product's purpose, not live system diagrams. */
function Motif({ id }: { id: string }) {
  switch (id) {
    case 'sprout':
      return <>
        <ellipse cx="170" cy="94" rx="101" ry="28" opacity=".16" />
        <ellipse cx="170" cy="94" rx="70" ry="17" opacity=".25" />
        <path d="M170 98V65M170 78C137 82 124 66 128 46C151 44 172 54 170 78ZM170 66C168 41 186 25 211 28C213 50 198 67 170 66Z" fill="currentColor" fillOpacity=".12" />
        <path d="M170 78L143 58M170 66L198 39" opacity=".5" />
        <rect x="48" y="32" width="46" height="34" rx="7" /><path d="M48 42H94M59 52H75" opacity=".5" />
        <rect x="246" y="56" width="46" height="34" rx="7" /><path d="M246 66H292M257 77H275" opacity=".5" />
        <path d="M94 50H108V94H137M246 73H230V94H202" strokeDasharray="3 5" opacity=".45" />
        <circle cx="170" cy="98" r="4" fill="currentColor" />
      </>;
    case 'atlas':
      return <>
        <path d="M64 35L168 68L269 27M64 103L168 68L275 107M168 68L191 17M168 68L171 121M64 35L64 103M269 27L275 107" opacity=".4" />
        <path d="M64 103L269 27" strokeDasharray="3 5" opacity=".25" />
        <circle cx="168" cy="68" r="30" opacity=".2" /><circle cx="168" cy="68" r="20" fill="currentColor" fillOpacity=".12" />
        <path d="M159 69L165 75L179 60" strokeWidth="2" />
        {[[64,35],[64,103],[269,27],[275,107]].map(([x,y]) => <g key={x+y}><rect x={x-15} y={y-12} width="30" height="24" rx="5" fill="var(--control-surface-raised)" /><path d={`M${x-7} ${y-3}h14m-14 6h9`} opacity=".65" /></g>)}
        <circle cx="191" cy="17" r="4" fill="currentColor" /><circle cx="171" cy="121" r="4" fill="currentColor" />
      </>;
    case 'execute':
      return <>
        <path d="M40 70H99M147 70H205M249 70H305M124 44V22H226V44M226 96V117H124V96" opacity=".5" />
        <circle cx="40" cy="70" r="9" fill="currentColor" fillOpacity=".15" />
        <path d="M124 43L150 70L124 97L98 70Z" fill="currentColor" fillOpacity=".1" />
        <path d="M115 70L121 76L133 63" strokeWidth="2" />
        <rect x="204" y="46" width="45" height="48" rx="10" fill="currentColor" fillOpacity=".12" />
        <path d="M221 60L235 70L221 80Z" fill="currentColor" stroke="none" />
        <circle cx="305" cy="70" r="5" fill="currentColor" /><path d="M167 18L173 22L167 26M176 113L170 117L176 121" />
        <path d="M158 64H187M158 76H180" opacity=".2" />
      </>;
    case 'codemap':
      return <>
        <path d="M81 42V102H150M81 70H226M174 70V105H226M110 30H226" opacity=".45" />
        <path d="M52 19H72L79 26H110V47H52Z" fill="currentColor" fillOpacity=".13" />
        {[[226,18],[226,58],[226,98],[150,90]].map(([x,y]) => <g key={x+y}><rect x={x} y={y} width="40" height="25" rx="5" fill="var(--control-surface-raised)" /><path d={`M${x+13} ${y+8}l-5 5 5 5m14-10 5 5-5 5`} opacity=".75" /></g>)}
        <circle cx="81" cy="70" r="4" fill="currentColor" /><circle cx="174" cy="70" r="4" fill="currentColor" />
        <path d="M281 22H293V118H281" strokeDasharray="3 5" opacity=".3" />
      </>;
    case 'axiom':
      return <>
        <path d="M42 95H171L200 66H258" opacity=".45" />
        {[55,108,161].map((x,n) => <g key={x}><circle cx={x} cy="95" r="8" fill="var(--control-surface-raised)" /><path d={`M${x-3} 95l2 3 5-6`} /><rect x={x-17} y={54-n*12} width="34" height={24+n*12} rx="5" fill="currentColor" fillOpacity=".07" strokeOpacity=".25" /></g>)}
        <path d="M221 24H273L287 38V106H221ZM273 24V38H287" fill="currentColor" fillOpacity=".1" />
        <path d="M234 52H270M234 63H259M234 84H247M257 84H274" opacity=".6" />
      </>;
    case 'cinematch':
      return <>
        <rect x="62" y="33" width="76" height="84" rx="10" transform="rotate(-12 100 75)" opacity=".3" />
        <rect x="205" y="33" width="76" height="84" rx="10" transform="rotate(12 243 75)" opacity=".3" />
        <rect x="126" y="20" width="91" height="103" rx="12" fill="currentColor" fillOpacity=".1" />
        <path d="M163 49L189 65L163 81Z" fill="currentColor" fillOpacity=".65" stroke="none" />
        <path d="M140 98H203M140 108H179" opacity=".45" />
        <path d="M277 15L280 24L289 27L280 30L277 39L274 30L265 27L274 24Z" fill="currentColor" fillOpacity=".3" />
      </>;
    default:
      return null;
  }
}

export default function ProjectArtwork({ projectId, compact = false }: { projectId: string; compact?: boolean }) {
  const reduced = useReducedMotion();
  const visual = projectVisuals[projectId];
  if (!visual) return null;

  return (
    <motion.div
      className={`project-artwork${compact ? ' project-artwork--compact' : ''}`}
      style={{ color: visual.accent }}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 340 140" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Motif id={projectId} />
      </svg>
    </motion.div>
  );
}
