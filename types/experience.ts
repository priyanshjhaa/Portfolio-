export interface Capability {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  skills: string[];
  projectIds: string[];
  accent: string;
  coordinate: { x: number; y: number };
}

export interface BuildStage {
  id: string;
  verb: string;
  title: string;
  description: string;
  artifact: string;
  evidence: string;
  accent: string;
}

export interface ProjectVisual {
  accent: string;
  softAccent: string;
  labLabel: string;
  visualCue: string;
}
