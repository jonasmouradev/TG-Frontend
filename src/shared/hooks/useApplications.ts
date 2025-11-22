import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetApplicationsUseCase,
  CreateApplicationUseCase,
  UpdateApplicationStatusUseCase,
} from '@core/application/use-cases';

export function useApplicationCases() {
  const { applicationGateway } = useCase();

  return {
    findAll: new GetApplicationsUseCase(applicationGateway).execute,
    create: new CreateApplicationUseCase(applicationGateway).execute,
    updateStatus: new UpdateApplicationStatusUseCase(applicationGateway).execute,
  };
}
