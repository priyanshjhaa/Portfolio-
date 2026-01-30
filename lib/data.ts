import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'execute',
    name: 'Execute',
    problem: 'Users need to automate workflows without writing code or dealing with complex automation tools.',
    approach: 'Building an execution engine that converts natural language into deterministic, runnable workflows with proper observability.',
    stack: ['Next.js', 'Node.js', 'Supabase', 'LLM APIs', 'Queues', 'Webhooks'],
    status: 'active',
    githubUrl: 'https://github.com/priyansh',
    featured: true,
  },
  {
    id: 'axiom',
    name: 'Axiom',
    problem: 'Freelancers struggle with proposal generation, invoicing, and client document management across multiple tools.',
    approach: 'Built a system-first platform with reliable data flow between proposals, projects, and invoices.',
    stack: ['Next.js', 'Prisma', 'Supabase', 'React'],
    status: 'maintenance',
    githubUrl: 'https://github.com/priyansh',
  },
  {
    id: 'cinematch',
    name: 'Cinematch',
    problem: 'Users struggle to discover movies and track favorites across streaming platforms.',
    approach: 'Content-heavy API-driven app built around real user flows—discovery, recommendations, and saving content.',
    stack: ['React', 'Firebase', 'TMDB API', 'YouTube'],
    status: 'archived',
    githubUrl: 'https://github.com/priyansh',
  },
];

export const about = {
  name: 'Priyansh',
  title: 'Full Stack Developer',
  bio: "I build tools that work. CS student focused on execution-driven projects, not demo apps. Shipping real systems that solve real problems.",
};

export const contact = {
  github: 'https://github.com/priyanshjhaa',
  linkedin: 'https://www.linkedin.com/in/priyansh-jha-489966284',
  email: 'Priyanshjhaa17@gmail.com',
};
