import { Person } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';
import { PersonGateway } from '@core/domain';

export interface RemoveEducationFromPersonInput {
  id: string;
  educationId: string;
}

export interface RemoveEducationFromPersonOutput {
  person: Person;
}

export class RemoveEducationFromPersonUseCase
  implements IUseCase<RemoveEducationFromPersonInput, RemoveEducationFromPersonOutput>
{
  constructor(private readonly gateway: PersonGateway) {}

  async execute(input: RemoveEducationFromPersonInput): Promise<RemoveEducationFromPersonOutput> {
    const response = await this.gateway.removeEducation(input.id, input.educationId);
    if (!response.data) {
      throw new Error('Person not found');
    }

    return {
      person: response.data,
    };
  }
}
