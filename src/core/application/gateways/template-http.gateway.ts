import {
  TemplateGateway,
  TemplateFilters,
  GetTemplatesResponse,
  ProcessTemplateDto,
  CreateTemplateDto,
  UpdateTemplateDto,
} from '@core/domain/gateways/template.gateway';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';

export class TemplateHttpGateway implements TemplateGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async getProcessTemplates(filters?: TemplateFilters): PromiseResponse<GetTemplatesResponse> {
    const params: Record<string, string | number | boolean> = {};

    if (filters?.companyId) {
      params.companyId = filters.companyId;
    }
    if (filters?.category) {
      params.category = filters.category;
    }
    if (filters?.isDefault !== undefined) {
      params.isDefault = filters.isDefault;
    }
    if (filters?.search) {
      params.search = filters.search;
    }
    if (filters?.limit) {
      params.limit = filters.limit;
    }
    if (filters?.offset) {
      params.offset = filters.offset;
    }

    return this.httpClient.get<GetTemplatesResponse>({
      url: '/process-templates',
      params,
    });
  }

  async getTemplateById(id: string): PromiseResponse<ProcessTemplateDto> {
    return this.httpClient.get<ProcessTemplateDto>({
      url: `/process-templates/${id}`,
    });
  }

  async createTemplate(template: CreateTemplateDto): PromiseResponse<ProcessTemplateDto> {
    return this.httpClient.post<ProcessTemplateDto>({
      url: '/process-templates',
      payload: template,
    });
  }

  async updateTemplate(id: string, updates: UpdateTemplateDto): PromiseResponse<ProcessTemplateDto> {
    return this.httpClient.put<ProcessTemplateDto>({
      url: `/process-templates/${id}`,
      payload: updates,
    });
  }

  async deleteTemplate(id: string): PromiseResponse<void> {
    return this.httpClient.delete<void>({
      url: `/process-templates/${id}`,
    });
  }

  async duplicateTemplate(id: string, name?: string): PromiseResponse<ProcessTemplateDto> {
    return this.httpClient.post<ProcessTemplateDto>({
      url: `/process-templates/${id}/duplicate`,
      payload: { name },
    });
  }

  async getDefaultTemplates(): PromiseResponse<ProcessTemplateDto[]> {
    return this.httpClient.get<ProcessTemplateDto[]>({
      url: '/process-templates/defaults',
    });
  }
}
