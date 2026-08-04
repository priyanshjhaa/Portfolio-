export interface Project {
  id: string;
  name: string;
  summary?: string;
  details?: string;
  impact?: string;
  whyBuiltThis?: string;
  proofTitle?: string;
  proofPoints?: string[];
  ownership?: string[];
  keyDecision?: string;
  tradeoff?: string;
  nextStep?: string;
  problem: string;
  approach: string;
  architectureNotes?: string[];
  highlightMetrics?: string[];
  flowSteps?: string[];
  architectureStages?: ArchitectureStage[];
  productionSignals?: string[];
  proofFrame?: {
    title: string;
    eyebrow: string;
    rails: string[];
    callout: string;
  };
  stack: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface ArchitectureStage {
  label: string;
  description: string;
  safeguard: string;
}

export type ProjectStatus = 'active' | 'maintenance' | 'archived';

export interface ProjectsData {
  projects: Project[];
}
