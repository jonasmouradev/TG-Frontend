import { ContractType, ExperienceLevel, Step, VacancyType, WorkModeType } from '@core/domain';
import { DateTime } from 'luxon';

export interface VacancyFormData {
  title: string;
  description: string;
  location: string;
  requirements: string[];
  questions: string[];
  department?: string;
  type?: VacancyType;
  currency?: Currency;
  contract: ContractType;
  workMode?: WorkModeType;
  level?: ExperienceLevel;
  benefits?: string[];
  salaryRange: { min: number; max: number };
  publicationDate?: DateTime;
  expirationDate?: DateTime;
}

export enum Currency {
  USD = 'USD',
  R$ = 'R$',
}

export interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  stages: Omit<Step, 'id'>[];
}
