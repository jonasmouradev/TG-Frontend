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
  GetCompetencesUseCaseOutput,
  GetCompetenceByIdUseCaseOutput,
} from '@core/application/use-cases';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryHookOptions } from '..';

export function useCompetenceCases() {
  const { competenceGateway } = useCase();

  const cases = useMemo(
    () => ({
      create: (input: CreateCompetenceUseCaseInput) => new CreateCompetenceUseCase(competenceGateway).execute(input),
      update: (input: UpdateCompetenceUseCaseInput) => new UpdateCompetenceUseCase(competenceGateway).execute(input),
      delete: (input: DeleteCompetenceUseCaseInput) => new DeleteCompetenceUseCase(competenceGateway).execute(input),
    }),
    [competenceGateway],
  );

  function useGetCompetences({
    input,
    ...options
  }: QueryHookOptions<GetCompetencesUseCaseInput, GetCompetencesUseCaseOutput>) {
    return useQuery({
      queryKey: GetCompetencesUseCase.queryKey(input || {}),
      queryFn: () => new GetCompetencesUseCase(competenceGateway).execute(input),
      ...options,
    });
  }

  function useGetCompetenceById({
    input,
    ...options
  }: QueryHookOptions<GetCompetenceByIdUseCaseInput, GetCompetenceByIdUseCaseOutput>) {
    return useQuery({
      queryKey: GetCompetenceByIdUseCase.queryKey(input),
      queryFn: () => new GetCompetenceByIdUseCase(competenceGateway).execute(input),
      ...options,
    });
  }

  return {
    ...cases,
    useGetCompetences,
    useGetCompetenceById,
  };
}
