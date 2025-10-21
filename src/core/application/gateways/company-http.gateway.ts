import { Company } from '@/core/domain/entities';
import {
  CompanyList,
  CompanyFilters,
  CompanyGateway,
  CreateCompanyDto,
  UpdateCompanyDto,
  CompanyStatistics,
} from '@/core/domain/gateways/company.gateway';
import { IHttpClient, PromiseResponse } from '@/core/domain/ports/http-client.port';

export class CompanyHttpGateway implements CompanyGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async findOne(id: string): PromiseResponse<Company> {
    return this.httpClient.get<Company>({ url: `/companies/${id}` });
  }

  async findAll(params?: CompanyFilters): PromiseResponse<CompanyList> {
    return this.httpClient.get<CompanyList>({ url: `/companies`, params });
  }

  async create(payload: CreateCompanyDto): PromiseResponse<Company> {
    return this.httpClient.post<Company>({ url: `/companies`, payload });
  }

  async update(id: string, payload: UpdateCompanyDto): PromiseResponse<Company> {
    return this.httpClient.put<Company>({ url: `/companies/${id}`, payload });
  }

  async remove(id: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/companies/${id}` });
  }

  async getCompanyVacancies(
    companyId: string,
    params?: {
      status?: string;
      area?: string;
      page?: number;
      limit?: number;
    },
  ): PromiseResponse<any> {
    return this.httpClient.get<any>({ url: `/companies/${companyId}/vacancies`, params });
  }

  async getCompanyUsers(
    companyId: string,
    params?: {
      type?: string;
      status?: string;
      page?: number;
      limit?: number;
    },
  ): PromiseResponse<any> {
    return this.httpClient.get<any>({ url: `/companies/${companyId}/users`, params });
  }

  async getCompanyStatistics(companyId: string): PromiseResponse<CompanyStatistics> {
    return this.httpClient.get<CompanyStatistics>({ url: `/companies/${companyId}/statistics` });
  }
}
