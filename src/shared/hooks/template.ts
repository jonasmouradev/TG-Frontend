import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetProcessTemplatesUseCase,
  CreateProcessTemplateUseCase,
  GetDefaultTemplatesUseCase,
  CreateProcessTemplateUseCaseInput,
  GetProcessTemplatesUseCaseOutput,
  GetProcessTemplatesUseCaseInput,
  GetDefaultTemplatesUseCaseOutput,
} from '@core/application/use-cases';
import { useMemo } from 'react';
import { QueryHookOptions } from '@shared/types';
import { useQuery } from '@tanstack/react-query';

export function useTemplateCases() {
  const { templateGateway } = useCase();

  const cases = useMemo(
    () => ({
      createProcess: (input: CreateProcessTemplateUseCaseInput) =>
        new CreateProcessTemplateUseCase(templateGateway).execute(input),
    }),
    [templateGateway],
  );

  function useGetProcessTemplates({
    input,
    ...options
  }: QueryHookOptions<GetProcessTemplatesUseCaseInput, GetProcessTemplatesUseCaseOutput>) {
    return useQuery({
      queryKey: GetProcessTemplatesUseCase.queryKey(input || {}),
      queryFn: () => new GetProcessTemplatesUseCase(templateGateway).execute(input),
      ...options,
    });
  }

  function useGetDefaultTemplates({ ...options }: QueryHookOptions<void, GetDefaultTemplatesUseCaseOutput>) {
    return useQuery({
      queryKey: GetDefaultTemplatesUseCase.queryKey(),
      queryFn: () => new GetDefaultTemplatesUseCase(templateGateway).execute(),
      ...options,
    });
  }

  return {
    ...cases,
    useGetProcessTemplates,
    useGetDefaultTemplates,
  };
}
