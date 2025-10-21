import { PromiseResponse } from '@/core/domain/ports/http-client.port';
import { CreatePersonDto, Person, PersonCompetenceLevel, PersonFilters, UpdatePersonDto } from '../entities';

export interface PersonListResponse {
  persons: Person[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AddCompetenceDto {
  competenceId: string;
  level: PersonCompetenceLevel;
  yearsOfExperience?: number;
}

export interface AddWorkExperienceDto {
  company: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
}

export interface AddEducationDto {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  gpa?: number;
}

export abstract class PersonGateway {
  abstract getPersons(filters?: PersonFilters): PromiseResponse<PersonListResponse>;
  abstract getPersonById(id: string): PromiseResponse<Person>;
  abstract createPerson(payload: CreatePersonDto): PromiseResponse<Person>;
  abstract updatePerson(id: string, payload: UpdatePersonDto): PromiseResponse<Person>;
  abstract deletePerson(id: string): PromiseResponse<void>;
  abstract getPersonByUserId(userId: string): PromiseResponse<Person>;
  abstract addCompetence(id: string, payload: AddCompetenceDto): PromiseResponse<Person>;
  abstract removeCompetence(id: string, competenceId: string): PromiseResponse<void>;
  abstract addWorkExperience(id: string, payload: AddWorkExperienceDto): PromiseResponse<Person>;
  abstract removeWorkExperience(id: string, experienceId: string): PromiseResponse<void>;
  abstract addEducation(id: string, payload: AddEducationDto): PromiseResponse<Person>;
  abstract removeEducation(id: string, educationId: string): PromiseResponse<void>;
}
