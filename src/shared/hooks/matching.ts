import {
  CalculateUseCase,
  GetBestForVacancyUseCase,
  GetForPersonUseCase,
  GetForVacancyUseCase,
  RecalculateUseCase,
} from '@core/application/use-cases';
import type {
  GetBestForVacancyInput,
  GetForPersonInput,
  GetForVacancyInput,
  RecalculateInput,
  CalculateInput,
  GetForVacancyOutput,
  GetForPersonOutput,
  GetBestForVacancyOutput,
} from '@core/application/use-cases';
import { useCase } from '@shared/contexts/UseCaseContext';
import { QueryHookOptions } from '@shared/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useMatchingCases() {
  const { matchGateway } = useCase();

  const cases = useMemo(
    () => ({
      recalculate: (input: RecalculateInput) => new RecalculateUseCase(matchGateway).execute(input),
      calculate: (input: CalculateInput) => new CalculateUseCase(matchGateway).execute(input),
    }),
    [matchGateway],
  );

  function useGetForVacancy({ input, ...options }: QueryHookOptions<GetForVacancyInput, GetForVacancyOutput>) {
    return useQuery({
      queryKey: GetForVacancyUseCase.queryKey(input),
      queryFn: () => new GetForVacancyUseCase(matchGateway).execute(input),
      ...options,
    });
  }

  function useGetForPerson({ input, ...options }: QueryHookOptions<GetForPersonInput, GetForPersonOutput>) {
    return useQuery({
      queryKey: GetForPersonUseCase.queryKey(input),
      queryFn: () => new GetForPersonUseCase(matchGateway).execute(input),
      ...options,
    });
  }

  function useGetBestForVacancy({
    input,
    ...options
  }: QueryHookOptions<GetBestForVacancyInput, GetBestForVacancyOutput>) {
    return useQuery({
      queryKey: GetBestForVacancyUseCase.queryKey(input),
      queryFn: () => new GetBestForVacancyUseCase(matchGateway).execute(input),
      ...options,
    });
  }

  return {
    ...cases,
    useGetForVacancy,
    useGetForPerson,
    useGetBestForVacancy,
  };
}
