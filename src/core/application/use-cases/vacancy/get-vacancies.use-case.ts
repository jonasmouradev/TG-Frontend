import { VacancyFilters, VacancyGateway } from '@core/domain/gateways/vacancy.gateway';
import { PaginatedList, Vacancy } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetVacanciesUseCaseInput = VacancyFilters;

export type GetVacanciesUseCaseOutput = PaginatedList<Vacancy>;

export class GetVacanciesUseCase implements IUseCase<GetVacanciesUseCaseInput, GetVacanciesUseCaseOutput> {
  constructor(private readonly vacancyGateway: VacancyGateway) {}

  async execute(input: GetVacanciesUseCaseInput): Promise<GetVacanciesUseCaseOutput> {
    const response = await this.vacancyGateway.findAll(input);

    if (!response.data) {
      throw new Error('Vacancy not found');
    }

    return response.data;
  }
}
