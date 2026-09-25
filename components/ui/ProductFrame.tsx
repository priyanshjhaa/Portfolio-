'use client';

import Image from 'next/image';
import { Expand, X } from 'lucide-react';
import { useRef } from 'react';
import { getProjectImageAspectRatio } from '@/lib/project-images';
import type { Project } from '@/types/project';

export default function ProductFrame({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  if (!project.image) return null;

  return (
    <div className="product-frame-group">
      <button type="button" className="product-frame group w-full text-left" onClick={() => dialog.current?.showModal()} aria-label={`Expand ${project.name} screenshot`}>
        <span className="product-browser-bar"><span className="flex gap-1.5" aria-hidden="true"><i /><i /><i /></span><span>{project.name.toLowerCase()} / interface</span><Expand className="h-3.5 w-3.5" /></span>
        <span className="relative block overflow-hidden" style={{ aspectRatio: getProjectImageAspectRatio(project.id) }}>
          <Image src={project.image} alt={`${project.name} landing page`} fill quality={84} className="object-contain transition-transform duration-700 group-hover:scale-[1.025]" sizes="(max-width: 768px) 95vw, (max-width: 1024px) 90vw, 820px" />
        </span>
        <span className="product-frame-hint">Inspect the interface <Expand className="h-3 w-3" /></span>
      </button>
      <dialog ref={dialog} className="product-dialog" aria-label={`${project.name} interface screenshot`} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="product-dialog-body">
          <div className="flex items-center justify-between gap-5 p-4 sm:p-5"><h3 className="text-sm text-text-primary">{project.name} · Interface screenshot</h3><button type="button" autoFocus onClick={() => dialog.current?.close()} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15" aria-label="Close screenshot"><X className="h-5 w-5" /></button></div>
          <div className="relative w-full" style={{ aspectRatio: getProjectImageAspectRatio(project.id) }}><Image src={project.image} alt={`${project.name} full interface screenshot`} fill quality={84} className="object-contain" sizes="95vw" /></div>
          <p className="p-5 text-sm text-text-secondary">{project.proofFrame?.title ?? project.summary}</p>
        </div>
      </dialog>
    </div>
  );
}
