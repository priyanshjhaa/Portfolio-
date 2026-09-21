import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookSheet } from '@/components/book/BookPageContent';
import BookThemeToggle from '@/components/book/BookThemeToggle';
import { bookPages } from '@/lib/book';
import { projects } from '@/lib/data';

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() { return projects.map(project => ({ id: project.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find(item => item.id === id);
  return { title: `${project?.name ?? 'Project'} — Priyansh Jha`, description: project?.summary };
}
export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  if (!projects.some(project => project.id === id)) notFound();
  return <main className="book-reader book-reading book-case-study"><header className="book-toolbar"><a href={`/#book/${id}-overview`}>← Back to the book</a><nav aria-label="Case study controls"><a href="/#book/contents">Contents</a><BookThemeToggle /></nav></header>{bookPages.map((page, index) => page.projectId === id ? <BookSheet key={page.id} page={page} index={index} /> : null)}</main>;
}
