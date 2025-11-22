import { VacancyGateway, VacancyList } from '@core/domain/gateways/vacancy.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetVacancyUseCaseOutput {
  vacancy: VacancyList;
}

export class GetPublishedVacancyUseCase implements IUseCase<void, GetVacancyUseCaseOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(): Promise<GetVacancyUseCaseOutput> {
    const response = await this.gateway.findPublished();

    if (!response.data) {
      throw new Error('Vacancy not found');
    }

    return {
      vacancy: response.data,
    };
  }
}
