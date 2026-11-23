import { heroContent, projects } from '@/lib/data';
import { shareCard } from '@/lib/og';
import { getProjectImageRatio } from '@/lib/project-images';

// Rendered once at build time into out/og/<slug>.png so hosts serve a real .png file.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: 'home.png' }, ...projects.map((project) => ({ slug: `${project.id}.png` }))];
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = slug.replace(/\.png$/, '');
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    return shareCard({
      eyebrow: 'whoami',
      title: 'Priyansh Jha',
      summary: heroContent.description,
      chips: ['Developer tools', 'AI workflows', 'SaaS', 'End to end'],
      portrait: '/profile/priyansh-share.jpg',
    });
  }

  return shareCard({
    eyebrow: 'case study',
    title: project.name,
    summary: project.summary ?? project.problem,
    chips: project.stack,
    image: project.image,
    imageAspect: getProjectImageRatio(project.id),
  });
}
