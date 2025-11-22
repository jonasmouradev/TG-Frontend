import { IUseCase } from '@core/domain/use-case.interface';
import { StepGateway, UpdateStepDto } from '@core/domain/gateways/step.gateway';
import { Step } from '@core/domain/entities';

export interface UpdateStepUseCaseInput {
  id: string;
  data: UpdateStepDto;
}

export interface UpdateStepUseCaseOutput {
  step: Step;
}

export class UpdateStepUseCase implements IUseCase<UpdateStepUseCaseInput, UpdateStepUseCaseOutput> {
  constructor(private readonly gateway: StepGateway) {}

  async execute(input: UpdateStepUseCaseInput): Promise<UpdateStepUseCaseOutput> {
    if (!input.id) {
      throw new Error('Step ID is required');
    }

    const response = await this.gateway.update(input.id, input.data);

    if (!response.data) {
      throw new Error('Failed to update step');
    }

    return {
      step: response.data,
    };
  }
}
