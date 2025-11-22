import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetDashboardStatsUseCase,
  GetCompanyStatsUseCase,
  GetRecentApplicationsUseCase,
} from '@core/application/use-cases';

export function useDashboardCases() {
  const { dashboardGateway } = useCase();

  return {
    getStats: new GetDashboardStatsUseCase(dashboardGateway).execute,
    getTopVacancies: new GetCompanyStatsUseCase(dashboardGateway).execute,
    getRecentApplications: new GetRecentApplicationsUseCase(dashboardGateway).execute,
    getApplicationsByStatus: dashboardGateway.getApplicationsByStatus,
    getMonthlyApplications: dashboardGateway.getMonthlyApplications,
  };
}
