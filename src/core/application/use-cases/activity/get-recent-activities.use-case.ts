import { ActivityGateway } from '@/core/domain/gateways/activity.gateway';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface GetRecentActivitiesUseCaseInput {
  limit?: number;
  companyId?: string;
}

export interface GetRecentActivitiesUseCaseOutput {
  activities: Array<{
    id: string;
    message: string;
    type: 'application' | 'process_stage' | 'test_completion' | 'other';
    processId?: string;
    candidateId?: string;
    timestamp: string;
  }>;
  totalCount: number;
}

export class GetRecentActivitiesUseCase
  implements IUseCase<GetRecentActivitiesUseCaseInput, GetRecentActivitiesUseCaseOutput>
{
  constructor(private activityGateway: ActivityGateway) {}

  async execute(input: GetRecentActivitiesUseCaseInput): Promise<GetRecentActivitiesUseCaseOutput> {
    const response = await this.activityGateway.getRecentActivities({
      limit: input.limit || 10,
      companyId: input.companyId,
    });

    if (!response.data) {
      throw new Error('Failed to get recent activities');
    }

    return {
      activities: response.data.activities,
      totalCount: response.data.totalCount,
    };
  }
}
