import { ApplicationGateway } from '@/core/domain/gateways/application.gateway';
import { Application, ApplicationStatus } from '@/core/domain/entities';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface UpdateApplicationStatusUseCaseInput {
  id: string;
  status: ApplicationStatus;
}

export interface UpdateApplicationStatusUseCaseOutput {
  application: Application;
}

export class UpdateApplicationStatusUseCase
  implements IUseCase<UpdateApplicationStatusUseCaseInput, UpdateApplicationStatusUseCaseOutput>
{
  constructor(private applicationGateway: ApplicationGateway) {}

  async execute(input: UpdateApplicationStatusUseCaseInput): Promise<UpdateApplicationStatusUseCaseOutput> {
    const response = await this.applicationGateway.updateStatus(input.id, {
      status: input.status,
    });

    if (!response.data) {
      throw new Error('Failed to update application status');
    }

    return {
      application: response.data,
    };
  }
}
