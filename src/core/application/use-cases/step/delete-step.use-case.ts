import { IUseCase } from '@/core/domain/use-case.interface';
import { StepGateway } from '@/core/domain/gateways/step.gateway';

export interface DeleteStepUseCaseInput {
  id: string;
}

export interface DeleteStepUseCaseOutput {
  success: boolean;
}

export class DeleteStepUseCase implements IUseCase<DeleteStepUseCaseInput, DeleteStepUseCaseOutput> {
  constructor(private readonly stepGateway: StepGateway) {}

  async execute(input: DeleteStepUseCaseInput): Promise<DeleteStepUseCaseOutput> {
    if (!input.id) {
      throw new Error('Step ID is required');
    }

    await this.stepGateway.remove(input.id);

    return {
      success: true,
    };
  }
}
