import { Project } from '@/types/project';
import { SkillGroup, TimelineEntry } from '@/types/skill';

export const projects: Project[] = [
  {
    id: 'codemap',
    name: 'CodeMap',
    summary: 'AI-powered codebase intelligence platform.',
    details: 'Import repositories, understand architecture, and query codebases using natural language.',
    problem: 'Engineers struggle to understand complex codebases and navigate architecture efficiently when joining projects or working with large repositories.',
    approach: 'Building an AI-powered developer tool that uses RAG and semantic search to enable natural language interaction with codebases and architecture visualization.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'LLMs'],
    status: 'active',
    githubUrl: 'https://github.com/priyanshjhaa/CodeMap',
    featured: true,
  },
  {
    id: 'execute',
    name: 'Execute',
    summary: 'AI automation engine that converts natural language into deterministic workflows.',
    details: 'Built with queue-based execution and webhook pipelines for reliable automation.',
    problem: 'Users need to automate workflows without writing code or dealing with complex automation tools.',
    approach: 'Building an execution engine that converts natural language into deterministic, runnable workflows with proper observability.',
    stack: ['Next.js', 'Node.js', 'Supabase', 'LLM APIs', 'Queues', 'Webhooks'],
    status: 'maintenance',
    githubUrl: 'https://github.com/priyanshjhaa/Execute',
    liveUrl: 'https://execute-web-i7u4.vercel.app',
  },
  {
    id: 'axiom',
    name: 'Axiom',
    summary: 'Freelancer management SaaS platform.',
    details: 'Designed structured workflows for proposals, projects, and invoicing with scalable APIs.',
    problem: 'Freelancers struggle with proposal generation, invoicing, and client document management across multiple tools.',
    approach: 'Built a system-first platform with reliable data flow between proposals, projects, and invoices.',
    stack: ['Next.js', 'Prisma', 'Supabase', 'React'],
    status: 'maintenance',
    githubUrl: 'https://github.com/priyanshjhaa/Axiom',
    liveUrl: 'https://axiom-nu-six.vercel.app',
  },
  {
    id: 'cinematch',
    name: 'Cinematch',
    summary: 'Content discovery platform with recommendation flows.',
    details: 'Focused on API-driven architecture and seamless user experience.',
    problem: 'Users struggle to discover movies and track favorites across streaming platforms.',
    approach: 'Content-heavy API-driven app built around real user flows—discovery, recommendations, and saving content.',
    stack: ['React', 'Firebase', 'TMDB API', 'YouTube'],
    status: 'archived',
    githubUrl: 'https://github.com/priyanshjhaa/Cinematch25',
    liveUrl: 'https://cinematch25.vercel.app',
  },
];

export const about = {
  name: 'Priyansh',
  title: 'Full Stack Developer',
  bio: 'I build execution-focused products, backend systems, and developer tooling designed for real-world use. The goal is simple: ship systems that solve meaningful problems and keep getting stronger over time.',
};

export const heroContent = {
  eyebrow: 'Selected Builder',
  title: 'I build AI-powered developer tools and scalable SaaS products.',
  description:
    'Focused on backend systems, automation workflows, and clean, production-ready architecture.',
  cta: 'View Projects',
  secondaryCta: 'GitHub',
};

export const currentBuild = {
  eyebrow: 'Currently Building',
  title: 'CodeMap',
  description:
    'AI-powered platform to understand and navigate codebases using embeddings and system-level analysis.',
};

export const howIBuild = [
  'I design systems before writing code',
  'I focus on reliability and clean architecture',
  'I ship fast and iterate based on feedback',
  'I prefer building real products over demos',
];

export const sectionCopy = {
  projects: {
    eyebrow: 'Builds',
    title: 'Current Work',
    description:
      'Selected projects with a bias toward execution, systems thinking, and products that solve real workflow problems.',
    focusTitle: 'Focus Area',
    focusValue: 'Automation',
    focusDescription: 'Developer tools, AI systems, and execution-first products.',
    philosophyTitle: 'Build Philosophy',
    philosophyText:
      'I care more about systems getting stronger over time than shipping something that only looks finished.',
    completedLabel: 'Completed Systems',
  },
  about: {
    eyebrow: 'Profile',
    title: 'Stats',
    description:
      'A quick snapshot of how I operate: full-stack engineering, execution mindset, and systems built to keep improving.',
    territoryTitle: 'Territory',
    territoryValue: 'Full-stack systems with real execution',
    bioTitle: 'Bio',
    bioHeading: 'Built To Run',
    modeTitle: 'Current Mode',
    modeValue: 'Shipping',
    approachTitle: 'Approach',
    approachText: 'Favor systems that can survive iteration, not just ship screenshots.',
    signalTitle: 'Signal',
    signalText: 'Real workflows, clear constraints, and stronger execution loops.',
    footerText: 'Built to run, not reset.',
  },
  timeline: {
    eyebrow: 'Mission Log',
    title: 'Career Progression',
    description:
      'A running path of education, shipped work, and the systems I have been building toward over time.',
    progressTitle: 'Mission Progress',
  },
  skills: {
    eyebrow: 'Skill Tree',
    title: 'Build Stats',
    description: 'Capabilities across frontend, backend, AI, infrastructure, and the tooling that ties them together.',
    updateTitle: 'Last Update',
    updateText: 'Actively building and strengthening the highest-leverage modules.',
    ruleTitle: 'Operating Rule',
    ruleText: 'Ship, measure, improve. Skills should support systems, not sit as decoration.',
  },
  contact: {
    eyebrow: 'Connection',
    title: 'Get in Touch',
    description:
      'If you are building something ambitious and need an execution-focused engineer, this is the fastest way to reach me.',
    availabilityTitle: 'Availability',
    availabilityValue: 'Open to work',
    linksTitle: 'Outbound Links',
    linksHeading: 'Command Center',
    linksStatus: 'Live',
  },
};

export const buildLogs = [
  {
    id: 'build-01',
    label: '[BUILD 01]',
    name: 'CodeMap',
    detail: 'AI-powered codebase understanding tool with semantic search and architecture visualization.',
  },
  {
    id: 'build-02',
    label: '[BUILD 02]',
    name: 'Execute',
    detail: 'AI automation engine for turning natural language into deterministic workflows.',
  },
  {
    id: 'build-03',
    label: '[BUILD 03]',
    name: 'Axiom',
    detail: 'Freelancer platform covering proposals, projects, and invoicing in one system.',
  },
  {
    id: 'build-04',
    label: '[BUILD 04]',
    name: 'Cinematch',
    detail: 'Content discovery app built around saving, recommendations, and streaming flows.',
  },
];

export const contact = {
  github: 'https://github.com/priyanshjhaa',
  linkedin: 'https://www.linkedin.com/in/priyansh-jha-489966284',
  email: 'Priyanshjhaa17@gmail.com',
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    description: 'UI & Experience Architecture',
    skills: [
      { id: 'react', name: 'React / Next.js', level: 85, category: 'Frontend' },
      { id: 'ts', name: 'TypeScript', level: 80, category: 'Frontend' },
      { id: 'tailwind', name: 'Tailwind CSS', level: 90, category: 'Frontend' },
    ],
  },
  {
    category: 'Backend',
    description: 'Server & API Development',
    skills: [
      { id: 'node', name: 'Node.js', level: 82, category: 'Backend' },
      { id: 'express', name: 'Express.js', level: 78, category: 'Backend' },
      { id: 'python', name: 'Python', level: 75, category: 'Backend' },
    ],
  },
  {
    category: 'AI / LLMs',
    description: 'Language Model Integration',
    skills: [
      { id: 'llm', name: 'LLM APIs', level: 72, category: 'AI / LLMs' },
      { id: 'langchain', name: 'LangChain', level: 65, category: 'AI / LLMs' },
      { id: 'prompt', name: 'Prompt Engineering', level: 85, category: 'AI / LLMs' },
    ],
  },
  {
    category: 'Database',
    description: 'Data Persistence',
    skills: [
      { id: 'sql', name: 'PostgreSQL', level: 70, category: 'Database' },
      { id: 'supabase', name: 'Supabase', level: 80, category: 'Database' },
      { id: 'prisma', name: 'Prisma ORM', level: 75, category: 'Database' },
    ],
  },
  {
    category: 'DevOps',
    description: 'Deployment & Infrastructure',
    skills: [
      { id: 'docker', name: 'Docker', level: 65, category: 'DevOps' },
      { id: 'vercel', name: 'Vercel', level: 88, category: 'DevOps' },
      { id: 'git', name: 'Git / GitHub', level: 85, category: 'DevOps' },
    ],
  },
  {
    category: 'Tools',
    description: 'Development Environment',
    skills: [
      { id: 'vscode', name: 'VS Code', level: 95, category: 'Tools' },
      { id: 'postman', name: 'Postman', level: 82, category: 'Tools' },
      { id: 'linux', name: 'Linux / CLI', level: 70, category: 'Tools' },
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    id: 'edu-cs',
    type: 'education',
    title: 'B.Tech in Computer Science Engineering',
    organization: 'University',
    description: 'Specializing in software engineering, algorithms, and distributed systems. Building real-world projects alongside coursework.',
    period: '2023 - Present',
    completed: true,
    icon: 'GraduationCap',
  },
  {
    id: 'edu-foundations',
    type: 'education',
    title: 'Programming Basics',
    organization: 'Self-Taught',
    description: 'Started the journey with programming fundamentals, web development basics, and a focus on building things from scratch.',
    period: '2024',
    completed: true,
    icon: 'GraduationCap',
  },
  {
    id: 'milestone-cinematch',
    type: 'project',
    title: 'Cinematch - Content Discovery',
    organization: 'Side Project',
    description: 'Content-heavy API-driven app built around real user flows—discovery, recommendations, and saving content.',
    period: '2025',
    completed: true,
    icon: 'Code',
  },
  {
    id: 'work-freelance',
    type: 'work',
    title: 'Full Stack Developer',
    organization: 'Freelance',
    description: 'Building production applications for clients across various domains. Focused on full-stack development with modern frameworks.',
    period: '2025 - Present',
    completed: true,
    icon: 'Briefcase',
  },
  {
    id: 'milestone-axiom',
    type: 'project',
    title: 'Axiom - Freelancer Platform',
    organization: 'SaaS Project',
    description: 'Built a comprehensive freelancer management system with proposals, project tracking, and invoicing.',
    period: '2026',
    completed: true,
    icon: 'Code',
  },
  {
    id: 'milestone-execute',
    type: 'milestone',
    title: 'Execute - AI Automation Engine',
    organization: 'Personal Project',
    description: 'Building an execution engine that converts natural language into deterministic, runnable workflows with proper observability.',
    period: '2026',
    completed: true,
    icon: 'Rocket',
  },
  {
    id: 'milestone-codemap',
    type: 'milestone',
    title: 'CodeMap - AI Codebase Navigator',
    organization: 'Developer Tool',
    description: 'Building an AI-powered developer tool that helps engineers understand and navigate complex codebases using semantic search and natural language.',
    period: '2026',
    completed: true,
    icon: 'Rocket',
  },
];
