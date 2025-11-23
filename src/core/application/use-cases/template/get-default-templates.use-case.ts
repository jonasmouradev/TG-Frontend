import { TemplateGateway } from '@core/domain/gateways/template.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetDefaultTemplatesUseCaseOutput {
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
}

export class GetDefaultTemplatesUseCase implements IUseCase<void, GetDefaultTemplatesUseCaseOutput> {
  constructor(private readonly gateway: TemplateGateway) {}

  public static readonly queryKey = (): string[] => {
    return ['templates', 'default'];
  };

  async execute(): Promise<GetDefaultTemplatesUseCaseOutput> {
    const response = await this.gateway.getDefaultTemplates();

    if (!response.data) {
      throw new Error('Failed to get default templates');
    }

    return {
      templates: response.data,
    };
  }
}
