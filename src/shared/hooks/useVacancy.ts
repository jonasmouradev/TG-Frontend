import {
  GetVacancyUseCase,
  UpdateVacancyUseCase,
  DeleteVacancyUseCase,
  PublishVacancyUseCase,
  CreateVacancyUseCase,
  GetVacanciesUseCase,
  GetPublishedVacancyUseCase,
  GetVacancyUseCaseInput,
  UpdateVacancyUseCaseInput,
  DeleteVacancyUseCaseInput,
  PublishVacancyUseCaseInput,
  CreateVacancyUseCaseInput,
  GetVacanciesUseCaseInput,
} from '@core/application/use-cases';
import { useCase } from '@shared/contexts/UseCaseContext';
import { useMemo } from 'react';

export function useVacancyCases() {
  const container = useCase();

  if (!container) {
    throw new Error('useVacancyCases must be used within UseCaseContext.Provider');
  }

  const { vacancyGateway } = container;

  const vacancyCases = useMemo(
    () => ({
      findOne: (input: GetVacancyUseCaseInput) => new GetVacancyUseCase(vacancyGateway).execute(input),
      findAll: (input: GetVacanciesUseCaseInput) => new GetVacanciesUseCase(vacancyGateway).execute(input),
      create: (input: CreateVacancyUseCaseInput) => new CreateVacancyUseCase(vacancyGateway).execute(input),
      update: (input: UpdateVacancyUseCaseInput) => new UpdateVacancyUseCase(vacancyGateway).execute(input),
      delete: (input: DeleteVacancyUseCaseInput) => new DeleteVacancyUseCase(vacancyGateway).execute(input),
      publish: (input: PublishVacancyUseCaseInput) => new PublishVacancyUseCase(vacancyGateway).execute(input),
      getPublished: () => new GetPublishedVacancyUseCase(vacancyGateway).execute(),
    }),
    [vacancyGateway],
  );

  return vacancyCases;
}
