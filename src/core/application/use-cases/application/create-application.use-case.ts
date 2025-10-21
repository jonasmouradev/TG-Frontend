import { ApplicationGateway, CreateApplicationDto } from '@core/domain/gateways/application.gateway';
import { Application } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface CreateApplicationUseCaseInput {
  vacancyId: string;
  applicantId: string;
  resumeUrl: string;
  coverLetter?: string;
}

export interface CreateApplicationUseCaseOutput {
  application: Application;
}

export class CreateApplicationUseCase
  implements IUseCase<CreateApplicationUseCaseInput, CreateApplicationUseCaseOutput>
{
  constructor(private applicationGateway: ApplicationGateway) {}

  async execute(input: CreateApplicationUseCaseInput): Promise<CreateApplicationUseCaseOutput> {
    const createApplicationDto: CreateApplicationDto = {
      applicantId: input.applicantId,
      vacancyId: input.vacancyId,
      resumeUrl: input.resumeUrl,
      coverLetter: input.coverLetter,
    };

    const response = await this.applicationGateway.create(input.vacancyId, createApplicationDto);

    if (!response.data) {
      throw new Error('Failed to create application');
    }

    return {
      application: response.data,
    };
  }
}
