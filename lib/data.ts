import { Project } from '@/types/project';
import { SkillGroup, TimelineEntry } from '@/types/skill';

export const projects: Project[] = [
  {
    id: 'codemap',
    name: 'CodeMap',
    summary: 'Import repositories, visualize architecture, and query large codebases with context-aware retrieval.',
    details: 'Built around repository ingestion, structured indexing, and retrieval workflows that help developers understand unfamiliar systems faster.',
    impact: 'Turns large repositories into explorable system maps for faster onboarding and architecture understanding.',
    whyBuiltThis:
      'Understanding large unfamiliar codebases still takes developers days or weeks, even when the information already exists inside the repo.',
    proofTitle: 'Product proof',
    proofPoints: [
      'Repository import surface for bringing in unfamiliar codebases',
      'Architecture graph layer for mapping system relationships',
      'Grounded query interface for code-aware retrieval',
    ],
    ownership: ['Product direction and UX', 'Repository ingestion and retrieval', 'Architecture visualization'],
    keyDecision:
      'Create a structured repository context layer before enabling search so answers can stay grounded in the actual codebase.',
    tradeoff:
      'Indexing repositories upfront adds processing time, but it produces more reliable queries and more useful architecture views.',
    nextStep:
      'Harden the import pipeline and improve retrieval evaluation across larger, less familiar repositories.',
    problem: 'Engineers struggle to understand complex codebases and navigate architecture efficiently when joining projects or working with large repositories.',
    approach: 'Built repository import, indexing, and retrieval layers so developers can inspect architecture and query codebases through grounded context rather than guesswork.',
    architectureNotes: [
      'Repository ingestion creates a structured context layer before search ever runs.',
      'Semantic indexing and retrieval keep answers grounded in the actual codebase.',
      'System views are designed to explain architecture, not just return snippets.',
    ],
    highlightMetrics: ['Featured build', 'Repo import pipeline', 'Context-aware retrieval'],
    flowSteps: ['Repo Import', 'Context Index', 'Architecture Graph', 'Code Query'],
    productionSignals: ['Deployed on Vercel', 'PostgreSQL-backed indexing', 'Repository import pipeline'],
    proofFrame: {
      eyebrow: 'Product Frame',
      title: 'Repository import and architecture query surface',
      rails: ['Repository Input', 'Architecture Map', 'Query Response'],
      callout: 'Designed to help developers understand unfamiliar systems quickly.',
    },
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'LLMs'],
    status: 'active',
    githubUrl: 'https://github.com/priyanshjhaa/CodeMap',
    liveUrl: 'https://code-map-web-sigma.vercel.app',
    image: '/projects/codemap/landing.png',
    featured: true,
  },
  {
    id: 'execute',
    name: 'Execute',
    summary: 'Built deterministic workflow execution pipelines using BullMQ, Redis, and structured action validation.',
    details: 'Converts natural-language intent into validated execution steps backed by queues, observability, and webhook-driven actions.',
    impact: 'Moves automation from fragile prompt flows into reliable, observable execution paths.',
    whyBuiltThis:
      'Most automation tools felt unreliable because they depended too heavily on raw LLM output instead of deterministic execution layers.',
    proofTitle: 'Execution proof',
    proofPoints: [
      'Prompt-to-validation surface for safer workflow creation',
      'Queue-backed execution path for reliable orchestration',
      'Webhook-driven action layer for observable downstream effects',
    ],
    ownership: ['Product and workflow UX', 'Validation and execution engine', 'Integrations and runtime visibility'],
    keyDecision:
      'Treat model output as an untrusted proposal and validate every action before it reaches the execution queue.',
    tradeoff:
      'A deterministic action schema limits completely open-ended workflows, but makes execution safer, observable, and easier to debug.',
    nextStep:
      'Improve retry behavior, execution traces, and the feedback loop between failed runs and workflow editing.',
    problem: 'Users need to automate workflows without writing code or dealing with complex automation tools.',
    approach: 'Built a workflow engine that validates actions before execution, coordinates async jobs through queues, and keeps integrations observable at runtime.',
    architectureNotes: [
      'Natural language is translated into structured, auditable workflow steps.',
      'Queue-backed execution keeps runs reliable under async and multi-step workloads.',
      'Webhook pipelines make integrations composable without exposing complexity to the user.',
    ],
    highlightMetrics: ['3 live apps', 'BullMQ + Redis', 'Structured validation'],
    flowSteps: ['Prompt', 'Validation', 'Queue', 'Executor', 'Webhook'],
    productionSignals: ['Redis-backed execution engine', 'Supabase PostgreSQL', 'Real-time execution tracking'],
    proofFrame: {
      eyebrow: 'Product Frame',
      title: 'Deterministic workflow execution surface',
      rails: ['Intent Input', 'Validated Flow', 'Execution Tracking'],
      callout: 'Built to make automation reliable rather than prompt-fragile.',
    },
    stack: ['Next.js', 'Node.js', 'Supabase', 'BullMQ', 'Redis', 'Webhooks'],
    status: 'maintenance',
    githubUrl: 'https://github.com/priyanshjhaa/Execute',
    liveUrl: 'https://execute-web-i7u4.vercel.app',
    image: '/projects/execute/landing.png',
  },
  {
    id: 'axiom',
    name: 'Axiom',
    summary: 'Freelancer management SaaS platform.',
    details: 'Designed structured workflows for proposals, projects, and invoicing with scalable APIs.',
    impact: 'Unifies fragmented freelancer workflows into a single operational system.',
    whyBuiltThis:
      'Freelancer operations usually live across disconnected tools, which makes handoffs between proposals, projects, and billing unnecessarily messy.',
    proofTitle: 'Operations proof',
    proofPoints: [
      'Proposal-to-project handoff flow',
      'Operational visibility across delivery stages',
      'Billing and invoicing tied to project execution',
    ],
    ownership: ['Product workflows and interface', 'Shared operational data model', 'API and deployment'],
    keyDecision:
      'Model proposals, projects, and invoices as connected stages of one workflow instead of isolated product features.',
    tradeoff:
      'A shared operational model requires stricter state transitions, but removes duplicate data and makes handoffs predictable.',
    nextStep:
      'Tighten the project-to-invoice workflow and add clearer operational reporting for active client work.',
    problem: 'Freelancers struggle with proposal generation, invoicing, and client document management across multiple tools.',
    approach: 'Built a system-first platform with reliable data flow between proposals, projects, and invoices.',
    architectureNotes: [
      'Proposal, project, and invoice flows share one structured data model.',
      'APIs were designed around predictable handoffs between core operational states.',
      'The product favors repeatable workflow clarity over one-off feature sprawl.',
    ],
    highlightMetrics: ['SaaS workflow system', 'Structured operations', 'Iterating in production'],
    flowSteps: ['Lead', 'Proposal', 'Project', 'Invoice'],
    productionSignals: ['Deployed on Vercel', 'Supabase PostgreSQL', 'Scalable API workflows'],
    proofFrame: {
      eyebrow: 'Product Frame',
      title: 'Freelancer operations control surface',
      rails: ['Lead Capture', 'Project Tracking', 'Invoice Actions'],
      callout: 'Structured to reduce operational context-switching.',
    },
    stack: ['Next.js', 'Prisma', 'Supabase', 'React'],
    status: 'maintenance',
    githubUrl: 'https://github.com/priyanshjhaa/Axiom',
    liveUrl: 'https://axiom-nu-six.vercel.app',
    image: '/projects/axiom/landing.png',
  },
  {
    id: 'cinematch',
    name: 'Cinematch',
    summary: 'Content discovery platform with recommendation flows.',
    details: 'Focused on API-driven architecture and seamless user experience.',
    impact: 'Makes discovery, saving, and recommendation flows feel coherent across content-heavy UI.',
    whyBuiltThis:
      'Movie discovery apps often feel like disconnected lists instead of a guided experience that helps users search, compare, and save content naturally.',
    proofTitle: 'Discovery proof',
    proofPoints: [
      'Search-first discovery flow',
      'Recommendation and save interactions',
      'API-driven content rendering across the viewing journey',
    ],
    ownership: ['Discovery experience and UI', 'External API integration', 'Authentication and saved content'],
    keyDecision:
      'Organize discovery around search, mood, and saved picks rather than exposing another large undifferentiated content catalog.',
    tradeoff:
      'Relying on third-party content APIs accelerated delivery, while limiting control over metadata quality and availability.',
    nextStep:
      'If revisited, improve recommendation quality with stronger preference signals and a more deliberate onboarding flow.',
    problem: 'Users struggle to discover movies and track favorites across streaming platforms.',
    approach: 'Content-heavy API-driven app built around real user flows—discovery, recommendations, and saving content.',
    architectureNotes: [
      'Recommendation and discovery paths are organized around user intent, not just content lists.',
      'API-driven rendering keeps content modules flexible and reusable.',
      'The experience prioritizes quick exploration, save flows, and low-friction browsing.',
    ],
    highlightMetrics: ['API-driven UX', 'Recommendation flow', 'Content discovery'],
    flowSteps: ['Search', 'Match', 'Save', 'Watch'],
    productionSignals: ['TMDB API integration', 'Firebase-backed persistence', 'Deployed UI flows'],
    proofFrame: {
      eyebrow: 'Product Frame',
      title: 'Discovery and recommendation browsing surface',
      rails: ['Search Flow', 'Match Results', 'Saved Picks'],
      callout: 'Built around user flow clarity instead of content overload.',
    },
    stack: ['React', 'Firebase', 'TMDB API', 'YouTube'],
    status: 'archived',
    githubUrl: 'https://github.com/priyanshjhaa/Cinematch25',
    liveUrl: 'https://cinematch25.vercel.app',
    image: '/projects/cinematch/landing.png',
  },
];

export const about = {
  name: 'Priyansh',
  title: 'Full Stack Developer',
  bio: 'I build execution-focused products, backend systems, and developer tooling designed for real-world use. The goal is simple: ship systems that solve meaningful problems and keep getting stronger over time.',
};

export const heroContent = {
  eyebrow: 'Full-stack product engineer',
  title: 'I turn ambitious product ideas into reliable, usable software.',
  description:
    'I design and ship developer tools, workflow systems, and SaaS products end to end, from the interface to the execution engine behind it.',
  cta: 'See My Work',
  secondaryCta: 'GitHub',
  hiringValues: ['Product engineering', 'Backend systems', 'Developer tools', '0→1 shipping'],
  hiringNote:
    'Currently open to remote product engineering roles.',
};

export const currentBuild = {
  eyebrow: 'Currently Shipping',
  title: 'Active Engineering Focus',
  description:
    'Shipping work that improves reliability, developer experience, and system transparency across the current product set.',
  items: [
    'Building repository import pipelines for CodeMap',
    'Improving workflow orchestration reliability in Execute',
    'Exploring retrieval systems for developer tooling',
    'Experimenting with architecture visualization systems',
  ],
};

export const howIBuild = [
  'Start with the user problem, then design the smallest system that solves it well.',
  'Keep critical workflows deterministic, observable, and easy to reason about.',
  'Own the full product surface, from interface details to backend execution.',
  'Ship early, learn from real usage, and improve the architecture with intent.',
];

export const leverageAreas = [
  {
    title: 'Own a product slice end to end',
    description:
      'Turn a loosely defined problem into a usable interface, a clear data model, working backend flows, and a deployed release.',
    evidence: 'Execute, Axiom',
  },
  {
    title: 'Make complex systems understandable',
    description:
      'Design developer-facing workflows, architecture views, and feedback loops that expose what the system is doing.',
    evidence: 'CodeMap, Execute',
  },
  {
    title: 'Build reliability into the workflow',
    description:
      'Use validation, queues, observable execution, and deliberate state transitions where product trust depends on correctness.',
    evidence: 'Execute, CodeMap',
  },
];

export const receipts = [
  'Built monorepo architecture with isolated execution, validation, and LLM packages',
  'Implemented async workflow orchestration using BullMQ and Redis',
  'Added structured validation layer before workflow execution',
  'Built semantic repository indexing pipeline for CodeMap',
  'Integrated GitHub repository imports and embedding-based retrieval',
];

export const recentBuilds = [
  {
    period: 'May 2026',
    items: [
      'Added repository import pipeline to CodeMap',
      'Improved selected work deep-dive and architecture surfaces',
    ],
  },
  {
    period: 'April 2026',
    items: [
      'Refactored Execute execution engine around deterministic orchestration',
      'Strengthened async validation and queue-backed workflow handling',
    ],
  },
  {
    period: 'March 2026',
    items: [
      'Built async validation pipeline experiments for Execute',
      'Started architecture visualization and retrieval exploration for CodeMap',
    ],
  },
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
  x: 'https://x.com/PriyaanshhJhaa',
  email: 'Priyanshjhaa17@gmail.com',
  availability: 'Open to remote startup roles',
  focus: 'I am most useful on product engineering, developer tools, workflow systems, and full-stack work that needs clear ownership.',
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
