import { VacancyGateway, VacancyList } from '@core/domain/gateways/vacancy.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetPublishedVacancyOutput = VacancyList;

export class GetPublishedVacancyUseCase implements IUseCase<void, GetPublishedVacancyOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(): Promise<GetPublishedVacancyOutput> {
    const response = await this.gateway.findPublished();

    if (!response.data) {
      throw new Error('Vacancy not found');
    }

    return response.data;
  }
}
