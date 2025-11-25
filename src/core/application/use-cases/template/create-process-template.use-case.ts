import { Step } from '@core/domain';
import { TemplateGateway } from '@core/domain/gateways/template.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface CreateProcessTemplateUseCaseInput {
  name: string;
  description: string;
  category?: string;
  stages: Step[];
  companyId?: string;
}

export interface CreateProcessTemplateUseCaseOutput {
  id: string;
  name: string;
  description: string;
  category?: string;
  isDefault?: boolean;
  stages: Step[];
  companyId?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class CreateProcessTemplateUseCase
  implements IUseCase<CreateProcessTemplateUseCaseInput, CreateProcessTemplateUseCaseOutput>
{
  constructor(private readonly gateway: TemplateGateway) {}

  async execute(input: CreateProcessTemplateUseCaseInput): Promise<CreateProcessTemplateUseCaseOutput> {
    // Validate input
    if (!input.name.trim()) {
      throw new Error('Template name is required');
    }

    if (!input.stages || input.stages.length === 0) {
      throw new Error('Template must have at least one stage');
    }

    const createTemplateDto = {
      name: input.name.trim(),
      description: input.description.trim(),
      category: input.category,
      companyId: input.companyId,
      stages: input.stages.map((stage, index) => ({
        templateId: stage.templateId,
        name: stage.name,
        description: stage.description,
        order: index + 1,
        type: stage.type,
        estimatedDuration: stage.estimatedDuration,
        createdAt: stage.createdAt,
        updatedAt: stage.updatedAt,
      })),
    };

    const response = await this.gateway.createTemplate(createTemplateDto);

    if (!response.data) {
      throw new Error('Failed to create process template');
    }

    return response.data;
  }
}
