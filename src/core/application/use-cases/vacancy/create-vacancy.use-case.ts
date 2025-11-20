import { VacancyGateway, CreateVacancyDto } from '@core/domain/gateways/vacancy.gateway';
import { ContractType, ExperienceLevel, Vacancy, VacancyType, WorkModeType } from '@core/domain/entities';
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
  contract: ContractType;
  workMode: WorkModeType;
  responsibilities: string[];
  publicationDate?: DateTime | null;
  expirationDate?: DateTime | null;
}

export interface CreateVacancyUseCaseOutput {
  vacancy: Vacancy;
}

export class CreateVacancyUseCase implements IUseCase<CreateVacancyUseCaseInput, CreateVacancyUseCaseOutput> {
  constructor(private readonly vacancyGateway: VacancyGateway) {}

  async execute(input: CreateVacancyUseCaseInput): Promise<CreateVacancyUseCaseOutput> {
    const createVacancyDto: CreateVacancyDto = {
      ...input,
      publicationDate: input.publicationDate?.toSQLDate() ?? null,
      expirationDate: input.expirationDate?.toSQLDate() ?? null,
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
