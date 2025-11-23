import {
  GetVacancyUseCase,
  UpdateVacancyUseCase,
  DeleteVacancyUseCase,
  PublishVacancyUseCase,
  CreateVacancyUseCase,
  GetVacanciesUseCase,
  GetPublishedVacancyUseCase,
  GetBestCandidateUseCase,
  GetBestCandidatesUseCase,
} from '@core/application/use-cases';
import type {
  GetVacancyInput,
  UpdateVacancyInput,
  DeleteVacancyInput,
  PublishVacancyInput,
  CreateVacancyInput,
  GetVacanciesInput,
  GetBestCandidateInput,
  GetBestCandidatesInput,
} from '@core/application/use-cases';
import { useCase } from '@shared/contexts/UseCaseContext';
import { useMemo } from 'react';

export function useVacancyCases() {
  const { vacancyGateway } = useCase();

  const vacancyCases = useMemo(
    () => ({
      findOne: (input: GetVacancyInput) => new GetVacancyUseCase(vacancyGateway).execute(input),
      findAll: (input: GetVacanciesInput) => new GetVacanciesUseCase(vacancyGateway).execute(input),
      create: (input: CreateVacancyInput) => new CreateVacancyUseCase(vacancyGateway).execute(input),
      update: (input: UpdateVacancyInput) => new UpdateVacancyUseCase(vacancyGateway).execute(input),
      delete: (input: DeleteVacancyInput) => new DeleteVacancyUseCase(vacancyGateway).execute(input),
      publish: (input: PublishVacancyInput) => new PublishVacancyUseCase(vacancyGateway).execute(input),
      getPublished: () => new GetPublishedVacancyUseCase(vacancyGateway).execute(),
      getBestCandidate: (input: GetBestCandidateInput) => new GetBestCandidateUseCase(vacancyGateway).execute(input),
      getBestCandidates: (input: GetBestCandidatesInput) => new GetBestCandidatesUseCase(vacancyGateway).execute(input),
    }),
    [vacancyGateway],
  );

  return vacancyCases;
}
