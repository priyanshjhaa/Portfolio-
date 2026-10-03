'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from 'lucide-react';
import { projects } from '@/lib/data';
import { getProjectImageAspectRatio } from '@/lib/project-images';

const items = projects.filter((project) => project.image);

/** "From the product archive": framed interface captures with an inspect lightbox. */
export default function ArchiveGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (open === null) return;
    const opener = triggerRefs.current[open];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null);
      if (event.key === 'ArrowRight') setOpen((index) => (index === null ? index : (index + 1) % items.length));
      if (event.key === 'ArrowLeft') setOpen((index) => (index === null ? index : (index - 1 + items.length) % items.length));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
    // Only re-run when the lightbox opens or closes, not on every slide change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null]);

  const current = open === null ? null : items[open];
  const size = (id: string) => getProjectImageAspectRatio(id).split(' / ').map(Number);

  return (
    <div className="archive" data-reveal>
      <div className="archive__head">
        <p className="eyebrow">From the product archive</p>
        <p className="archive__hint">Real interface captures · select to inspect</p>
      </div>

      <ul className="archive__grid">
        {items.map((project, index) => {
          const [w, h] = size(project.id);
          return (
            <li key={project.id}>
              <button
                type="button"
                className="archive__card"
                ref={(element) => {
                  triggerRefs.current[index] = element;
                }}
                onClick={() => setOpen(index)}
                aria-label={`Inspect the ${project.name} interface`}
              >
                <span className="shot__bar" aria-hidden="true">
                  <i /> <i /> <i />
                  <span>{project.name.toLowerCase()} / interface</span>
                </span>
                <span className="archive__img">
                  <Image src={project.image as string} alt="" width={w || 1600} height={h || 900} sizes="(max-width: 720px) 100vw, 400px" />
                </span>
                <span className="archive__foot">
                  Inspect the interface <Maximize2 aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {current && open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${current.name} interface`} onMouseDown={(event) => event.target === event.currentTarget && setOpen(null)}>
          <div className="lightbox__panel">
            <div className="lightbox__top">
              <div>
                <strong>{current.name}</strong>
                <span>{current.summary}</span>
              </div>
              <button type="button" className="icon-btn" ref={closeRef} onClick={() => setOpen(null)} aria-label="Close">
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="lightbox__img">
              <Image src={current.image as string} alt={`${current.name} product landing page`} width={size(current.id)[0] || 1600} height={size(current.id)[1] || 900} sizes="(max-width: 1200px) 100vw, 1100px" />
            </div>
            <div className="lightbox__bottom">
              <button type="button" className="btn btn--small" onClick={() => setOpen((open - 1 + items.length) % items.length)}>
                <ArrowLeft aria-hidden="true" /> Previous
              </button>
              <Link className="btn btn--primary btn--small" href={`/systems/${current.id}/`}>
                Read the case study <ArrowUpRight aria-hidden="true" />
              </Link>
              <button type="button" className="btn btn--small" onClick={() => setOpen((open + 1) % items.length)}>
                Next <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
