import { Person } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';
import { AddEducationDto, PersonGateway } from '@core/domain';

export interface AddEducationToPersonInput {
  id: string;
  payload: AddEducationDto;
}

export interface AddEducationToPersonOutput {
  person: Person;
}

export class AddEducationToPersonUseCase implements IUseCase<AddEducationToPersonInput, AddEducationToPersonOutput> {
  constructor(private readonly gateway: PersonGateway) {}

  async execute(input: AddEducationToPersonInput): Promise<AddEducationToPersonOutput> {
    const response = await this.gateway.addEducation(input.id, input.payload);
    if (!response.data) {
      throw new Error('Person not found');
    }

    return {
      person: response.data,
    };
  }
}
