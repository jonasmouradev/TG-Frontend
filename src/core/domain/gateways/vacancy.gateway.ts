import { ExperienceLevel, Vacancy, VacancyStatus, VacancyType, PaginatedList } from '@core/domain/entities';
import { PromiseResponse } from '../ports/http-client.port';
import { CandidateVacancyMatch } from '../entities/candidate-vacancy-match';

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
  benefits?: string[];
  requirements: string[];
  responsibilities: string[];
  publicationDate: string;
  expirationDate: string;
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

type FindBestCandidate = {
  vacancyId: string;
};

type FindBestCandidates = {
  vacancyId: string;
  minScore?: number;
  limit?: number;
};

type VacancyList = PaginatedList<Vacancy>;

export interface VacancyGateway {
  findOne(id: string): PromiseResponse<Vacancy | null>;
  findAll(params?: Filters): PromiseResponse<VacancyList>;
  findPublished(): PromiseResponse<VacancyList>;
  create(payload: Create): PromiseResponse<Vacancy>;
  update(id: string, payload: Update): PromiseResponse<Vacancy>;
  remove(id: string): PromiseResponse<void | null>;
  publish(id: string): PromiseResponse<Vacancy>;
  close(id: string): PromiseResponse<Vacancy>;
  findBestCandidates(params: FindBestCandidates): PromiseResponse<CandidateVacancyMatch[]>;
  findBestCandidate(params: FindBestCandidate): PromiseResponse<CandidateVacancyMatch | null>;
}

export type {
  Filters as VacancyFilters,
  Update as UpdateVacancyDto,
  Create as CreateVacancyDto,
  FindBestCandidate as FindBestCandidateDto,
  FindBestCandidates as FindBestCandidatesDto,
  VacancyList,
};
