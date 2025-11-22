import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetStepsUseCase,
  CreateStepUseCase,
  UpdateStepUseCase,
  DeleteStepUseCase,
  ReorderStepsUseCase,
} from '@core/application/use-cases';

export function useStepCases() {
  const { stepGateway } = useCase();

  return {
    findAll: new GetStepsUseCase(stepGateway).execute,
    create: new CreateStepUseCase(stepGateway).execute,
    update: new UpdateStepUseCase(stepGateway).execute,
    delete: new DeleteStepUseCase(stepGateway).execute,
    reorder: new ReorderStepsUseCase(stepGateway).execute,
  };
}
