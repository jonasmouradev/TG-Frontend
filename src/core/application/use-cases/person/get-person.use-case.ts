import { PersonGateway } from '@core/domain/gateways/person.gateway';
import { Person } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface GetPersonInput {
  id: string;
}

export interface GetPersonOutput {
  person: Person;
}

export class GetPersonUseCase implements IUseCase<GetPersonInput, GetPersonOutput> {
  constructor(private readonly gateway: PersonGateway) {}

  async execute(input: GetPersonInput): Promise<GetPersonOutput> {
    const response = await this.gateway.findOne(input.id);

    if (!response.data) {
      throw new Error('Person not found');
    }

    return {
      person: response.data,
    };
  }
}
