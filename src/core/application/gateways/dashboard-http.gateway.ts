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
    return this.httpClient.get<DashboardStats>({ url: '/dashboard/stats', params });
  }

  async findStatsByVacancy(vacancyId: string): PromiseResponse<VacancyStats> {
    return this.httpClient.get<VacancyStats>({ url: `/vacancies/${vacancyId}/stats` });
  }

  async getCompanyStats(companyId: string, params?: DashboardFilters): PromiseResponse<DashboardStats> {
    return this.httpClient.get<DashboardStats>({ url: `/dashboard/company/${companyId}/stats`, params });
  }

  async getRecentApplications(limit?: number, companyId?: string): PromiseResponse<any> {
    const params = { limit, companyId };
    return this.httpClient.get<any>({ url: '/dashboard/recent-applications', params });
  }

  async getTopVacancies(limit?: number, companyId?: string): PromiseResponse<any> {
    const params = { limit, companyId };
    return this.httpClient.get<any>({ url: '/dashboard/top-vacancies', params });
  }

  async getApplicationsByStatus(companyId?: string): PromiseResponse<any> {
    const params = { companyId };
    return this.httpClient.get<any>({ url: '/dashboard/applications-by-status', params });
  }

  async getMonthlyApplications(months?: number, companyId?: string): PromiseResponse<any> {
    const params = { months, companyId };
    return this.httpClient.get<any>({ url: '/dashboard/monthly-applications', params });
  }
}
