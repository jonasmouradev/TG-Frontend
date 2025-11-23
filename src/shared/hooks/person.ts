import { useCase } from '@shared/contexts/UseCaseContext';
import {
  GetPersonUseCase,
  CreatePersonUseCase,
  UpdatePersonUseCase,
  GetPersonInput,
  CreatePersonInput,
  UpdatePersonInput,
  AddCompetenceToPersonInput,
  RemoveCompetenceFromPersonInput,
  AddCompetenceToPersonUseCase,
  RemoveCompetenceFromPersonUseCase,
  RemoveWorkExperienceFromPersonInput,
  RemoveWorkExperienceFromPersonUseCase,
  AddWorkToPersonInput,
  AddWorkToPersonUseCase,
  AddEducationToPersonInput,
  AddEducationToPersonUseCase,
  RemoveEducationFromPersonInput,
  RemoveEducationFromPersonUseCase,
} from '@core/application/use-cases';
import { useMemo } from 'react';

export function useCompetenceCases() {
  const { personGateway } = useCase();

  return useMemo(
    () => ({
      findOne: (input: GetPersonInput) => new GetPersonUseCase(personGateway).execute(input),
      create: (input: CreatePersonInput) => new CreatePersonUseCase(personGateway).execute(input),
      update: (input: UpdatePersonInput) => new UpdatePersonUseCase(personGateway).execute(input),
      addCompetence: (input: AddCompetenceToPersonInput) =>
        new AddCompetenceToPersonUseCase(personGateway).execute(input),
      removeCompetence: (input: RemoveCompetenceFromPersonInput) =>
        new RemoveCompetenceFromPersonUseCase(personGateway).execute(input),
      addWorkExperience: (input: AddWorkToPersonInput) => new AddWorkToPersonUseCase(personGateway).execute(input),
      removeWorkExperience: (input: RemoveWorkExperienceFromPersonInput) =>
        new RemoveWorkExperienceFromPersonUseCase(personGateway).execute(input),
      addEducation: (input: AddEducationToPersonInput) => new AddEducationToPersonUseCase(personGateway).execute(input),
      removeEducation: (input: RemoveEducationFromPersonInput) =>
        new RemoveEducationFromPersonUseCase(personGateway).execute(input),
    }),
    [personGateway],
  );
}
