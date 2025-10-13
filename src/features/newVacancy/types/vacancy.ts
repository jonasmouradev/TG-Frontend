export interface VacancyFormData {
  title: string;
  description: string;
  requirements: string[];
  questions: string[];
}

export interface Stage {
  id: string;
  name: string;
  type: 'screening' | 'interview' | 'test' | 'custom';
  description: string;
  duration?: string;
  responsible?: string;
  autoNotify?: boolean;
}

export interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  stages: Omit<Stage, 'id'>[];
}
