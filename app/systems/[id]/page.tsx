import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/site/Navigation';
import Footer from '@/components/site/Footer';
import RevealObserver from '@/components/site/RevealObserver';
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
  const title = `${project.name} — case study | Priyansh Jha`;
  const image = { url: `/og/${project.id}.png`, width: 1200, height: 630, alt: `${project.name} case study by Priyansh Jha` };
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/systems/${project.id}/` },
    openGraph: { title, description: project.summary, type: 'article', siteName: 'Priyansh Jha', images: [image] },
    twitter: { card: 'summary_large_image', title, description: project.summary, creator: '@PriyaanshhJhaa', images: [image.url] },
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
      <PacketBurst />
      <Companion />
    </>
  );
}
