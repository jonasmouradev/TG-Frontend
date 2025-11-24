import { Vacancy } from '@core/domain/entities';
import { CandidateVacancyMatch } from '@core/domain/entities/candidate-vacancy-match';
import {
  CreateVacancyDto,
  UpdateVacancyDto,
  FindBestCandidateDto,
  FindBestCandidatesDto,
  VacancyFilters,
  VacancyGateway,
  VacancyList,
  ReorderVacancyStepsDto,
} from '@core/domain/gateways/vacancy.gateway';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';

export class VacancyHttpGateway implements VacancyGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async findOne(id: string): PromiseResponse<Vacancy> {
    return this.httpClient.get<Vacancy>({ url: `/vacancies/${id}` });
  }

  async findAll(params?: VacancyFilters): PromiseResponse<VacancyList> {
    return this.httpClient.get<VacancyList>({ url: `/vacancies`, params });
  }

  async findPublished(): PromiseResponse<VacancyList> {
    return this.httpClient.get<VacancyList>({ url: `/vacancies/published` });
  }

  async create(payload: CreateVacancyDto): PromiseResponse<Vacancy> {
    return this.httpClient.post<Vacancy>({ url: `/vacancies`, payload });
  }

  async update(id: string, payload: UpdateVacancyDto): PromiseResponse<Vacancy> {
    return this.httpClient.put<Vacancy>({ url: `/vacancies/${id}`, payload });
  }

  async remove(id: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/vacancies/${id}` });
  }

  async publish(id: string): PromiseResponse<Vacancy> {
    return this.httpClient.post<Vacancy>({ url: `/vacancies/${id}/publish` });
  }

  async close(id: string): PromiseResponse<Vacancy> {
    return this.httpClient.post<Vacancy>({ url: `/vacancies/${id}/close` });
  }

  async findBestCandidates({
    vacancyId,
    minScore,
    limit,
  }: FindBestCandidatesDto): PromiseResponse<CandidateVacancyMatch[]> {
    const params: Record<string, number> = {};
    if (minScore !== undefined) params.minScore = minScore;
    if (limit !== undefined) params.limit = limit;

    return this.httpClient.get<CandidateVacancyMatch[]>({
      url: `/vacancies/${vacancyId}/best-candidates`,
      params,
    });
  }

  async findBestCandidate({ vacancyId }: FindBestCandidateDto): PromiseResponse<CandidateVacancyMatch | null> {
    return this.httpClient.get<CandidateVacancyMatch | null>({
      url: `/vacancies/${vacancyId}/best-candidate`,
    });
  }

  async reorderSteps({ vacancyId, stepIds }: ReorderVacancyStepsDto): PromiseResponse<void> {
    return this.httpClient.put<void>({
      url: `/vacancies/reorder`,
      payload: { vacancyId, stepIds },
    });
  }
}
