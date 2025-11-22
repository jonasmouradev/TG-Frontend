import { VacancyGateway, VacancyList } from '@core/domain/gateways/vacancy.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetPublishedVacancyUseCaseOutput = VacancyList;

export class GetPublishedVacancyUseCase implements IUseCase<void, GetPublishedVacancyUseCaseOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(): Promise<GetPublishedVacancyUseCaseOutput> {
    const response = await this.gateway.findPublished();

    if (!response.data) {
      throw new Error('Vacancy not found');
    }

    return response.data;
  }
}
