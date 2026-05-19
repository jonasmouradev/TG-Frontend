import { CreatePersonDto, Person } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';
import { PersonGateway } from '@core/domain';

export interface CreatePersonInput {
  id: string;
  payload: CreatePersonDto;
}

export interface CreatePersonOutput {
  person: Person;
}

export class CreatePersonUseCase implements IUseCase<CreatePersonInput, CreatePersonOutput> {
  constructor(private readonly gateway: PersonGateway) {}

  async execute(input: CreatePersonInput): Promise<CreatePersonOutput> {
    const response = await this.gateway.update(input.id, input.payload);
    if (!response.data) {
      throw new Error('Person not found');
    }

    return {
      person: response.data,
    };
  }
}
