import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetProcessTemplatesUseCase,
  CreateProcessTemplateUseCase,
  GetDefaultTemplatesUseCase,
} from '@core/application/use-cases';

export function useTemplateCases() {
  const { templateGateway } = useCase();

  return {
    getProcess: new GetProcessTemplatesUseCase(templateGateway).execute,
    getDefault: new GetDefaultTemplatesUseCase(templateGateway).execute,
    createProcess: new CreateProcessTemplateUseCase(templateGateway).execute,
  };
}
