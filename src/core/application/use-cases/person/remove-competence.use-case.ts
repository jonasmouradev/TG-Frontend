import { Person } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';
import { PersonGateway } from '@core/domain';

export interface RemoveCompetenceFromPersonInput {
  id: string;
  competenceId: string;
}

export interface RemoveCompetenceFromPersonOutput {
  person: Person;
}

export class RemoveCompetenceFromPersonUseCase
  implements IUseCase<RemoveCompetenceFromPersonInput, RemoveCompetenceFromPersonOutput>
{
  constructor(private readonly gateway: PersonGateway) {}

  async execute(input: RemoveCompetenceFromPersonInput): Promise<RemoveCompetenceFromPersonOutput> {
    const response = await this.gateway.removeCompetence(input.id, input.competenceId);
    if (!response.data) {
      throw new Error('Person not found');
    }

    return {
      person: response.data,
    };
  }
}
