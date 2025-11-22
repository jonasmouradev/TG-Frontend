import { VacancyGateway, CreateVacancyDto } from '@core/domain/gateways/vacancy.gateway';
import { ContractType, ExperienceLevel, Vacancy, VacancyType, WorkModeType } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';
import { DateTime } from 'luxon';

export interface CreateVacancyInput {
  title: string;
  description: string;
  companyId: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  type: VacancyType;
  area: string;
  level: ExperienceLevel;
  benefits?: string[];
  requirements: string[];
  contract: ContractType;
  workMode: WorkModeType;
  responsibilities: string[];
  publicationDate: DateTime | string;
  expirationDate: DateTime | string;
}

export interface CreateVacancyOutput {
  vacancy: Vacancy;
}

export class CreateVacancyUseCase implements IUseCase<CreateVacancyInput, CreateVacancyOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(input: CreateVacancyInput): Promise<CreateVacancyOutput> {
    const createVacancyDto: CreateVacancyDto = {
      ...input,
      publicationDate: input.publicationDate?.toString() ?? DateTime.now().toISODate(),
      expirationDate: input.expirationDate?.toString() ?? DateTime.now().plus({ days: 10 }).toISODate(),
    };

    const response = await this.gateway.create(createVacancyDto);

    if (!response.data) {
      throw new Error('Failed to create vacancy');
    }

    return {
      vacancy: response.data,
    };
  }
}
