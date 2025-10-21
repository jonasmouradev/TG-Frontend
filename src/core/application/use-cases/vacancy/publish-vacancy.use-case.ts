import { VacancyGateway } from '@/core/domain/gateways/vacancy.gateway';
import { Vacancy } from '@/core/domain/entities';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface PublishVacancyUseCaseInput {
  id: string;
}

export interface PublishVacancyUseCaseOutput {
  vacancy: Vacancy;
}

export class PublishVacancyUseCase implements IUseCase<PublishVacancyUseCaseInput, PublishVacancyUseCaseOutput> {
  constructor(private vacancyGateway: VacancyGateway) {}

  async execute(input: PublishVacancyUseCaseInput): Promise<PublishVacancyUseCaseOutput> {
    const response = await this.vacancyGateway.publishVacancy(input.id);

    if (!response.data) {
      throw new Error('Failed to publish vacancy');
    }

    return {
      vacancy: response.data,
    };
  }
}
