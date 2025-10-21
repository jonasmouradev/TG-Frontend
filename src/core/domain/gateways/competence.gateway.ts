import { Competence, CompetenceCategory, CompetenceLevel, PaginatedList } from '@/core/domain/entities';
import { PromiseResponse } from '../ports/http-client.port';

type Filters = {
  name?: string;
  category?: CompetenceCategory;
  level?: CompetenceLevel;
};

type Create = {
  name: string;
  category: CompetenceCategory;
  description?: string;
  level?: CompetenceLevel;
};

type Update = {
  name?: string;
  category?: CompetenceCategory;
  description?: string;
  level?: CompetenceLevel;
};

type CompetenceList = PaginatedList<Competence>;

export interface CompetenceGateway {
  findOne(id: string): PromiseResponse<Competence | null>;
  findAll(params?: Filters): PromiseResponse<CompetenceList>;
  create(payload: Create): PromiseResponse<Competence | null>;
  update(id: string, payload: Update): PromiseResponse<Competence | null>;
  remove(id: string): PromiseResponse<void | null>;
}

export type {
  CompetenceList,
  Filters as CompetenceFilters,
  Update as UpdateCompetenceDto,
  Create as CreateCompetenceDto,
};
