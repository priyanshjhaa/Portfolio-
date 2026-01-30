export interface Project {
  id: string;
  name: string;
  problem: string;
  approach: string;
  stack: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}

export type ProjectStatus = 'active' | 'maintenance' | 'archived';

export interface ProjectsData {
  projects: Project[];
}
