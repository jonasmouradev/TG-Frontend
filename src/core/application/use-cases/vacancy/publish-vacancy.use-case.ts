import { VacancyGateway } from '@core/domain/gateways/vacancy.gateway';
import { Vacancy } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface PublishVacancyInput {
  id: string;
}

export interface PublishVacancyOutput {
  vacancy: Vacancy;
}

export class PublishVacancyUseCase implements IUseCase<PublishVacancyInput, PublishVacancyOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(input: PublishVacancyInput): Promise<PublishVacancyOutput> {
    const response = await this.gateway.publishVacancy(input.id);

    if (!response.data) {
      throw new Error('Failed to publish vacancy');
    }

    return {
      vacancy: response.data,
    };
  }
}
