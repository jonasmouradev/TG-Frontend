import { VacancyGateway } from '@core/domain/gateways/vacancy.gateway';
import { Vacancy } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetVacancyInput {
  id: string;
}

export interface GetVacancyOutput {
  vacancy: Vacancy;
}

export class GetVacancyUseCase implements IUseCase<GetVacancyInput, GetVacancyOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(input: GetVacancyInput): Promise<GetVacancyOutput> {
    const response = await this.gateway.findOne(input.id);

    if (!response.data) {
      throw new Error('Vacancy not found');
    }

    return {
      vacancy: response.data,
    };
  }
}
