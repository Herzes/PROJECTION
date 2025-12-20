
export enum GoalTimeline {
  FIVE_YEARS = '5 Years',
  TEN_YEARS = '10 Years'
}

export interface UserProfile {
  name: string;
  education: string; // e.g., GCSE, Degree
  currentBackground: string;
  techKnowledge: string;
  interests: string[];
  skills: string[]; // New: Array of specific skill tags
  projects: string;
  reasonForTech: string;
  timelineGoal: GoalTimeline;
}

export interface Resource {
  name: string;
  url: string;
  isFree: boolean;
  type: 'course' | 'textbook' | 'tool' | 'institution';
}

export interface RoadmapStep {
  title: string;
  description: string;
  resources: Resource[];
  timeEstimate: string;
  aiAdvantage?: string; // How to use AI for this step
  portfolioIdea?: string; // Specific project to build
}

export interface CareerProjection {
  title: string;
  description: string;
  projectedSalary: string;
  requiredSkills: string[];
  keyExperts: { name: string; role: string; profileUrl: string; platform: 'linkedin' | 'youtube' }[];
}

export interface PersonalizedRoadmap {
  suggestedRole: string;
  summary: string;
  steps: RoadmapStep[];
  fiveYearOutlook: CareerProjection;
  tenYearOutlook: CareerProjection;
  recommendedBooks: { title: string; author: string; why: string }[];
}

export const TECH_INTERESTS = [
  "Cybersecurity (Defense/SOC)",
  "Cybersecurity (Offensive/Pentesting)",
  "Cloud Engineering (AWS/Azure)",
  "AI & Prompt Engineering",
  "Frontend Development",
  "Backend & API Development",
  "DevSecOps",
  "Data Analytics",
  "IT Support & Systems",
  "Project Management in Tech"
];
