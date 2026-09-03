import { Project } from '@/types/project';
import { SkillGroup, TimelineEntry } from '@/types/skill';
import type { BuildStage, Capability, ProjectVisual, RunnerChapterId, RunnerScene } from '@/types/experience';

export const projects: Project[] = [
  {
    id: 'atlas',
    name: 'Atlas',
    summary: 'Source-backed engineering intelligence for understanding every software change before it ships.',
    details: 'Connects GitHub code, pull-request history, reviews, and Notion decisions in a living engineering graph, then turns planned changes into persisted impact reports with cited evidence.',
    impact: 'Gives engineers one trace from a proposed change to affected symbols, cross-repository paths, prior decisions, unknowns, and a concrete verification plan.',
    whyBuiltThis:
      'The evidence needed to evaluate a software change is usually fragmented across source code, pull requests, reviews, architecture, and documentation. Teams can see the diff, but not the whole system around it.',
    proofTitle: 'Implemented system proof',
    proofPoints: [
      'GitHub App ingestion for repositories, commits, pull requests, reviews, actors, and bounded history',
      'Notion OAuth, resource selection, document revisions, editor provenance, and incremental synchronization',
      'Planned-change and pull-request analysis backed by a cross-repository graph and persisted citations',
    ],
    ownership: ['Product direction and end-to-end interaction design', 'Connector, graph, analysis, and worker architecture', 'Evidence safety, operational controls, and release validation'],
    keyDecision:
      'Make every impact conclusion traceable to persisted source evidence, while keeping GitHub identity separate from narrowly scoped GitHub App repository access.',
    tradeoff:
      'Separating the API, synchronization worker, and repository checkout volume adds operational complexity, but keeps heavy ingestion away from request latency and makes retries, limits, and failures observable.',
    nextStep:
      'Provision production PostgreSQL, Redis, connector credentials, and callbacks, then complete staging analysis, backup-and-restore, rollback, and release acceptance against real workspace sources.',
    problem: 'A change can affect code, dependencies, reviewers, and decisions far beyond the visible diff, while the context needed to assess that impact lives across disconnected engineering systems.',
    approach: 'Built synchronized GitHub and Notion pipelines that normalize source history into a shared engineering graph, retrieve bounded evidence for a proposed change, and persist a cited report with risk, unknowns, recommendations, and verification steps.',
    architectureNotes: [
      'A Next.js application handles the marketing and authenticated workspace while a NestJS API owns connector, graph, analysis, and operations boundaries.',
      'BullMQ workers process GitHub and Notion synchronization through Redis; PostgreSQL with pgvector stores workspace data, indexed intelligence, provenance, and reports.',
      'Better Auth handles GitHub identity separately from GitHub App repository authorization, keeping connector access explicit and least-privileged.',
    ],
    highlightMetrics: ['GitHub + Notion sync', 'Cross-repository graph', 'Persisted cited reports'],
    flowSteps: ['Proposed Change', 'Source Sync', 'Evidence Graph', 'Impact Report', 'Verification Plan'],
    architectureStages: [
      {
        label: 'Proposed Change',
        description: 'An engineer submits a planned change or selects a synchronized pull request as the analysis scope.',
        safeguard: 'Anchors every report to explicit intent and repository context instead of an open-ended model prompt.',
      },
      {
        label: 'Source Sync',
        description: 'GitHub App and Notion connectors incrementally ingest authorized code, history, reviews, documents, revisions, and people provenance.',
        safeguard: 'Separates identity from source authorization and limits ingestion to explicitly selected resources.',
      },
      {
        label: 'Evidence Graph',
        description: 'Code symbols, dependencies, architecture, pull-request activity, and Notion decisions are connected across repositories.',
        safeguard: 'Preserves stable source references and exposes indirect paths that a file-level diff would miss.',
      },
      {
        label: 'Impact Report',
        description: 'Bounded retrieval and guarded LLM explanation produce a persisted report with claims, citations, risk, and unknowns.',
        safeguard: 'Filters prompt injection, bounds context and provider timeouts, and rejects conclusions without citable evidence.',
      },
      {
        label: 'Verification Plan',
        description: 'The report identifies affected areas, relevant reviewers and decisions, and the checks required before release.',
        safeguard: 'Turns analysis into a reviewable engineering action plan rather than an opaque risk score.',
      },
    ],
    productionSignals: ['Independent web, API, worker, and migration release images', 'PostgreSQL/pgvector with Redis-backed queues and distributed limits', 'Container acceptance covers migrations, readiness, backup/restore, and shutdown'],
    proofFrame: {
      eyebrow: 'Source-backed Product',
      title: 'GitHub and Notion intelligence for change impact',
      rails: ['Synchronized Sources', 'Living System Graph', 'Cited Impact Report'],
      callout: 'Built to make every consequence, unknown, and recommendation inspectable before a change ships.',
    },
    stack: ['Next.js', 'NestJS', 'PostgreSQL + pgvector', 'Redis + BullMQ', 'Better Auth', 'GitHub App', 'Notion API', 'Groq'],
    status: 'active',
    githubUrl: 'https://github.com/priyanshjhaa/Atlas',
    image: '/projects/atlas/landing.jpg',
    featured: true,
  },
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
    architectureStages: [
      {
        label: 'Repo Import',
        description: 'A repository is ingested with its source tree, metadata, and structural relationships intact.',
        safeguard: 'Preserves repository boundaries before any semantic processing begins.',
      },
      {
        label: 'Context Index',
        description: 'Code and metadata are transformed into searchable context designed for grounded retrieval.',
        safeguard: 'Reduces unsupported answers by retrieving from the indexed codebase.',
      },
      {
        label: 'Architecture Graph',
        description: 'Modules and dependencies are organized into a navigable representation of the system.',
        safeguard: 'Exposes relationships that isolated code snippets would hide.',
      },
      {
        label: 'Code Query',
        description: 'Natural-language questions retrieve relevant code context and architecture evidence together.',
        safeguard: 'Keeps responses connected to source evidence rather than generic explanations.',
      },
    ],
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
    image: '/projects/codemap/landing.jpg',
  },
  {
    id: 'execute',
    name: 'Execute',
    summary: 'An approval-gated agent for creating, inspecting, and operating deterministic business workflows.',
    details: 'Turns natural-language requests into validated proposals, requires explicit approval before mutations, and reuses a strict workflow executor for observable actions.',
    impact: 'Combines conversational product UX with tenant-safe execution, operational controls, and a clear human decision boundary.',
    whyBuiltThis:
      'Most automation agents make it difficult to know what the model inspected, what it intends to change, and whether a mutation can be executed safely for the correct workspace.',
    proofTitle: 'Agent execution proof',
    proofPoints: [
      'Tenant-scoped tools for workflows, executions, forms, contacts, and integrations',
      'Persisted create, update, run, retry, cancel, and disconnect proposals with explicit approval',
      'Failure monitor with deterministic classification, redacted evidence, and guided repair actions',
    ],
    ownership: ['Agent product and interaction design', 'Proposal, approval, and execution architecture', 'Tenant isolation, safety controls, and operational visibility'],
    keyDecision:
      'Keep model reasoning separate from mutation authority: every write becomes a persisted, validated proposal that the user must approve before deterministic code executes it.',
    tradeoff:
      'Approval gates add one deliberate step to agent actions, but make mutations inspectable, idempotent, tenant-safe, and much easier to trust.',
    nextStep:
      'Use internal-release telemetry and failure findings to tighten tool selection, proposal quality, and guided recovery before general availability.',
    problem: 'Users need a faster way to create and operate automations without giving an AI agent unchecked access to workflows, integrations, or execution state.',
    approach: 'Built a bounded agent tool loop that inspects tenant-scoped state, converts requested mutations into expiring proposals, validates them, and executes only after explicit approval.',
    architectureNotes: [
      'Bounded tool rounds, result-size limits, prompt-injection defenses, and provider fallback control the agent runtime.',
      'Persisted proposals use validation, expiry, idempotent decisions, and stale-state protection before execution.',
      'Failure findings are tenant-scoped, deduplicated by execution, classified deterministically, and stored with credential-redacted evidence.',
    ],
    highlightMetrics: ['Approval-gated actions', 'Tenant-safe tools', 'Failure monitoring'],
    flowSteps: ['Request', 'Scoped Inspection', 'Validated Proposal', 'Approval', 'Execution'],
    architectureStages: [
      {
        label: 'Request',
        description: 'The user describes an operational intent through the agent interface.',
        safeguard: 'Treats language as intent, not immediate authority to mutate workspace state.',
      },
      {
        label: 'Scoped Inspection',
        description: 'Tenant-safe tools inspect only the workflows, integrations, and execution state available to the active workspace.',
        safeguard: 'Prevents cross-tenant access and limits the context exposed to the model.',
      },
      {
        label: 'Validated Proposal',
        description: 'The requested mutation becomes a persisted, expiring proposal with structured arguments and stale-state checks.',
        safeguard: 'Separates model reasoning from deterministic mutation authority.',
      },
      {
        label: 'Approval',
        description: 'The user reviews the exact action and explicitly approves or rejects it.',
        safeguard: 'Maintains a clear human decision boundary for every consequential write.',
      },
      {
        label: 'Execution',
        description: 'Deterministic application code performs the approved action and records its operational result.',
        safeguard: 'Provides idempotency, observability, and recoverable failure handling.',
      },
    ],
    productionSignals: ['Internal-release feature controls', 'Per-call token and latency tracking', 'Atomic daily usage limits'],
    proofFrame: {
      eyebrow: 'Product Frame',
      title: 'Approval-gated agent operations surface',
      rails: ['Tenant Context', 'Action Proposal', 'Approved Execution'],
      callout: 'Built so conversational speed never bypasses deterministic safety.',
    },
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Drizzle', 'Groq', 'Resend'],
    status: 'active',
    githubUrl: 'https://github.com/priyanshjhaa/Execute',
    liveUrl: 'https://execute-web-i7u4.vercel.app',
    image: '/projects/execute/landing.jpg',
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
    architectureStages: [
      {
        label: 'Lead',
        description: 'Client context begins as a structured opportunity rather than an isolated document.',
        safeguard: 'Avoids duplicating client data across disconnected tools.',
      },
      {
        label: 'Proposal',
        description: 'Project scope and commercial terms are generated from the same operational record.',
        safeguard: 'Keeps agreed scope connected to the work that follows.',
      },
      {
        label: 'Project',
        description: 'An accepted proposal transitions into an active delivery workspace with shared state.',
        safeguard: 'Makes the handoff explicit and prevents drift between proposal and execution.',
      },
      {
        label: 'Invoice',
        description: 'Billing actions remain attached to the project and its delivery context.',
        safeguard: 'Preserves traceability from initial scope through payment.',
      },
    ],
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
    image: '/projects/axiom/landing.jpg',
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
    architectureStages: [
      {
        label: 'Search',
        description: 'The discovery surface translates a title, genre, or mood into a focused content request.',
        safeguard: 'Keeps browsing anchored to user intent instead of an endless catalog.',
      },
      {
        label: 'Match',
        description: 'External content metadata is shaped into comparable recommendation results.',
        safeguard: 'Normalizes third-party responses before they reach the interface.',
      },
      {
        label: 'Save',
        description: 'Authenticated users persist promising titles into their personal collection.',
        safeguard: 'Maintains continuity between discovery sessions.',
      },
      {
        label: 'Watch',
        description: 'The selected title connects to trailers and available viewing context.',
        safeguard: 'Completes the journey without losing the decision context that led there.',
      },
    ],
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
    image: '/projects/cinematch/landing.jpg',
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

export const heroRoles = [
  'product engineer',
  'system designer',
  'workflow architect',
  '0→1 builder',
];

export const runnerScenes: RunnerScene[] = [
  {
    id: 'intro',
    eyebrow: 'RUN / 00 — identity online',
    checkpoint: 'hello-world',
    obstacles: [
      { kind: 'bug', label: 'ambiguity' },
      { kind: 'api', label: 'systems' },
      { kind: 'tool', label: 'craft' },
    ],
  },
  {
    id: 'skills',
    eyebrow: 'RUN / 01 — toolchain',
    checkpoint: 'capabilities',
    obstacles: [
      { kind: 'tool', label: 'interface' },
      { kind: 'api', label: 'backend' },
      { kind: 'queue', label: 'data + ai' },
    ],
  },
  {
    id: 'process',
    eyebrow: 'RUN / 02 — build loop',
    checkpoint: 'operation',
    obstacles: [
      { kind: 'bug', label: 'unknowns' },
      { kind: 'queue', label: 'workflow' },
      { kind: 'deploy', label: 'release' },
    ],
  },
  {
    id: 'work',
    eyebrow: 'RUN / 03 — shipped systems',
    checkpoint: 'production',
    obstacles: [
      { kind: 'api', label: 'atlas' },
      { kind: 'tool', label: 'execute' },
      { kind: 'queue', label: 'codemap' },
    ],
  },
  {
    id: 'evidence',
    eyebrow: 'RUN / 04 — proof trail',
    checkpoint: 'receipts',
    obstacles: [
      { kind: 'bug', label: 'failure' },
      { kind: 'deploy', label: 'shipping' },
      { kind: 'tool', label: 'iteration' },
    ],
  },
  {
    id: 'contact',
    eyebrow: 'RUN / 05 — connection ready',
    checkpoint: 'next-build',
    obstacles: [
      { kind: 'api', label: 'connect' },
      { kind: 'deploy', label: 'start' },
    ],
  },
];

export const runnerSceneById = Object.fromEntries(
  runnerScenes.map((scene) => [scene.id, scene])
) as Record<RunnerChapterId, RunnerScene>;

export const capabilities: Capability[] = [
  {
    id: 'product-ui',
    label: 'Product UI',
    shortLabel: 'Interface',
    description: 'I turn complex system behavior into interfaces people can understand, trust, and operate.',
    skills: ['React', 'Next.js', 'TypeScript', 'Interaction design'],
    projectIds: ['atlas', 'execute', 'axiom'],
    accent: '#f0a6ca',
    coordinate: { x: 20, y: 24 },
  },
  {
    id: 'backend-systems',
    label: 'Backend Systems',
    shortLabel: 'Execution',
    description: 'I design APIs, state transitions, queues, and execution paths that stay observable under real use.',
    skills: ['Node.js', 'API design', 'Queues', 'Deterministic workflows'],
    projectIds: ['execute', 'atlas', 'codemap'],
    accent: '#9fc8ff',
    coordinate: { x: 78, y: 22 },
  },
  {
    id: 'data-infra',
    label: 'Data & Infrastructure',
    shortLabel: 'Foundation',
    description: 'I shape data models and deployment boundaries so products can grow without losing clarity.',
    skills: ['PostgreSQL', 'Supabase', 'Redis', 'Vercel'],
    projectIds: ['atlas', 'codemap', 'axiom'],
    accent: '#ffd27d',
    coordinate: { x: 88, y: 68 },
  },
  {
    id: 'ai-workflows',
    label: 'AI Workflows',
    shortLabel: 'Intelligence',
    description: 'I connect model reasoning to grounded context, explicit controls, and deterministic application code.',
    skills: ['LLM APIs', 'Retrieval', 'Tool loops', 'Safety boundaries'],
    projectIds: ['atlas', 'execute', 'codemap'],
    accent: '#b8e986',
    coordinate: { x: 48, y: 86 },
  },
  {
    id: 'shipping',
    label: 'Shipping & Reliability',
    shortLabel: 'Delivery',
    description: 'I own the final mile: validation, failure recovery, deployment, telemetry, and iteration.',
    skills: ['GitHub', 'Validation', 'Observability', 'Release loops'],
    projectIds: ['execute', 'atlas', 'codemap'],
    accent: '#c9a7ff',
    coordinate: { x: 10, y: 70 },
  },
];

export const buildStages: BuildStage[] = [
  {
    id: 'understand',
    verb: 'Understand',
    title: 'Find the real problem.',
    description: 'Start with the user, the constraint, and the outcome—before choosing a framework or drawing a screen.',
    artifact: 'Problem brief',
    evidence: 'User intent → constraints → success signal',
    accent: '#f0a6ca',
  },
  {
    id: 'model',
    verb: 'Model',
    title: 'Give the system a spine.',
    description: 'Define the states, responsibilities, data boundaries, and failure paths that make the product understandable.',
    artifact: 'System map',
    evidence: 'Entities → boundaries → transitions',
    accent: '#9fc8ff',
  },
  {
    id: 'build',
    verb: 'Build',
    title: 'Make the path tangible.',
    description: 'Connect the interface to working execution early so the riskiest assumptions meet reality fast.',
    artifact: 'Vertical slice',
    evidence: 'UI ↔ API ↔ persistence',
    accent: '#ffd27d',
  },
  {
    id: 'protect',
    verb: 'Protect',
    title: 'Design the trust boundary.',
    description: 'Add validation, permissions, approval gates, idempotency, and recovery where mistakes become expensive.',
    artifact: 'Safety layer',
    evidence: 'Validate → authorize → execute',
    accent: '#b8e986',
  },
  {
    id: 'ship',
    verb: 'Ship',
    title: 'Close the last mile.',
    description: 'Deploy the complete workflow with useful telemetry and a clear path for diagnosing what happens next.',
    artifact: 'Production release',
    evidence: 'Deploy → observe → recover',
    accent: '#c9a7ff',
  },
  {
    id: 'improve',
    verb: 'Improve',
    title: 'Feed reality back in.',
    description: 'Use product signals and failure evidence to improve both the experience and the architecture with intent.',
    artifact: 'Learning loop',
    evidence: 'Evidence → decision → next release',
    accent: '#ff9b73',
  },
];

export const projectVisuals: Record<string, ProjectVisual> = {
  atlas: {
    accent: '#b8e986',
    softAccent: 'rgba(184, 233, 134, 0.15)',
    labLabel: 'Change intelligence',
    visualCue: 'GitHub / Notion / cited impact',
  },
  execute: {
    accent: '#f0a6ca',
    softAccent: 'rgba(240, 166, 202, 0.15)',
    labLabel: 'Agent operations',
    visualCue: 'Intent / approval / execution',
  },
  codemap: {
    accent: '#65dbc7',
    softAccent: 'rgba(101, 219, 199, 0.15)',
    labLabel: 'Codebase understanding',
    visualCue: 'Repository / context / query',
  },
  axiom: {
    accent: '#ffd27d',
    softAccent: 'rgba(255, 210, 125, 0.14)',
    labLabel: 'Freelancer operations',
    visualCue: 'Lead / delivery / billing',
  },
  cinematch: {
    accent: '#9fc8ff',
    softAccent: 'rgba(159, 200, 255, 0.14)',
    labLabel: 'Content discovery',
    visualCue: 'Search / match / save',
  },
};

export const currentBuild = {
  eyebrow: 'Currently Shipping',
  title: 'Active Engineering Focus',
  description:
    'Shipping work that improves reliability, developer experience, and system transparency across the current product set.',
  items: [
    'Hardening Atlas source provenance across GitHub reviews and Notion revisions',
    'Hardening Execute agent proposals, approvals, and failure recovery',
    'Evaluating cross-system retrieval for engineering intelligence',
    'Improving architecture and dependency visualization workflows',
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
    evidence: 'Atlas, Execute, Axiom',
  },
  {
    title: 'Make complex systems understandable',
    description:
      'Design developer-facing workflows, architecture views, and feedback loops that expose what the system is doing.',
    evidence: 'Atlas, CodeMap, Execute',
  },
  {
    title: 'Build reliability into the workflow',
    description:
      'Use validation, queues, observable execution, and deliberate state transitions where product trust depends on correctness.',
    evidence: 'Execute, Atlas, CodeMap',
  },
];

export const receipts = [
  'Built an approval-gated agent with persisted, expiring, and idempotent action proposals',
  'Enforced tenant isolation across agent tools, execution actions, integrations, and failure findings',
  'Added usage accounting, atomic limits, provider controls, and prompt-injection defenses',
  'Built Atlas ingestion and cited impact analysis across GitHub, Notion, and a cross-repository evidence graph',
  'Built semantic repository indexing pipeline for CodeMap',
];

export const recentBuilds = [
  {
    period: 'August 2026',
    items: [
      'Completed Atlas GitHub and Notion synchronization, cross-repository graphs, persisted impact reports, and production acceptance tooling',
      'Added approval-gated agent actions, tenant-safe tools, usage controls, and failure monitoring to Execute',
    ],
  },
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
    name: 'Atlas',
    detail: 'Source-backed engineering intelligence connecting GitHub, Notion, cross-repository graphs, and cited change-impact reports.',
  },
  {
    id: 'build-02',
    label: '[BUILD 02]',
    name: 'CodeMap',
    detail: 'Repository understanding tool with semantic retrieval and architecture visualization.',
  },
  {
    id: 'build-03',
    label: '[BUILD 03]',
    name: 'Execute',
    detail: 'Approval-gated agent for creating, inspecting, and operating deterministic workflows.',
  },
  {
    id: 'build-04',
    label: '[BUILD 04]',
    name: 'Axiom',
    detail: 'Freelancer platform covering proposals, projects, and invoicing in one system.',
  },
  {
    id: 'build-05',
    label: '[BUILD 05]',
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
  operatingStatement:
    'I work best with small teams building technically ambitious products where ownership matters more than job boundaries.',
  location: 'India / IST (UTC+5:30)',
  collaboration: 'Remote-first / async-friendly',
  response: 'Email is the fastest way to reach me',
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
    title: 'Execute - Approval-Gated Workflow Agent',
    organization: 'Personal Project',
    description: 'Built a tenant-safe agent that turns natural-language operations into validated proposals and deterministic, approval-gated execution.',
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
  {
    id: 'milestone-atlas',
    type: 'milestone',
    title: 'Atlas - Engineering Intelligence',
    organization: 'Developer Tool',
    description: 'Built an engineering-intelligence system that synchronizes GitHub and Notion into a living graph for cited change-impact analysis.',
    period: '2026',
    completed: false,
    icon: 'Rocket',
  },
];
