import { VacancyGateway, CreateVacancyDto } from '@core/domain/gateways/vacancy.gateway';
import { ExperienceLevel, Vacancy, VacancyType } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';
import { DateTime } from 'luxon';

export interface CreateVacancyUseCaseInput {
  title: string;
  description: string;
  companyId: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  type: VacancyType;
  level: ExperienceLevel;
  remote: boolean;
  benefits?: string[];
  requirements: string[];
  responsibilities: string[];
  publicationDate: DateTime;
  expirationDate?: DateTime;
}

export interface CreateVacancyUseCaseOutput {
  vacancy: Vacancy;
}

export class CreateVacancyUseCase implements IUseCase<CreateVacancyUseCaseInput, CreateVacancyUseCaseOutput> {
  constructor(private readonly vacancyGateway: VacancyGateway) {}

  async execute(input: CreateVacancyUseCaseInput): Promise<CreateVacancyUseCaseOutput> {
    const createVacancyDto: CreateVacancyDto = {
      ...input,
      publicationDate: input.publicationDate.toSQLDate() ?? '',
      expirationDate: input.expirationDate?.toSQLDate() ?? undefined,
    };

    const response = await this.vacancyGateway.create(createVacancyDto);

    if (!response.data) {
      throw new Error('Failed to create vacancy');
    }

    return {
      vacancy: response.data,
    };
  }
}
