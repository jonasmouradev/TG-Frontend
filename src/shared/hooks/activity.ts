import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetRecentActivitiesUseCase,
  GetRecentActivitiesUseCaseInput,
  GetRecentActivitiesUseCaseOutput,
  GetRecruitmentProcessesUseCase,
  GetRecruitmentProcessesUseCaseInput,
  GetRecruitmentProcessesUseCaseOutput,
} from '@core/application/use-cases';
import { useQuery } from '@tanstack/react-query';
import { QueryHookOptions } from '..';

export function useActivityCases() {
  const { activityGateway } = useCase();

  function useGetRecentActivities({
    input,
    ...options
  }: QueryHookOptions<GetRecentActivitiesUseCaseInput, GetRecentActivitiesUseCaseOutput>) {
    return useQuery({
      queryKey: GetRecentActivitiesUseCase.queryKey(input || {}),
      queryFn: () => new GetRecentActivitiesUseCase(activityGateway).execute(input || {}),
      ...options,
    });
  }

  function useGetRecruitmentProcesses({
    input,
    ...options
  }: QueryHookOptions<GetRecruitmentProcessesUseCaseInput, GetRecruitmentProcessesUseCaseOutput>) {
    return useQuery({
      queryKey: GetRecruitmentProcessesUseCase.queryKey(input),
      queryFn: () => new GetRecruitmentProcessesUseCase(activityGateway).execute(input),
      ...options,
    });
  }

  return {
    useGetRecentActivities,
    useGetRecruitmentProcesses,
  };
}
