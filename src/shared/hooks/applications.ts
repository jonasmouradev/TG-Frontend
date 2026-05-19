import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetApplicationsUseCase,
  CreateApplicationUseCase,
  UpdateApplicationStatusUseCase,
  GetApplicationsUseCaseInput,
  CreateApplicationUseCaseInput,
  UpdateApplicationStatusUseCaseInput,
  GetApplicationsUseCaseOutput,
} from '@core/application/use-cases';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryHookOptions } from '..';

export function useApplicationCases() {
  const { applicationGateway } = useCase();

  function useGetApplications({
    input,
    ...options
  }: QueryHookOptions<GetApplicationsUseCaseInput, GetApplicationsUseCaseOutput>) {
    return useQuery({
      queryKey: GetApplicationsUseCase.queryKey(input || {}),
      queryFn: () => new GetApplicationsUseCase(applicationGateway).execute(input),
      ...options,
    });
  }

  const cases = useMemo(
    () => ({
      create: (input: CreateApplicationUseCaseInput) => new CreateApplicationUseCase(applicationGateway).execute(input),
      updateStatus: (input: UpdateApplicationStatusUseCaseInput) =>
        new UpdateApplicationStatusUseCase(applicationGateway).execute(input),
    }),
    [applicationGateway],
  );
  return {
    ...cases,
    useGetApplications,
  };
}
