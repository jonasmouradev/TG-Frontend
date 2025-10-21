import { IUseCase } from '@core/domain/use-case.interface';
import { CompetenceGateway } from '@core/domain/gateways/competence.gateway';

export interface DeleteCompetenceUseCaseInput {
  id: string;
}

export interface DeleteCompetenceUseCaseOutput {
  success: boolean;
}

export class DeleteCompetenceUseCase implements IUseCase<DeleteCompetenceUseCaseInput, DeleteCompetenceUseCaseOutput> {
  constructor(private readonly competenceGateway: CompetenceGateway) {}

  async execute(input: DeleteCompetenceUseCaseInput): Promise<DeleteCompetenceUseCaseOutput> {
    if (!input.id) {
      throw new Error('Competence ID is required');
    }

    await this.competenceGateway.remove(input.id);

    return {
      success: true,
    };
  }
}
