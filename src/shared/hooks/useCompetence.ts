import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetCompetencesUseCase,
  GetCompetenceByIdUseCase,
  CreateCompetenceUseCase,
  UpdateCompetenceUseCase,
  DeleteCompetenceUseCase,
  GetCompetenceByIdUseCaseInput,
  GetCompetencesUseCaseInput,
  CreateCompetenceUseCaseInput,
  UpdateCompetenceUseCaseInput,
  DeleteCompetenceUseCaseInput,
} from '@core/application/use-cases';
import { useMemo } from 'react';

export function useCompetenceCases() {
  const { competenceGateway } = useCase();

  return useMemo(
    () => ({
      findAll: (input?: GetCompetencesUseCaseInput) => new GetCompetencesUseCase(competenceGateway).execute(input),
      findOne: (input: GetCompetenceByIdUseCaseInput) => new GetCompetenceByIdUseCase(competenceGateway).execute(input),
      create: (input: CreateCompetenceUseCaseInput) => new CreateCompetenceUseCase(competenceGateway).execute(input),
      update: (input: UpdateCompetenceUseCaseInput) => new UpdateCompetenceUseCase(competenceGateway).execute(input),
      delete: (input: DeleteCompetenceUseCaseInput) => new DeleteCompetenceUseCase(competenceGateway).execute(input),
    }),
    [competenceGateway],
  );
}
