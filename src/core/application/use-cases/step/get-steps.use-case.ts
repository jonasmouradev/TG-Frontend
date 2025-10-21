import { IUseCase } from '@core/domain/use-case.interface';
import { StepGateway, StepFilters, StepList } from '@core/domain/gateways/step.gateway';

export interface GetStepsUseCaseInput {
  filters?: StepFilters;
}

export interface GetStepsUseCaseOutput {
  data: StepList;
}

export class GetStepsUseCase implements IUseCase<GetStepsUseCaseInput, GetStepsUseCaseOutput> {
  constructor(private readonly stepGateway: StepGateway) {}

  async execute(input: GetStepsUseCaseInput = {}): Promise<GetStepsUseCaseOutput> {
    const response = await this.stepGateway.findAll(input.filters);

    if (!response.data) {
      throw new Error('Failed to retrieve steps');
    }

    return {
      data: response.data,
    };
  }
}
