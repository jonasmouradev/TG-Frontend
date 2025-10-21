import { IUseCase } from '@/core/domain/use-case.interface';
import { CompetenceGateway, UpdateCompetenceDto } from '@/core/domain/gateways/competence.gateway';
import { Competence } from '@/core/domain/entities';

export interface UpdateCompetenceUseCaseInput {
  id: string;
  data: UpdateCompetenceDto;
}

export interface UpdateCompetenceUseCaseOutput {
  competence: Competence;
}

export class UpdateCompetenceUseCase implements IUseCase<UpdateCompetenceUseCaseInput, UpdateCompetenceUseCaseOutput> {
  constructor(private readonly competenceGateway: CompetenceGateway) {}

  async execute(input: UpdateCompetenceUseCaseInput): Promise<UpdateCompetenceUseCaseOutput> {
    if (!input.id) {
      throw new Error('Competence ID is required');
    }

    const response = await this.competenceGateway.update(input.id, input.data);

    if (!response.data) {
      throw new Error('Failed to update competence');
    }

    return {
      competence: response.data,
    };
  }
}
