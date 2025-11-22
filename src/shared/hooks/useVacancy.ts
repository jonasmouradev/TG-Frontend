import {
  GetVacancyUseCase,
  UpdateVacancyUseCase,
  DeleteVacancyUseCase,
  PublishVacancyUseCase,
  CreateVacancyUseCase,
  GetVacanciesUseCase,
  GetPublishedVacancyUseCase,
} from '@core/application/use-cases';
import { useCase } from '@shared/contexts/UseCaseContext';

export function useVacancyCases() {
  const { vacancyGateway } = useCase();

  return {
    findOne: new GetVacancyUseCase(vacancyGateway).execute,
    findAll: new GetVacanciesUseCase(vacancyGateway).execute,
    create: new CreateVacancyUseCase(vacancyGateway).execute,
    update: new UpdateVacancyUseCase(vacancyGateway).execute,
    delete: new DeleteVacancyUseCase(vacancyGateway).execute,
    publish: new PublishVacancyUseCase(vacancyGateway).execute,
    getPublished: new GetPublishedVacancyUseCase(vacancyGateway).execute,
  };
}
