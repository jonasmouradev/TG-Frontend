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
  GetVacancyOutput,
  GetVacanciesOutput,
  GetPublishedVacancyOutput,
  GetBestCandidateOutput,
  GetBestCandidatesOutput,
} from '@core/application/use-cases';
import { useCase } from '@shared/contexts/UseCaseContext';
import { QueryHookOptions } from '@shared/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useVacancyCases() {
  const { vacancyGateway } = useCase();

  const cases = useMemo(
    () => ({
      create: (input: CreateVacancyInput) => new CreateVacancyUseCase(vacancyGateway).execute(input),
      update: (input: UpdateVacancyInput) => new UpdateVacancyUseCase(vacancyGateway).execute(input),
      delete: (input: DeleteVacancyInput) => new DeleteVacancyUseCase(vacancyGateway).execute(input),
      publish: (input: PublishVacancyInput) => new PublishVacancyUseCase(vacancyGateway).execute(input),
    }),
    [vacancyGateway],
  );

  function useGetVacancy({ input, ...options }: QueryHookOptions<GetVacancyInput, GetVacancyOutput>) {
    return useQuery({
      queryKey: GetVacancyUseCase.queryKey(input),
      queryFn: () => new GetVacancyUseCase(vacancyGateway).execute(input),
      ...options,
    });
  }

  function useGetVacancies({ input, ...options }: QueryHookOptions<GetVacanciesInput, GetVacanciesOutput>) {
    return useQuery({
      queryKey: GetVacanciesUseCase.queryKey(input || {}),
      queryFn: () => new GetVacanciesUseCase(vacancyGateway).execute(input || {}),
      ...options,
    });
  }

  function useGetPublishedVacancy({ ...options }: QueryHookOptions<void, GetPublishedVacancyOutput>) {
    return useQuery({
      queryKey: GetPublishedVacancyUseCase.queryKey(),
      queryFn: () => new GetPublishedVacancyUseCase(vacancyGateway).execute(),
      ...options,
    });
  }

  function useGetBestCandidate({ input, ...options }: QueryHookOptions<GetBestCandidateInput, GetBestCandidateOutput>) {
    return useQuery({
      queryKey: GetBestCandidateUseCase.queryKey(input),
      queryFn: () => new GetBestCandidateUseCase(vacancyGateway).execute(input),
      ...options,
    });
  }

  function useGetBestCandidates({
    input,
    ...options
  }: QueryHookOptions<GetBestCandidatesInput, GetBestCandidatesOutput>) {
    return useQuery({
      queryKey: GetBestCandidatesUseCase.queryKey(input),
      queryFn: () => new GetBestCandidatesUseCase(vacancyGateway).execute(input),
      ...options,
    });
  }

  return {
    ...cases,
    useGetVacancy,
    useGetVacancies,
    useGetPublishedVacancy,
    useGetBestCandidate,
    useGetBestCandidates,
  };
}
