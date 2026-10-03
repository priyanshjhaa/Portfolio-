import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/site/Navigation';
import Footer from '@/components/site/Footer';
import RevealObserver from '@/components/site/RevealObserver';
import CursorFollower from '@/components/fun/CursorFollower';
import PacketBurst from '@/components/fun/PacketBurst';
import Companion from '@/components/fun/Companion';
import CaseStudy from '@/components/project/CaseStudy';
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

export async function generateMetadata({ params }: SystemPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((entry) => entry.id === id);
  if (!project) return {};
  return {
    title: `${project.name} — case study | Priyansh Jha`,
    description: project.summary,
  };
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { id } = await params;
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main id="main">
        <CaseStudy project={project} />
      </main>
      <Footer />
      <RevealObserver />
      <CursorFollower />
      <PacketBurst />
      <Companion />
    </>
  );
}
