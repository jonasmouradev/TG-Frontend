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
} from '@core/application/use-cases';
import { useMemo } from 'react';

export function useStepCases() {
  const { stepGateway } = useCase();

  const stepCases = useMemo(
    () => ({
      findAll: (input: GetStepsUseCaseInput) => new GetStepsUseCase(stepGateway).execute(input),
      create: (input: CreateStepUseCaseInput) => new CreateStepUseCase(stepGateway).execute(input),
      update: (input: UpdateStepUseCaseInput) => new UpdateStepUseCase(stepGateway).execute(input),
      delete: (input: { id: string }) => new DeleteStepUseCase(stepGateway).execute(input),
      reorder: (input: ReorderStepsUseCaseInput) => new ReorderStepsUseCase(stepGateway).execute(input),
    }),
    [stepGateway],
  );

  return stepCases;
}
