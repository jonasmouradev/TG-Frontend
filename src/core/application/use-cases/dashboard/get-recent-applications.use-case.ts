import { DashboardGateway } from '@core/domain/gateways/dashboard.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetRecentApplicationsUseCaseInput {
  limit?: number;
  companyId?: string;
}

export interface GetRecentApplicationsUseCaseOutput {
  applications: Array<{
    id: string;
    applicantName: string;
    vacancyTitle: string;
    companyName: string;
    status: string;
    appliedAt: Date;
  }>;
}

export class GetRecentApplicationsUseCase
  implements IUseCase<GetRecentApplicationsUseCaseInput, GetRecentApplicationsUseCaseOutput>
{
  constructor(private readonly gateway: DashboardGateway) {}

  async execute(input?: GetRecentApplicationsUseCaseInput): Promise<GetRecentApplicationsUseCaseOutput> {
    const response = await this.gateway.getRecentApplications(input?.limit, input?.companyId);

    if (!response.data) {
      throw new Error('Failed to get recent applications');
    }

    return {
      applications: response.data,
    };
  }
}
