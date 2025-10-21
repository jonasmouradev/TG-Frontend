import { PaginatedList, Step } from '@core/domain/entities';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';
import { CreateStepDto, StepFilters, StepGateway, UpdateStepDto } from '@core/domain/gateways/step.gateway';

export class StepHttpGateway implements StepGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async findOne(id: string): PromiseResponse<Step> {
    return this.httpClient.get<Step>({ url: `/steps/${id}` });
  }

  async findAll(params?: StepFilters): PromiseResponse<PaginatedList<Step>> {
    return this.httpClient.get<PaginatedList<Step>>({ url: `/steps`, params });
  }

  async create(payload: CreateStepDto): PromiseResponse<Step> {
    return this.httpClient.post<Step>({ url: `/steps`, payload });
  }

  async update(id: string, payload: UpdateStepDto): PromiseResponse<Step> {
    return this.httpClient.put<Step>({ url: `/steps/${id}`, payload });
  }

  async remove(id: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/steps/${id}` });
  }

  async reorderSteps(templateId: string, stepIds: string[]): PromiseResponse<PaginatedList<Step>> {
    return this.httpClient.post<PaginatedList<Step>>({
      url: `/steps/reorder`,
      payload: { templateId, stepIds },
    });
  }
}
