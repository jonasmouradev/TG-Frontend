import { VacancyFilters, VacancyGateway } from '@core/domain/gateways/vacancy.gateway';
import { PaginatedList, Vacancy } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetVacanciesInput = VacancyFilters;

export type GetVacanciesOutput = PaginatedList<Vacancy>;

export class GetVacanciesUseCase implements IUseCase<GetVacanciesInput, GetVacanciesOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  public static readonly queryKey = (input: Partial<GetVacanciesInput>) => ['vacancy', 'getVacancies', input];

  async execute(input: GetVacanciesInput): Promise<GetVacanciesOutput> {
    const response = await this.gateway.findAll(input);

    if (!response.data) {
      throw new Error('Vacancy not found');
    }

    return response.data;
  }
}
