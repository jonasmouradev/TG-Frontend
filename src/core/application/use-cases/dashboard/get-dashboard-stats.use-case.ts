import {
  DashboardGateway,
  DashboardStats,
  DashboardFilters,
  PeriodFilter,
} from '@/core/domain/gateways/dashboard.gateway';
import { IUseCase } from '@/core/domain/use-case.interface';

export interface GetDashboardStatsUseCaseInput {
  dateFrom?: string;
  dateTo?: string;
  period?: PeriodFilter;
}

export interface GetDashboardStatsUseCaseOutput {
  stats: DashboardStats;
}

export class GetDashboardStatsUseCase
  implements IUseCase<GetDashboardStatsUseCaseInput, GetDashboardStatsUseCaseOutput>
{
  constructor(private dashboardGateway: DashboardGateway) {}

  async execute(input: GetDashboardStatsUseCaseInput): Promise<GetDashboardStatsUseCaseOutput> {
    const filters: DashboardFilters = {
      dateFrom: input.dateFrom,
      dateTo: input.dateTo,
      period: input.period,
    };

    const response = await this.dashboardGateway.findGeneralStats(filters);

    if (!response.data) {
      throw new Error('Failed to get dashboard statistics');
    }

    return {
      stats: response.data,
    };
  }
}
