import { PersonGateway } from '@core/domain/gateways/person.gateway';
import { Person, UpdatePersonDto } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';

export interface UpdatePersonInput {
  id: string;
  payload: UpdatePersonDto;
}

export interface UpdatePersonOutput {
  person: Person;
}

export class UpdatePersonUseCase implements IUseCase<UpdatePersonInput, UpdatePersonOutput> {
  constructor(private readonly gateway: PersonGateway) {}

  async execute(input: UpdatePersonInput): Promise<UpdatePersonOutput> {
    const response = await this.gateway.update(input.id, input.payload);
    if (!response.data) {
      throw new Error('Person not found');
    }

    return {
      person: response.data,
    };
  }
}
