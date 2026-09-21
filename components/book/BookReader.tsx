'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, BookOpen, List } from 'lucide-react';
import { bookHref, bookPages, resolveBookHash } from '@/lib/book';
import BookThemeToggle from './BookThemeToggle';

export default function BookReader({ pages }: { pages: ReactNode[] }) {
  const [activeId, setActiveId] = useState('cover');
  const [ready, setReady] = useState(false);
  const [reading, setReading] = useState(false);
  const [small, setSmall] = useState(false);
  const [outgoing, setOutgoing] = useState<{ index: number; direction: number; jump: boolean } | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const active = useRef('cover');
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const continuous = !ready || reading || small;
  const index = bookPages.findIndex(page => page.id === activeId);
  const focusPage = useCallback((id: string) => {
    const sheet = document.getElementById(`book/${id}`);
    sheet?.querySelector<HTMLElement>('[data-page-heading]')?.focus({ preventScroll: true });
    sheet?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, []);
  const navigate = useCallback((id: string, push = true, jump = false) => {
    const next = bookPages.findIndex(page => page.id === id);
    const previous = bookPages.findIndex(page => page.id === active.current);
    if (next < 0 || (locked.current && push)) return;
    if (id === active.current) { focusPage(id); return; }
    clearTimeout(timer.current);
    const animate = ready && !continuous && !reduced;
    locked.current = animate;
    setOutgoing(animate ? { index: previous, direction: next > previous ? 1 : -1, jump } : null);
    active.current = id;
    setActiveId(id);
    if (push) history.pushState(null, '', bookHref(id));
    document.title = `${bookPages[next].title} — Priyansh Jha`;
    const finish = () => {
      locked.current = false;
      setOutgoing(null);
      setAnnouncement(`${bookPages[next].chapter}. ${bookPages[next].title} Page ${next + 1} of ${bookPages.length}.`);
      requestAnimationFrame(() => focusPage(id));
    };
    if (animate) timer.current = setTimeout(finish, jump ? 180 : 450);
    else finish();
  }, [continuous, focusPage, ready, reduced]);

  useEffect(() => {
    const id = resolveBookHash(location.hash);
    active.current = id;
    setActiveId(id);
    setReady(true);
    const media = matchMedia('(max-height: 580px), (max-width: 340px)');
    const update = () => setSmall(media.matches);
    update();
    media.addEventListener('change', update);
    if (location.hash && location.hash !== `#book/${id}`) history.replaceState(null, '', bookHref(id));
    if (id !== 'cover') requestAnimationFrame(() => focusPage(id));
    return () => { clearTimeout(timer.current); media.removeEventListener('change', update); };
  }, [focusPage]);
  useEffect(() => {
    const restore = () => navigate(resolveBookHash(location.hash), false, true);
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    return () => { window.removeEventListener('popstate', restore); window.removeEventListener('hashchange', restore); };
  }, [navigate]);
  useEffect(() => {
    if (!ready || !continuous) return;
    const observer = new IntersectionObserver(entries => {
      const entry = entries.find(item => item.isIntersecting);
      if (entry) { const id = entry.target.id.slice(5); active.current = id; setActiveId(id); }
    }, { rootMargin: '-12% 0px -65% 0px' });
    document.querySelectorAll('.book-sheet').forEach(sheet => observer.observe(sheet));
    return () => observer.disconnect();
  }, [continuous, ready]);
  const turn = (direction: number) => {
    const next = bookPages[bookPages.findIndex(page => page.id === active.current) + direction];
    if (next) navigate(next.id);
  };

  return <main className={`book-reader ${continuous ? 'book-reading' : 'book-paged'}`} onClick={event => {
    if (!ready || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="/#book/"]');
    if (anchor) { event.preventDefault(); navigate(resolveBookHash(anchor.hash), true, true); }
  }} onKeyDown={event => {
    if (continuous || event.altKey || event.metaKey || event.ctrlKey || (event.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); turn(event.key === 'ArrowRight' ? 1 : -1); }
  }}>
    <a className="book-skip" href={bookHref(activeId)}>Skip to page</a>
    <header className="book-toolbar"><a className="book-brand" href={bookHref('cover')} aria-label="Priyansh Jha, book cover">pj<span>A book of work</span></a><nav aria-label="Reader controls"><a href={bookHref('contents')}><List size={16} /><span>Contents</span></a>{ready && <><button disabled={small} aria-pressed={reading || small} onClick={() => { const id = active.current; setReading(!reading); requestAnimationFrame(() => focusPage(id)); }}><BookOpen size={16} /><span>{continuous ? 'Page mode' : 'Reading mode'}</span></button><BookThemeToggle /></>}</nav></header>
    <noscript><p className="book-fallback-notice">The complete book is available below. Use Contents to jump between chapters.</p></noscript>
    {small && <p className="book-fallback-notice">Reading view · extra room for every word.</p>}
    <div className="book-stage" onPointerDown={event => {
      if (continuous || event.pointerType === 'mouse' || (event.target as HTMLElement).closest('a, button, input, select')) return;
      pointer.current = { x: event.clientX, y: event.clientY };
    }} onPointerCancel={() => { pointer.current = null; }} onPointerUp={event => {
      const start = pointer.current; pointer.current = null;
      if (!start) return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 2) turn(dx < 0 ? 1 : -1);
    }}>
      {pages.map((page, i) => {
        const turning = outgoing?.index === i;
        return <motion.div className={`book-page-slot${turning ? ' book-turning-page' : ''}`} key={bookPages[i].id} hidden={!continuous && i !== index && !turning} inert={turning || (!continuous && i !== index)} aria-hidden={turning || undefined} animate={{ rotateY: turning && !outgoing.jump ? -100 * outgoing.direction : 0, opacity: turning ? 0 : 1 }} transition={{ duration: !outgoing || reduced ? 0 : outgoing.jump ? .18 : .45, ease: [.22, .61, .36, 1] }}>{page}</motion.div>;
      })}
    </div>
    {ready && <nav className="book-controls" aria-label="Page navigation"><button disabled={index === 0 || !!outgoing} onClick={() => turn(-1)}><ArrowLeft size={16} /> Previous</button><div><span>{String(index + 1).padStart(2, '0')} / {bookPages.length}</span><small>{bookPages[index].chapter}</small></div><button disabled={index === bookPages.length - 1 || !!outgoing} onClick={() => turn(1)}>Next <ArrowRight size={16} /></button></nav>}
    <div className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</div>
  </main>;
}
