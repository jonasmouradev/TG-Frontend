import {
  PersonGateway,
  PersonFilters,
  PersonListResponse,
  CreatePersonDto,
  UpdatePersonDto,
  AddCompetenceDto,
  AddWorkExperienceDto,
  AddEducationDto,
  Person,
} from '@core/domain';
import { IHttpClient, PromiseResponse } from '@core/domain/ports/http-client.port';

export class PersonHttpGateway implements PersonGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async findAll(filters?: PersonFilters): PromiseResponse<PersonListResponse> {
    return this.httpClient.get<PersonListResponse>({
      url: `/persons`,
      params: filters as Record<string, unknown>,
    });
  }

  async findOne(id: string): PromiseResponse<Person> {
    return this.httpClient.get<Person>({ url: `/persons/${id}` });
  }

  async create(payload: CreatePersonDto): PromiseResponse<Person> {
    return this.httpClient.post<Person>({ url: `/persons`, payload });
  }

  async update(id: string, payload: UpdatePersonDto): PromiseResponse<Person> {
    return this.httpClient.put<Person>({ url: `/persons/${id}`, payload });
  }

  async delete(id: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/persons/${id}` });
  }

  async findByUserId(userId: string): PromiseResponse<Person> {
    return this.httpClient.get<Person>({ url: `/persons/user/${userId}` });
  }

  // Competence management
  async addCompetence(id: string, payload: AddCompetenceDto): PromiseResponse<Person> {
    return this.httpClient.post<Person>({ url: `/persons/${id}/competences`, payload });
  }

  async removeCompetence(id: string, competenceId: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/persons/${id}/competences/${competenceId}` });
  }

  // Work experience management
  async addWorkExperience(id: string, payload: AddWorkExperienceDto): PromiseResponse<Person> {
    return this.httpClient.post<Person>({ url: `/persons/${id}/work-experiences`, payload });
  }

  async removeWorkExperience(id: string, experienceId: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/persons/${id}/work-experiences/${experienceId}` });
  }

  // Education management
  async addEducation(id: string, payload: AddEducationDto): PromiseResponse<Person> {
    return this.httpClient.post<Person>({ url: `/persons/${id}/education`, payload });
  }

  async removeEducation(id: string, educationId: string): PromiseResponse<void> {
    return this.httpClient.delete({ url: `/persons/${id}/education/${educationId}` });
  }
}
