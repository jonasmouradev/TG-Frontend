import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetRecentActivitiesUseCase,
  GetRecentActivitiesUseCaseInput,
  GetRecruitmentProcessesUseCase,
  GetRecruitmentProcessesUseCaseInput,
} from '@core/application/use-cases';
import { useMemo } from 'react';

export function useActivityCases() {
  const { activityGateway } = useCase();

  return useMemo(
    () => ({
      getRecent: (input?: GetRecentActivitiesUseCaseInput) =>
        new GetRecentActivitiesUseCase(activityGateway).execute(input || {}),
      getRecruitmentProcesses: (input: GetRecruitmentProcessesUseCaseInput) =>
        new GetRecruitmentProcessesUseCase(activityGateway).execute(input),
    }),
    [activityGateway],
  );
}
