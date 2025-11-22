import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetApplicationsUseCase,
  CreateApplicationUseCase,
  UpdateApplicationStatusUseCase,
  GetApplicationsUseCaseInput,
  CreateApplicationUseCaseInput,
  UpdateApplicationStatusUseCaseInput,
} from '@core/application/use-cases';
import { useMemo } from 'react';

export function useApplicationCases() {
  const container = useCase();

  if (!container) {
    throw new Error('useApplicationCases must be used within UseCaseContext.Provider');
  }

  const { applicationGateway } = container;

  const applicationCases = useMemo(
    () => ({
      findAll: (input?: GetApplicationsUseCaseInput) => new GetApplicationsUseCase(applicationGateway).execute(input),
      create: (input: CreateApplicationUseCaseInput) => new CreateApplicationUseCase(applicationGateway).execute(input),
      updateStatus: (input: UpdateApplicationStatusUseCaseInput) =>
        new UpdateApplicationStatusUseCase(applicationGateway).execute(input),
    }),
    [applicationGateway],
  );

  return applicationCases;
}
