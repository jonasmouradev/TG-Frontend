import {
  DashboardFilters,
  DashboardGateway,
  DashboardStats,
  VacancyStats,
} from '@core/domain/gateways/dashboard.gateway';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';

// TODO: refine this gateway in swagger docs and with front requirements
export class DashboardHttpGateway implements DashboardGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async findGeneralStats(params?: DashboardFilters): PromiseResponse<DashboardStats> {
    return this.httpClient.get<DashboardStats>({ url: '/dashboards', params });
  }

  async findStatsByVacancy(vacancyId: string): PromiseResponse<VacancyStats> {
    return this.httpClient.get<VacancyStats>({ url: `/vacancies/${vacancyId}/stats` });
  }
}
