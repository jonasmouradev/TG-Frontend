import { IUseCase } from '@/core/domain/use-case.interface';
import { StepGateway, StepList } from '@/core/domain/gateways/step.gateway';

export interface ReorderStepsUseCaseInput {
  templateId: string;
  stepIds: string[];
}

export interface ReorderStepsUseCaseOutput {
  steps: StepList;
}

export class ReorderStepsUseCase implements IUseCase<ReorderStepsUseCaseInput, ReorderStepsUseCaseOutput> {
  constructor(private readonly stepGateway: StepGateway) {}

  async execute(input: ReorderStepsUseCaseInput): Promise<ReorderStepsUseCaseOutput> {
    if (!input.templateId) {
      throw new Error('Template ID is required');
    }

    if (!input.stepIds || input.stepIds.length === 0) {
      throw new Error('Step IDs array is required');
    }

    const response = await this.stepGateway.reorderSteps(input.templateId, input.stepIds);

    if (!response.data) {
      throw new Error('Failed to reorder steps');
    }

    return {
      steps: response.data,
    };
  }
}
