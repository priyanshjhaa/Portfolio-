import type { Project } from '@/types/project';
import { contact } from '@/lib/data';

export type ProjectStateTone = 'live' | 'building' | 'pending' | 'quiet';

export interface ProjectState {
  tone: ProjectStateTone;
  label: string;
  note?: string;
}

/** One honest status line per project, derived from its data. */
export function getProjectState(project: Project): ProjectState {
  if (project.availability) {
    return {
      tone: project.availability.kind === 'in-build' ? 'building' : 'pending',
      label: project.availability.label,
      note: project.availability.note,
    };
  }

  if (project.status === 'archived') return { tone: 'quiet', label: project.liveUrl ? 'Live · archived' : 'Archived' };
  if (project.status === 'maintenance') return { tone: 'quiet', label: project.liveUrl ? 'Live · maintained' : 'Maintained' };
  return { tone: 'live', label: project.liveUrl ? 'Live' : 'Active' };
}

/** Prefilled email for projects that can only be shown in a guided walkthrough. */
export function getWalkthroughHref(project: Project) {
  const subject = `Walkthrough request: ${project.name}`;
  const body = `Hi Priyansh,\n\nI'd like to see a walkthrough of ${project.name}.\n\n`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const projectNumber = (index: number) => String(index + 1).padStart(2, '0');
