import { VacancyGateway } from '@core/domain/gateways/vacancy.gateway';
import { Vacancy } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetVacancyUseCaseInput {
  id: string;
}

export interface GetVacancyUseCaseOutput {
  vacancy: Vacancy;
}

export class GetVacancyUseCase implements IUseCase<GetVacancyUseCaseInput, GetVacancyUseCaseOutput> {
  constructor(private vacancyGateway: VacancyGateway) {}

  async execute(input: GetVacancyUseCaseInput): Promise<GetVacancyUseCaseOutput> {
    const response = await this.vacancyGateway.findOne(input.id);

    if (!response.data) {
      throw new Error('Vacancy not found');
    }

    return {
      vacancy: response.data,
    };
  }
}
