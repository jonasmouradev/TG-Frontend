import { VacancyGateway, UpdateVacancyDto } from '@/core/domain/gateways/vacancy.gateway';
import { Vacancy, VacancyStatus, VacancyType, ExperienceLevel } from '@/core/domain/entities';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface UpdateVacancyUseCaseInput {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  type?: VacancyType;
  level?: ExperienceLevel;
  remote?: boolean;
  benefits?: string[];
  requirements?: string[];
  responsibilities?: string[];
  status?: VacancyStatus;
  expirationDate?: Date;
}

export interface UpdateVacancyUseCaseOutput {
  vacancy: Vacancy;
}

export class UpdateVacancyUseCase implements IUseCase<UpdateVacancyUseCaseInput, UpdateVacancyUseCaseOutput> {
  constructor(private vacancyGateway: VacancyGateway) {}

  async execute(input: UpdateVacancyUseCaseInput): Promise<UpdateVacancyUseCaseOutput> {
    const { id, ...updateData } = input;

    const updateVacancyDto: UpdateVacancyDto = {
      title: updateData.title,
      description: updateData.description,
      location: updateData.location,
      salaryMin: updateData.salaryMin,
      salaryMax: updateData.salaryMax,
      currency: updateData.currency,
      type: updateData.type,
      level: updateData.level,
      remote: updateData.remote,
      benefits: updateData.benefits,
      requirements: updateData.requirements,
      responsibilities: updateData.responsibilities,
      status: updateData.status,
      expirationDate: updateData.expirationDate,
    };

    const response = await this.vacancyGateway.update(id, updateVacancyDto);

    if (!response.data) {
      throw new Error('Failed to update vacancy');
    }

    return {
      vacancy: response.data,
    };
  }
}
