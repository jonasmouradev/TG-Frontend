import { ExperienceLevel, VacancyType } from '@core/domain';
import { DateTime } from 'luxon';

export interface VacancyFormData {
  title: string;
  description: string;
  requirements: string[];
  questions: string[];
  department?: string;
  contractType?: VacancyType;
  location: string;
  workMode?: string;
  benefits?: string[];
  salaryRange?: { min: number; max: number };
  currency?: Currency;
  level?: ExperienceLevel;
  remote?: boolean;
  publicationDate: DateTime;
  expirationDate?: DateTime;
}

export enum Currency {
  USD = 'USD',
  R$ = 'R$',
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
