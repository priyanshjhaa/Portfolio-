'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { companion } from '@/lib/data';
import PixelMe, { PIXEL_W } from '@/components/fun/PixelMe';
import type { PixelFrame } from '@/components/fun/PixelMe';
import { triggerBurst } from '@/components/fun/PacketBurst';

export const companionEvent = 'portfolio:companion';
const storageKey = 'mini-priyansh-hidden';
const sectionIds = ['work', 'approach', 'log', 'contact'] as const;

/** Let other parts of the page (like the command palette) summon him back. */
export function summonCompanion() {
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(companionEvent));
}

interface Marker {
  id: string;
  label: string;
  x: number;
}

/**
 * Mini Priyansh walks along the bottom of the screen as the visitor scrolls:
 * his position is the reading progress. He greets each section in Priyansh's
 * own words, hops over section markers, dozes off when the page goes quiet,
 * waves when clicked, and celebrates at the end.
 */
export default function Companion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [frame, setFrame] = useState<PixelFrame>('idle');
  const [facing, setFacing] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [sleeping, setSleeping] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [bubbleLeft, setBubbleLeft] = useState(false);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [scale, setScale] = useState(4);

  const xRef = useRef(0);
  const lastY = useRef(0);
  const greeted = useRef(new Set<string>());
  const bubbleTimer = useRef(0);
  const walkTimer = useRef(0);
  const idleTimer = useRef(0);
  const clickIndex = useRef(0);
  const celebrated = useRef(false);
  const reduced = useRef(false);
  const busyUntil = useRef(0);
  const sleepingRef = useRef(false);
  sleepingRef.current = sleeping;

  const say = useCallback((text: string, ms = 4200) => {
    window.clearTimeout(bubbleTimer.current);
    setBubble(text);
    // On phones the bubble sits over the text being read, so keep it brief.
    const duration = window.innerWidth < 720 ? Math.min(ms, 2600) : ms;
    bubbleTimer.current = window.setTimeout(() => setBubble(null), duration);
  }, []);

  const hop = useCallback(() => {
    if (reduced.current) return;
    setJumping(true);
    window.setTimeout(() => setJumping(false), 520);
  }, []);

  const scheduleNap = useCallback(() => {
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      setSleeping(true);
      say(companion.sleep, 6000);
    }, 12000);
  }, [say]);

  // Show unless the visitor sent him home before.
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let wasHidden = false;
    try {
      wasHidden = window.localStorage.getItem(storageKey) === '1';
    } catch {
      /* ignore */
    }
    setHidden(wasHidden);
    const onSummon = () => {
      setHidden(false);
      window.setTimeout(() => {
        hop();
        say(companion.back);
      }, 100);
    };
    window.addEventListener(companionEvent, onSummon);
    return () => window.removeEventListener(companionEvent, onSummon);
  }, [hop, say]);

  // Position along the bottom = reading progress. Greets sections on arrival.
  useEffect(() => {
    if (hidden) return;
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const small = window.innerWidth < 720;
      setScale(small ? 3 : 4);
      const travel = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const track = window.innerWidth - PIXEL_W * (small ? 3 : 4) - 48;
      setMarkers(
        sectionIds
          .map((id): Marker | null => {
            const section = document.getElementById(id);
            if (!section || travel === 0) return null;
            const progress = Math.min(1, Math.max(0, (section.offsetTop - window.innerHeight * 0.4) / travel));
            const label = id === 'log' ? 'evidence' : id;
            return { id, label, x: 24 + progress * track + (PIXEL_W * (small ? 3 : 4)) / 2 };
          })
          .filter((marker): marker is Marker => Boolean(marker))
      );
    };

    let frameId = 0;
    const place = () => {
      const small = window.innerWidth < 720;
      const travel = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / travel));
      const track = window.innerWidth - PIXEL_W * (small ? 3 : 4) - 48;
      // Phones: park in the bottom-right corner instead of walking across the text.
      const x = small ? window.innerWidth - PIXEL_W * 3 - 14 : reduced.current ? 24 : 24 + progress * track;
      xRef.current = x;
      root.style.setProperty('--x', `${x}px`);
      setBubbleLeft(small || x > window.innerWidth - 300);

      // Which section are we reading?
      const marker = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = null;
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      if (current && !greeted.current.has(current)) {
        greeted.current.add(current);
        hop();
        say(companion.sections[current as keyof typeof companion.sections]);
      }

      if (progress > 0.985 && !celebrated.current) {
        celebrated.current = true;
        busyUntil.current = Date.now() + 1600;
        setFrame('cheer');
        hop();
        const rect = root.querySelector('.companion__sprite')?.getBoundingClientRect();
        if (rect) triggerBurst(rect.left + rect.width / 2, rect.top);
        say(companion.end, 5200);
      }
    };

    const onScroll = () => {
      const delta = window.scrollY - lastY.current;
      lastY.current = window.scrollY;
      if (Math.abs(delta) > 0) setFacing(delta > 0 ? 1 : -1);
      if (sleepingRef.current) {
        setSleeping(false);
        say(companion.wake, 2200);
      }
      setWalking(true);
      window.clearTimeout(walkTimer.current);
      walkTimer.current = window.setTimeout(() => setWalking(false), 160);
      scheduleNap();
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(place);
    };

    measure();
    lastY.current = window.scrollY;
    place();
    scheduleNap();

    // Say hello once he has walked in.
    const hello = window.setTimeout(() => {
      if (!greeted.current.has('hello')) {
        greeted.current.add('hello');
        say(companion.hello, 5200);
      }
    }, 1400);

    const resizeObserver = new ResizeObserver(() => {
      measure();
      place();
    });
    resizeObserver.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(hello);
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [hidden, hop, say, scheduleNap]);

  // Walk cycle and idle blinking.
  useEffect(() => {
    if (hidden) return;
    let tick = 0;
    const id = window.setInterval(() => {
      tick += 1;
      if (Date.now() < busyUntil.current) return;
      if (sleeping) return setFrame('sleep');
      if (walking && !reduced.current) return setFrame(tick % 2 ? 'walkA' : 'walkB');
      setFrame(tick % 28 === 0 ? 'blink' : 'idle');
    }, 120);
    return () => window.clearInterval(id);
  }, [hidden, walking, sleeping]);

  useEffect(
    () => () => {
      window.clearTimeout(bubbleTimer.current);
      window.clearTimeout(walkTimer.current);
      window.clearTimeout(idleTimer.current);
    },
    []
  );

  const poke = () => {
    setSleeping(false);
    scheduleNap();
    busyUntil.current = Date.now() + 1300;
    setFrame('wave');
    hop();
    const line = companion.pokes[clickIndex.current % companion.pokes.length];
    clickIndex.current += 1;
    say(line, 4800);
  };

  const sendHome = () => {
    try {
      window.localStorage.setItem(storageKey, '1');
    } catch {
      /* ignore */
    }
    setBubble(null);
    setHidden(true);
  };

  if (hidden) return null;

  return (
    <div ref={rootRef} className="companion" aria-label="Mini Priyansh" role="region">
      <div className="companion__track" aria-hidden="true">
        {markers.map((marker) => (
          <span key={marker.id} className="companion__marker" style={{ left: marker.x }}>
            <i />
            <span>{marker.label}</span>
          </span>
        ))}
      </div>

      <div className={`companion__body${jumping ? ' is-jumping' : ''}${sleeping ? ' is-sleeping' : ''}`}>
        {bubble && (
          <p className={`companion__bubble${bubbleLeft ? ' companion__bubble--left' : ''}`} aria-hidden="true">
            {bubble}
          </p>
        )}
        {sleeping && (
          <span className="companion__zzz" aria-hidden="true">
            <i>z</i>
            <i>z</i>
            <i>Z</i>
          </span>
        )}
        <button type="button" className="companion__sprite" onClick={poke} aria-label="Mini Priyansh. Click to say hi." style={{ transform: `scaleX(${facing})` }}>
          <PixelMe frame={frame} scale={scale} />
        </button>
        <button type="button" className="companion__close" onClick={sendHome} aria-label="Send mini Priyansh home" title="Send mini Priyansh home">
          <X aria-hidden="true" />
        </button>
        <span className="companion__shadow" aria-hidden="true" />
      </div>
    </div>
  );
}
