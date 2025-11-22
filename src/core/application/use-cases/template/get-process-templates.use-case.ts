import { TemplateGateway } from '@core/domain/gateways/template.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetProcessTemplatesUseCaseInput {
  companyId?: string;
  category?: string;
  isDefault?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface GetProcessTemplatesUseCaseOutput {
  templates: Array<{
    id: string;
    name: string;
    description: string;
    category?: string;
    isDefault?: boolean;
    stages: Array<{
      id?: string;
      name: string;
      type: 'screening' | 'interview' | 'test' | 'custom';
      description: string;
      duration?: string;
      responsible?: string;
      autoNotify?: boolean;
      order?: number;
    }>;
    companyId?: string;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
  }>;
  totalCount: number;
}

export class GetProcessTemplatesUseCase
  implements IUseCase<GetProcessTemplatesUseCaseInput, GetProcessTemplatesUseCaseOutput>
{
  constructor(private readonly gateway: TemplateGateway) {}

  async execute(input: GetProcessTemplatesUseCaseInput): Promise<GetProcessTemplatesUseCaseOutput> {
    const filters = {
      companyId: input.companyId,
      category: input.category,
      isDefault: input.isDefault,
      search: input.search,
      limit: input.limit || 50,
      offset: input.offset || 0,
    };

    const response = await this.gateway.getProcessTemplates(filters);

    if (!response.data) {
      throw new Error('Failed to get process templates');
    }

    return {
      templates: response.data.templates,
      totalCount: response.data.totalCount,
    };
  }
}
