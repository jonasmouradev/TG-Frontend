import { Person } from '@core/domain/entities';
import { IUseCase } from '@core/domain/use-case.interface';
import { PersonGateway } from '@core/domain';

export interface RemoveWorkExperienceFromPersonInput {
  id: string;
  workExperienceId: string;
}

export interface RemoveWorkExperienceFromPersonOutput {
  person: Person;
}

export class RemoveWorkExperienceFromPersonUseCase
  implements IUseCase<RemoveWorkExperienceFromPersonInput, RemoveWorkExperienceFromPersonOutput>
{
  constructor(private readonly gateway: PersonGateway) {}

  async execute(input: RemoveWorkExperienceFromPersonInput): Promise<RemoveWorkExperienceFromPersonOutput> {
    const response = await this.gateway.removeWorkExperience(input.id, input.workExperienceId);
    if (!response.data) {
      throw new Error('Person not found');
    }

    return {
      person: response.data,
    };
  }
}
