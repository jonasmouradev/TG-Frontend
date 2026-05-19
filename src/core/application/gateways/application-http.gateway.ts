import { Application, ApplicationStatus } from '@core/domain/entities';
import {
  ApplicationList,
  ApplicationFilters,
  ApplicationGateway,
  CreateApplicationDto,
  UpdateApplicationDto,
} from '@core/domain/gateways/application.gateway';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';

export class ApplicationHttpGateway implements ApplicationGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async findOne(id: string): PromiseResponse<Application> {
    return this.httpClient.get<Application>({ url: `/applications/${id}` });
  }

  async findAll(params?: ApplicationFilters): PromiseResponse<ApplicationList> {
    return this.httpClient.get<ApplicationList>({ url: `/applications`, params });
  }

  async findByVacancy(vacancyId: string): PromiseResponse<ApplicationList> {
    return this.httpClient.get<ApplicationList>({ url: `/vacancies/${vacancyId}/applications` });
  }

  async findByApplicant(applicantId: string): PromiseResponse<ApplicationList> {
    return this.httpClient.get<ApplicationList>({ url: `/applicants/${applicantId}/applications` });
  }

  async create(payload: CreateApplicationDto): PromiseResponse<Application> {
    return this.httpClient.post<Application>({ url: `/applications`, payload });
  }

  async update(id: string, payload: UpdateApplicationDto): PromiseResponse<Application> {
    return this.httpClient.put<Application>({ url: `/applications/${id}`, payload });
  }

  async remove(id: string): PromiseResponse<void | null> {
    return this.httpClient.delete({ url: `/applications/${id}` });
  }

  async updateStatus(id: string, payload: { status: ApplicationStatus }): PromiseResponse<Application> {
    return this.httpClient.patch<Application>({ url: `/applications/${id}`, payload });
  }
}
