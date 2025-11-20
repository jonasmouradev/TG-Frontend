import { ExperienceLevel, Vacancy, VacancyStatus, VacancyType, PaginatedList } from '@core/domain/entities';
import { PromiseResponse } from '../ports/http-client.port';

type Filters = {
  companyId?: string;
  title?: string;
  location?: string;
  type?: VacancyType;
  level?: ExperienceLevel;
  remote?: boolean;
  status?: VacancyStatus;
  salaryMin?: number;
  salaryMax?: number;
};

type Create = {
  title: string;
  description: string;
  companyId: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  type: VacancyType;
  level: ExperienceLevel;
  remote: boolean;
  benefits?: string[];
  requirements: string[];
  responsibilities: string[];
  publicationDate: string | null;
  expirationDate: string | null;
};

type Update = {
  title?: string;
  description?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  type?: VacancyType;
  level?: ExperienceLevel;
  remote?: boolean;
  benefits?: string[];
  requirements?: string[];
  responsibilities?: string[];
  status?: VacancyStatus;
  expirationDate?: Date;
};

type VacancyList = PaginatedList<Vacancy>;

export interface VacancyGateway {
  findOne(id: string): PromiseResponse<Vacancy | null>;
  findAll(params?: Filters): PromiseResponse<VacancyList>;
  findPublished(): PromiseResponse<VacancyList>;
  create(payload: Create): PromiseResponse<Vacancy>;
  update(id: string, payload: Update): PromiseResponse<Vacancy>;
  remove(id: string): PromiseResponse<void | null>;
  publishVacancy(id: string): PromiseResponse<Vacancy>;
  closeVacancy(id: string): PromiseResponse<Vacancy>;
}

export type { Filters as VacancyFilters, Update as UpdateVacancyDto, Create as CreateVacancyDto, VacancyList };
