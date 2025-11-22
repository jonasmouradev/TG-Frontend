import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetDashboardStatsUseCase,
  GetCompanyStatsUseCase,
  GetRecentApplicationsUseCase,
  GetDashboardStatsUseCaseInput,
  GetCompanyStatsUseCaseInput,
  GetRecentApplicationsUseCaseInput,
} from '@core/application/use-cases';
import { useMemo } from 'react';

export function useDashboardCases() {
  const container = useCase();

  if (!container) {
    throw new Error('useDashboardCases must be used within UseCaseContext.Provider');
  }

  const { dashboardGateway } = container;

  const dashboardCases = useMemo(
    () => ({
      getStats: (input?: GetDashboardStatsUseCaseInput) =>
        new GetDashboardStatsUseCase(dashboardGateway).execute(input),
      getTopVacancies: (input: GetCompanyStatsUseCaseInput) =>
        new GetCompanyStatsUseCase(dashboardGateway).execute(input),
      getRecentApplications: (input?: GetRecentApplicationsUseCaseInput) =>
        new GetRecentApplicationsUseCase(dashboardGateway).execute(input),
      getApplicationsByStatus: dashboardGateway.getApplicationsByStatus,
      getMonthlyApplications: dashboardGateway.getMonthlyApplications,
    }),
    [dashboardGateway],
  );

  return dashboardCases;
}
