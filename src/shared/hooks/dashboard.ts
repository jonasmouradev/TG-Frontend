import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetDashboardStatsUseCase,
  GetRecentApplicationsUseCase,
  GetDashboardStatsUseCaseInput,
  GetRecentApplicationsUseCaseInput,
  GetDashboardStatsUseCaseOutput,
  GetRecentApplicationsUseCaseOutput,
} from '@core/application/use-cases';
import { useQuery } from '@tanstack/react-query';
import { QueryHookOptions } from '@shared/types';

export function useDashboardCases() {
  const { dashboardGateway } = useCase();

  const dashboardStatsUseCase = new GetDashboardStatsUseCase(dashboardGateway);

  function useGetDashboardStats({
    input,
    ...options
  }: QueryHookOptions<GetDashboardStatsUseCaseInput, GetDashboardStatsUseCaseOutput>) {
    return useQuery<GetDashboardStatsUseCaseOutput>({
      queryKey: GetDashboardStatsUseCase.queryKey(input || {}),
      queryFn: () => dashboardStatsUseCase.execute(input || {}),
      ...options,
    });
  }

  function useGetRecentApplications({
    input,
    ...options
  }: QueryHookOptions<GetRecentApplicationsUseCaseInput, GetRecentApplicationsUseCaseOutput>) {
    return useQuery({
      queryKey: GetRecentApplicationsUseCase.queryKey(input || {}),
      queryFn: () => new GetRecentApplicationsUseCase(dashboardGateway).execute(input || {}),
      ...options,
    });
  }

  return {
    useGetDashboardStats,
    useGetRecentApplications,
  };
}
