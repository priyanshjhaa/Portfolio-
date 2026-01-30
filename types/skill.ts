export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'AI / LLMs'
  | 'Database'
  | 'DevOps'
  | 'Tools';

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: SkillCategory;
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
  description: string;
}

export type TimelineType =
  | 'education'
  | 'work'
  | 'project'
  | 'milestone';

export interface TimelineEntry {
  id: string;
  type: TimelineType;
  title: string;
  organization?: string;
  description: string;
  period: string;
  completed?: boolean;
  icon: 'GraduationCap' | 'Briefcase' | 'Rocket' | 'Code' | 'CheckCircle';
}
