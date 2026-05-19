import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetStepsUseCase,
  CreateStepUseCase,
  UpdateStepUseCase,
  DeleteStepUseCase,
  ReorderStepsUseCase,
  CreateStepUseCaseInput,
  UpdateStepUseCaseInput,
  GetStepsUseCaseInput,
  ReorderStepsUseCaseInput,
  GetStepsUseCaseOutput,
} from '@core/application/use-cases';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryHookOptions } from '@shared/types';

export function useStepCases() {
  const { stepGateway } = useCase();

  const cases = useMemo(
    () => ({
      create: (input: CreateStepUseCaseInput) => new CreateStepUseCase(stepGateway).execute(input),
      update: (input: UpdateStepUseCaseInput) => new UpdateStepUseCase(stepGateway).execute(input),
      delete: (input: { id: string }) => new DeleteStepUseCase(stepGateway).execute(input),
      reorder: (input: ReorderStepsUseCaseInput) => new ReorderStepsUseCase(stepGateway).execute(input),
    }),
    [stepGateway],
  );

  function useGetSteps({ input, ...options }: QueryHookOptions<GetStepsUseCaseInput, GetStepsUseCaseOutput>) {
    return useQuery({
      queryKey: GetStepsUseCase.queryKey(input || {}),
      queryFn: () => new GetStepsUseCase(stepGateway).execute(input || {}),
      ...options,
    });
  }

  return {
    ...cases,
    useGetSteps,
  };
}
