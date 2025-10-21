import { ActivityGateway, ProcessFilters } from '@/core/domain/gateways/activity.gateway';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface GetRecruitmentProcessesUseCaseInput {
  status?: 'open' | 'closed' | 'all';
  companyId?: string;
  recruiterId?: string;
  limit?: number;
  offset?: number;
}

export interface GetRecruitmentProcessesUseCaseOutput {
  processes: Array<{
    id: string;
    title: string;
    stage: string;
    recruiter: string;
    startDate: string;
    endDate?: string;
    status: 'open' | 'closed';
    vacancyId?: string;
    companyId?: string;
  }>;
  totalCount: number;
}

export class GetRecruitmentProcessesUseCase
  implements IUseCase<GetRecruitmentProcessesUseCaseInput, GetRecruitmentProcessesUseCaseOutput>
{
  constructor(private activityGateway: ActivityGateway) {}

  async execute(input: GetRecruitmentProcessesUseCaseInput): Promise<GetRecruitmentProcessesUseCaseOutput> {
    const filters: ProcessFilters = {
      status: input.status || 'all',
      companyId: input.companyId,
      recruiterId: input.recruiterId,
      limit: input.limit || 50,
      offset: input.offset || 0,
    };

    const response = await this.activityGateway.getRecruitmentProcesses(filters);

    if (!response.data) {
      throw new Error('Failed to get recruitment processes');
    }

    return {
      processes: response.data.processes,
      totalCount: response.data.totalCount,
    };
  }
}
