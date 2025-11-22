import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetDashboardStatsUseCase,
  GetRecentApplicationsUseCase,
  GetDashboardStatsUseCaseInput,
  GetRecentApplicationsUseCaseInput,
} from '@core/application/use-cases';
import { useMemo } from 'react';

export function useDashboardCases() {
  const { dashboardGateway } = useCase();

  return useMemo(
    () => ({
      getStats: (input?: GetDashboardStatsUseCaseInput) =>
        new GetDashboardStatsUseCase(dashboardGateway).execute(input),
      getRecentApplications: (input?: GetRecentApplicationsUseCaseInput) =>
        new GetRecentApplicationsUseCase(dashboardGateway).execute(input),
      getApplicationsByStatus: dashboardGateway.getApplicationsByStatus,
      getMonthlyApplications: dashboardGateway.getMonthlyApplications,
    }),
    [dashboardGateway],
  );
}
