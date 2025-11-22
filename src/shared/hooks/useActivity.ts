import { useCase } from '@shared/contexts/UseCaseContext';
import { GetRecentActivitiesUseCase, GetRecruitmentProcessesUseCase } from '@core/application/use-cases';
import { useMemo } from 'react';

export function useActivityCases() {
  const container = useCase();

  if (!container) {
    throw new Error('useActivityCases must be used within UseCaseContext.Provider');
  }

  const { activityGateway } = container;

  const activityCases = useMemo(
    () => ({
      getRecent: (input?: { limit?: number; companyId?: string }) =>
        new GetRecentActivitiesUseCase(activityGateway).execute(input || {}),
      getRecruitmentProcesses: (input: {
        companyId?: string;
        status?: 'open' | 'closed' | 'all';
        limit?: number;
        offset?: number;
      }) => new GetRecruitmentProcessesUseCase(activityGateway).execute(input),
    }),
    [activityGateway],
  );

  return activityCases;
}
