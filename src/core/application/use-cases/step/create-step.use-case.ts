import { IUseCase } from '@core/domain/use-case.interface';
import { StepGateway, CreateStepDto } from '@core/domain/gateways/step.gateway';
import { Step } from '@core/domain/entities';

export type CreateStepUseCaseInput = CreateStepDto;

export interface CreateStepUseCaseOutput {
  step: Step;
}

export class CreateStepUseCase implements IUseCase<CreateStepUseCaseInput, CreateStepUseCaseOutput> {
  constructor(private readonly stepGateway: StepGateway) {}

  async execute(input: CreateStepUseCaseInput): Promise<CreateStepUseCaseOutput> {
    if (!input.templateId) {
      throw new Error('Template ID is required');
    }

    if (!input.name) {
      throw new Error('Step name is required');
    }

    if (!input.type) {
      throw new Error('Step type is required');
    }

    const response = await this.stepGateway.create(input);

    if (!response.data) {
      throw new Error('Failed to create step');
    }

    return {
      step: response.data,
    };
  }
}
