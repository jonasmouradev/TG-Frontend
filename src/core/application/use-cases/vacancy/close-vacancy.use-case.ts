import { VacancyGateway } from '@core/domain/gateways/vacancy.gateway';
import { Vacancy } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface CloseVacancyInput {
  id: string;
}

export interface CloseVacancyOutput {
  vacancy: Vacancy;
}

export class CloseVacancyUseCase implements IUseCase<CloseVacancyInput, CloseVacancyOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(input: CloseVacancyInput): Promise<CloseVacancyOutput> {
    const response = await this.gateway.close(input.id);

    if (!response.data) {
      throw new Error('Failed to publish vacancy');
    }

    return {
      vacancy: response.data,
    };
  }
}
