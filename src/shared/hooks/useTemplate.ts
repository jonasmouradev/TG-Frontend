import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetProcessTemplatesUseCase,
  CreateProcessTemplateUseCase,
  GetDefaultTemplatesUseCase,
  CreateProcessTemplateUseCaseInput,
} from '@core/application/use-cases';
import { useMemo } from 'react';

export function useTemplateCases() {
  const container = useCase();

  if (!container) {
    throw new Error('useTemplateCases must be used within UseCaseContext.Provider');
  }

  const { templateGateway } = container;

  const templateCases = useMemo(
    () => ({
      getProcess: (input?: {
        companyId?: string;
        category?: string;
        isDefault?: boolean;
        search?: string;
        limit?: number;
        offset?: number;
      }) => new GetProcessTemplatesUseCase(templateGateway).execute(input || {}),
      getDefault: () => new GetDefaultTemplatesUseCase(templateGateway).execute(),
      createProcess: (input: CreateProcessTemplateUseCaseInput) =>
        new CreateProcessTemplateUseCase(templateGateway).execute(input),
    }),
    [templateGateway],
  );

  return templateCases;
}
