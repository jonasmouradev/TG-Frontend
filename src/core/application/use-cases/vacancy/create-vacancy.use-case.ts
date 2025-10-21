import { VacancyGateway, CreateVacancyDto } from '@/core/domain/gateways/vacancy.gateway';
import { Vacancy } from '@/core/domain/entities';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface CreateVacancyUseCaseInput {
  title: string;
  description: string;
  companyId: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  type: string;
  level: string;
  remote: boolean;
  benefits?: string[];
  requirements: string[];
  responsibilities: string[];
}

export interface CreateVacancyUseCaseOutput {
  vacancy: Vacancy;
}

export class CreateVacancyUseCase implements IUseCase<CreateVacancyUseCaseInput, CreateVacancyUseCaseOutput> {
  constructor(private vacancyGateway: VacancyGateway) {}

  async execute(input: CreateVacancyUseCaseInput): Promise<CreateVacancyUseCaseOutput> {
    const createVacancyDto: CreateVacancyDto = {
      title: input.title,
      description: input.description,
      companyId: input.companyId,
      location: input.location,
      salaryMin: input.salaryMin,
      salaryMax: input.salaryMax,
      currency: input.currency,
      type: input.type as any,
      level: input.level as any,
      remote: input.remote,
      benefits: input.benefits,
      requirements: input.requirements,
      responsibilities: input.responsibilities,
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
