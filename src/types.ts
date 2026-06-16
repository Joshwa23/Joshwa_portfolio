export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageAccent: string; // Tailwind color name like "blue" or "cyan"
  iconName: string; // Lucide icon identifier
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: { name: string; level: number; info?: string }[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  skillsGained: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  perf: string; // e.g. "CGPA: 8.5/10" or "Percentage: 75%"
  details?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
