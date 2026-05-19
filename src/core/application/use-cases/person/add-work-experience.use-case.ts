import { Person } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';
import { AddWorkExperienceDto, PersonGateway } from '@core/domain';

export interface AddWorkToPersonInput {
  id: string;
  payload: AddWorkExperienceDto;
}

export interface AddWorkToPersonOutput {
  person: Person;
}

export class AddWorkToPersonUseCase implements IUseCase<AddWorkToPersonInput, AddWorkToPersonOutput> {
  constructor(private readonly gateway: PersonGateway) {}

  async execute(input: AddWorkToPersonInput): Promise<AddWorkToPersonOutput> {
    const response = await this.gateway.addWorkExperience(input.id, input.payload);
    if (!response.data) {
      throw new Error('Person not found');
    }

    return {
      person: response.data,
    };
  }
}
