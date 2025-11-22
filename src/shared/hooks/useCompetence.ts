import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetCompetencesUseCase,
  GetCompetenceByIdUseCase,
  CreateCompetenceUseCase,
  UpdateCompetenceUseCase,
  DeleteCompetenceUseCase,
} from '@core/application/use-cases';

export function useCompetenceCases() {
  const { competenceGateway } = useCase();

  return {
    findAll: new GetCompetencesUseCase(competenceGateway).execute,
    findOne: new GetCompetenceByIdUseCase(competenceGateway).execute,
    create: new CreateCompetenceUseCase(competenceGateway).execute,
    update: new UpdateCompetenceUseCase(competenceGateway).execute,
    delete: new DeleteCompetenceUseCase(competenceGateway).execute,
  };
}
