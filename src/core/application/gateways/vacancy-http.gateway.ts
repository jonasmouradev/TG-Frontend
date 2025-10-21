import { Vacancy } from '@/core/domain/entities';
import {
  CreateVacancyDto,
  UpdateVacancyDto,
  VacancyFilters,
  VacancyGateway,
  VacancyList,
} from '@/core/domain/gateways/vacancy.gateway';
import { IHttpClient, PromiseResponse } from '@/core/domain/ports/http-client.port';

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

  async publishVacancy(id: string): PromiseResponse<Vacancy> {
    return this.httpClient.post<Vacancy>({ url: `/vacancies/${id}/publish` });
  }

  async closeVacancy(id: string): PromiseResponse<Vacancy> {
    return this.httpClient.post<Vacancy>({ url: `/vacancies/${id}/close` });
  }
}
