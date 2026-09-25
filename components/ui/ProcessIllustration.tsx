'use client';

import { motion, useReducedMotion } from '@/components/ui/LabMotion';

const scenes = [
  { labels: ['USER', 'CONSTRAINT', 'OUTCOME'], title: 'Frame the right question', note: 'A brief before a blueprint.' },
  { labels: ['INTERFACE', 'API', 'DATA'], title: 'Connect the responsibilities', note: 'Make boundaries explicit.' },
  { labels: ['VIEW', 'ACTION', 'STATE'], title: 'Build one complete slice', note: 'A small path, working end to end.' },
  { labels: ['VALIDATE', 'AUTHORIZE', 'EXECUTE'], title: 'Put trust at every boundary', note: 'Every action passes through a gate.' },
  { labels: ['RELEASE', 'OBSERVE', 'RECOVER'], title: 'Make the system operable', note: 'Shipping includes the way back.' },
  { labels: ['EVIDENCE', 'DECISION', 'ITERATE'], title: 'Close the learning loop', note: 'Let real use shape the next release.' },
];

export default function ProcessIllustration({ index, accent }: { index: number; accent: string }) {
  const reduced = useReducedMotion();
  const scene = scenes[index];
  return <div className="process-illustration">
    <svg viewBox="0 0 600 230" role="img" aria-label={`${scene.title}: ${scene.labels.join(' to ')}`}>
      <defs><pattern id={`process-grid-${index}`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="currentColor" opacity=".12" /></pattern></defs>
      <rect width="600" height="230" fill={`url(#process-grid-${index})`} />
      {index === 5 && <motion.path d="M490 160 V202 H110 V160" fill="none" stroke={accent} strokeOpacity=".5" strokeDasharray="4 5" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .8 }} />}
      {[0, 1].map((n) => <g key={n}><path d={`M${180 + n * 190} 110 H${230 + n * 190}`} stroke={accent} strokeOpacity=".3" /><motion.path d={`M${180 + n * 190} 110 H${230 + n * 190}`} stroke={accent} strokeWidth="2" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .5, delay: .25 + n * .2 }} /><path d={`M${224 + n * 190} 106 l5 4 -5 4`} stroke={accent} fill="none" /></g>)}
      {scene.labels.map((label, n) => <motion.g key={label} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: n * .12 }}>
        <rect x={40 + n * 190} y="48" width="140" height="122" rx={index === 3 ? 28 : 12} className="process-node" stroke={accent} strokeOpacity=".4" />
        {index === 0 ? <g stroke={accent} strokeLinecap="round"><path d={`M${62 + n * 190} 78 h54 M${62 + n * 190} 91 h92 M${62 + n * 190} 104 h72`} opacity=".6" /><circle cx={155 + n * 190} cy="67" r="3" fill={accent} /></g>
        : index === 1 ? <g stroke={accent} fill="none"><rect x={91 + n * 190} y="70" width="38" height="30" rx="5" /><path d={`M${110 + n * 190} 100 v12 m-16 0 h32`} /><circle cx={110 + n * 190} cy="84" r="4" fill={accent} /></g>
        : index === 2 ? <g fill={accent}><rect x={61 + n * 190} y="67" width="98" height="8" rx="3" opacity=".65" /><rect x={61 + n * 190} y="82" width="24" height="32" rx="3" opacity=".2" /><rect x={93 + n * 190} y="82" width="66" height="13" rx="3" opacity=".35" /><rect x={93 + n * 190} y="102" width="42" height="12" rx="3" opacity=".6" /></g>
        : index === 3 ? <g stroke={accent} fill="none" strokeWidth="2"><path d={`M${110 + n * 190} 63 l22 8 v17 q0 19 -22 28 q-22 -9 -22 -28 V71 Z`} /><motion.path d={`M${99 + n * 190} 88 l8 8 15 -17`} initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: .3 + n * .2, duration: .4 }} /></g>
        : index === 4 ? <g stroke={accent} fill="none" strokeWidth="2">{n === 0 ? <path d="M110 115 V68 m-17 18 17 -18 17 18 M85 108 v12 h50 v-12" /> : n === 1 ? <path d="M250 96 h20 l10 -18 14 32 12 -23 12 9 h32" /> : <path d="M470 88 a23 23 0 1 1 2 22 M470 72 v17 h17" />}</g>
        : <g stroke={accent} fill="none" strokeWidth="2"><circle cx={110 + n * 190} cy="90" r="22" strokeDasharray={n === 2 ? '5 4' : undefined} /><path d={`M${99 + n * 190} 90 h22 m-11 -11 v22`} /></g>}
        <text x={110 + n * 190} y="148" textAnchor="middle" fill="currentColor" fontSize="10" letterSpacing="1.5">{label}</text>
      </motion.g>)}
    </svg>
    <div className="process-mobile-labels" aria-hidden="true">{scene.labels.map((label) => <span key={label}>{label}</span>)}</div>
    <div className="flex flex-wrap items-baseline justify-between gap-2"><p className="text-sm text-text-primary">{scene.title}</p><p className="text-xs text-text-muted">{scene.note}</p></div>
  </div>;
}
