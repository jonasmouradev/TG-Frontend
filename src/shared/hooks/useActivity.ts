import { useCase } from '@shared/contexts/UseCaseContext';
import { GetRecentActivitiesUseCase, GetRecruitmentProcessesUseCase } from '@core/application/use-cases';

export function useActivityCases() {
  const { activityGateway } = useCase();

  return {
    getRecent: new GetRecentActivitiesUseCase(activityGateway).execute,
    getRecruitmentProcesses: new GetRecruitmentProcessesUseCase(activityGateway).execute,
  };
}
