import { Person } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';
import { AddCompetenceDto, PersonGateway } from '@core/domain';

export interface AddCompetenceToPersonInput {
  id: string;
  payload: AddCompetenceDto;
}

export interface AddCompetenceToPersonOutput {
  person: Person;
}

export class AddCompetenceToPersonUseCase implements IUseCase<AddCompetenceToPersonInput, AddCompetenceToPersonOutput> {
  constructor(private readonly gateway: PersonGateway) {}

  async execute(input: AddCompetenceToPersonInput): Promise<AddCompetenceToPersonOutput> {
    const response = await this.gateway.addCompetence(input.id, input.payload);
    if (!response.data) {
      throw new Error('Person not found');
    }

    return {
      person: response.data,
    };
  }
}
