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
} from '@core/application/use-cases';
import { useCase } from '@shared/contexts/UseCaseContext';
import { useMemo } from 'react';

export function useMatchingCases() {
  const { matchGateway } = useCase();

  return useMemo(
    () => ({
      getForVacancy: (input: GetForVacancyInput) => new GetForVacancyUseCase(matchGateway).execute(input),
      getForPerson: (input: GetForPersonInput) => new GetForPersonUseCase(matchGateway).execute(input),
      recalculate: (input: RecalculateInput) => new RecalculateUseCase(matchGateway).execute(input),
      getBestForVacancy: (input: GetBestForVacancyInput) => new GetBestForVacancyUseCase(matchGateway).execute(input),
      calculate: (input: CalculateInput) => new CalculateUseCase(matchGateway).execute(input),
    }),
    [matchGateway],
  );
}
