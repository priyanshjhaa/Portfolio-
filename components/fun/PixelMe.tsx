/**
 * Mini Priyansh: a 14×22 pixel-art version of the portrait — dark hair,
 * glasses, beard, white shirt and tie under a denim jacket.
 * Frames are built from one base drawing plus small pixel patches.
 */

export type PixelFrame = 'idle' | 'blink' | 'walkA' | 'walkB' | 'wave' | 'sleep' | 'cheer';

const palette: Record<string, string> = {
  H: '#1f1a17', // hair
  S: '#c68a62', // skin
  s: '#a96f4c', // skin shadow
  G: '#141312', // glasses frame
  L: '#cfe3f5', // lens glare
  K: '#141312', // eye
  B: '#2d2420', // beard
  M: '#7a3b2e', // mouth
  J: '#6d8db1', // denim
  j: '#4f6f94', // denim shadow
  W: '#f2eee6', // shirt
  T: '#1b1b1d', // tie
  P: '#2a2f3b', // trousers
  F: '#141312', // shoes
};

const base = [
  '....HHHHHH....',
  '..HHHHHHHHHH..',
  '.HHHHHHHHHHHH.',
  '.HHSSSSSSSSHH.',
  '.HSSSSSSSSSSH.',
  '.SGGGGSSGGGGS.',
  '.SGSKGSSGKSGS.',
  '.SGGGGSSGGGGS.',
  '.sSSSSSSSSSSs.',
  '.sBBSSSSSSBBs.',
  '..BBBBMMBBBB..',
  '...BBBBBBBB...',
  '....JJWWJJ....',
  '..JJjWTTWjJJ..',
  '.JJJjWTTWjJJJ.',
  '.JJJjWTTWjJJJ.',
  '.SJJjWTTWjJJS.',
  '...JJJJJJJJ...',
  '...PPPPPPPP...',
  '....PPPPPP....',
  '....PPPPPP....',
  '...FFFFFFFF...',
];

type Patch = Record<number, string>;

const legsStride: Patch = {
  19: '..PPP....PPP..',
  20: '.PPP......PPP.',
  21: '.FF........FF.',
};

const closedEyes: Patch = { 6: '.SGssGSSGssGS.' };

const patches: Record<PixelFrame, Patch> = {
  idle: {},
  blink: closedEyes,
  walkA: legsStride,
  walkB: {},
  wave: {
    9: '.sBBSSSSSSBBsS',
    10: '..BBBBMMBBBB.S',
    11: '...BBBBBBBB.J.',
    12: '....JJWWJJ.J..',
    16: '.SJJjWTTWjJJ..',
  },
  sleep: { ...closedEyes, 10: '..BBBBBBBBBB..' },
  cheer: {
    9: 'SsBBSSSSSSBBsS',
    10: 'J.BBBMMMMBBB.J',
    11: '.J.BBBBBBBB.J.',
    12: '..J.JJWWJJ.J..',
    16: '..JJjWTTWjJJ..',
    ...legsStride,
  },
};

function rowsFor(frame: PixelFrame) {
  const patch = patches[frame];
  return base.map((row, index) => patch[index] ?? row);
}

export const PIXEL_W = 14;
export const PIXEL_H = 22;

export default function PixelMe({ frame, scale = 4, className }: { frame: PixelFrame; scale?: number; className?: string }) {
  const rows = rowsFor(frame);
  const rects: { x: number; y: number; c: string }[] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      const color = palette[row[x]];
      if (color) rects.push({ x, y, c: color });
    }
  });

  return (
    <svg
      className={className}
      width={PIXEL_W * scale}
      height={PIXEL_H * scale}
      viewBox={`0 0 ${PIXEL_W} ${PIXEL_H}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width={1.02} height={1.02} fill={rect.c} />
      ))}
    </svg>
  );
}
