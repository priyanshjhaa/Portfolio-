import { buildStages, capabilities, projects, recentBuilds } from '@/lib/data';

export type PageKind = 'cover' | 'contents' | 'introduction' | 'overview' | 'story' | 'architecture' | 'judgment' | 'proof' | 'notes' | 'capability' | 'process' | 'current' | 'receipts' | 'history' | 'contact';
export interface BookPage {
  id: string;
  chapterId: string;
  chapter: string;
  title: string;
  kind: PageKind;
  projectId?: string;
  itemId?: string;
  offset?: number;
}
export interface BookChapter { id: string; title: string; description: string; pageId: string; status?: string }

export const projectOrder = ['sprout', 'atlas', 'execute', 'codemap', 'axiom', 'cinematch'];
export const orderedProjects = projectOrder.map(id => projects.find(project => project.id === id)!);

export const bookPages: BookPage[] = [
  { id: 'cover', chapterId: 'cover', chapter: 'A book of work', title: 'A book of work.', kind: 'cover' },
  { id: 'contents', chapterId: 'contents', chapter: 'Find your way', title: 'Contents', kind: 'contents' },
  { id: 'introduction', chapterId: 'introduction', chapter: 'A short introduction', title: 'Hello, I’m Priyansh.', kind: 'introduction' },
  ...orderedProjects.flatMap((project): BookPage[] => {
    const base = { chapterId: project.id, chapter: project.name, projectId: project.id };
    return [
      { ...base, id: `${project.id}-overview`, title: project.name, kind: 'overview' },
      { ...base, id: `${project.id}-story`, title: 'Why this needed to exist.', kind: 'story' },
      ...Array.from({ length: Math.ceil((project.architectureStages?.length ?? 0) / 2) }, (_, index): BookPage => ({
        ...base, id: `${project.id}-architecture-${index + 1}`, title: 'How it comes together.', kind: 'architecture', offset: index * 2,
      })),
      { ...base, id: `${project.id}-judgment`, title: 'The decisions underneath.', kind: 'judgment' },
      { ...base, id: `${project.id}-proof`, title: 'The work behind the words.', kind: 'proof' },
      { ...base, id: `${project.id}-notes`, title: 'Notes from the build.', kind: 'notes' },
    ];
  }),
  ...capabilities.map((item): BookPage => ({ id: `toolkit-${item.id}`, chapterId: 'toolkit', chapter: 'The toolkit', title: item.label, kind: 'capability', itemId: item.id })),
  ...Array.from({ length: Math.ceil(buildStages.length / 2) }, (_, index): BookPage => ({ id: `process-${index + 1}`, chapterId: 'process', chapter: 'How I build', title: ['Start with understanding.', 'Make it real. Make it safe.', 'Ship, listen, improve.'][index], kind: 'process', offset: index * 2 })),
  { id: 'current-work', chapterId: 'evidence', chapter: 'The work continues', title: 'On the workbench.', kind: 'current' },
  { id: 'receipts', chapterId: 'evidence', chapter: 'The work continues', title: 'A few concrete receipts.', kind: 'receipts' },
  ...recentBuilds.map((item, index): BookPage => ({ id: `history-${item.period.toLowerCase().replaceAll(' ', '-')}`, chapterId: 'evidence', chapter: 'Shipping notes', title: item.period, kind: 'history', offset: index })),
  { id: 'contact', chapterId: 'contact', chapter: 'An open invitation', title: 'Let’s make something useful.', kind: 'contact' },
];

export const bookChapters: BookChapter[] = [
  { id: 'introduction', title: 'A short introduction', description: 'The person behind the work.', pageId: 'introduction' },
  ...orderedProjects.map(project => ({ id: project.id, title: project.name, description: project.summary ?? project.problem, pageId: `${project.id}-overview`, status: project.id === 'sprout' ? 'In development' : project.status })),
  { id: 'toolkit', title: 'The toolkit', description: 'Capabilities, connected to actual work.', pageId: `toolkit-${capabilities[0].id}` },
  { id: 'process', title: 'How I build', description: 'From the first question to the next release.', pageId: 'process-1' },
  { id: 'evidence', title: 'The work continues', description: 'Current focus, receipts, and shipping notes.', pageId: 'current-work' },
  { id: 'contact', title: 'An open invitation', description: 'A place to start a conversation.', pageId: 'contact' },
];

const legacyPages: Record<string, string> = { intro: 'cover', work: 'sprout-overview', skills: 'toolkit-product-ui', process: 'process-1', evidence: 'current-work', contact: 'contact' };
export const bookHref = (id: string) => `/#book/${id}`;
export function resolveBookHash(hash: string): string {
  if (!hash || hash === '#') return 'cover';
  const value = hash.replace(/^#/, '');
  const id = value.startsWith('book/') ? value.slice(5) : legacyPages[value];
  return bookPages.some(page => page.id === id) ? id : 'contents';
}
