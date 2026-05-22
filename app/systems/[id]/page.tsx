import { notFound } from 'next/navigation';
import ProjectDeepDive from '@/components/ui/ProjectDeepDive';
import { projects } from '@/lib/data';

interface SystemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { id } = await params;
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDeepDive project={project} pageMode />;
}
