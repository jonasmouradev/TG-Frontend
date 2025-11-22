import {
  DashboardGateway,
  DashboardStats,
  DashboardFilters,
  PeriodFilter,
} from '@core/domain/gateways/dashboard.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetCompanyStatsUseCaseInput {
  dateFrom?: string;
  dateTo?: string;
  period?: PeriodFilter;
}

export interface GetCompanyStatsUseCaseOutput {
  stats: DashboardStats;
}

export class GetCompanyStatsUseCase implements IUseCase<GetCompanyStatsUseCaseInput, GetCompanyStatsUseCaseOutput> {
  constructor(private readonly gateway: DashboardGateway) {}

  async execute(input?: GetCompanyStatsUseCaseInput): Promise<GetCompanyStatsUseCaseOutput> {
    const filters: DashboardFilters = {
      dateFrom: input?.dateFrom,
      dateTo: input?.dateTo,
      period: input?.period,
    };

    const response = await this.gateway.getCompanyStats(filters);

    if (!response.data) {
      throw new Error('Failed to get company statistics');
    }

    return {
      stats: response.data,
    };
  }
}
