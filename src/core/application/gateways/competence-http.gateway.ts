import { Competence, PaginatedList } from '@core/domain/entities';
import {
  CompetenceList,
  CompetenceFilters,
  CompetenceGateway,
  CreateCompetenceDto,
  UpdateCompetenceDto,
} from '@core/domain/gateways/competence.gateway';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';

export class CompetenceHttpGateway implements CompetenceGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async findOne(id: string): PromiseResponse<Competence> {
    return this.httpClient.get<Competence>({ url: `/competences/${id}` });
  }

  async findAll(params?: CompetenceFilters): PromiseResponse<PaginatedList<Competence>> {
    return this.httpClient.get<CompetenceList>({ url: `/competences`, params });
  }

  async create(payload: CreateCompetenceDto): PromiseResponse<Competence> {
    return this.httpClient.post<Competence>({ url: `/competences`, payload });
  }

  async update(id: string, payload: UpdateCompetenceDto): PromiseResponse<Competence> {
    return this.httpClient.put<Competence>({ url: `/competences/${id}`, payload });
  }

  async remove(id: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/competences/${id}` });
  }
}
