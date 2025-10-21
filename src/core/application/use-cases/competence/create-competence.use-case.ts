import { IUseCase } from '@/core/domain/use-case.interface';
import { CompetenceGateway, CreateCompetenceDto } from '@/core/domain/gateways/competence.gateway';
import { Competence } from '@/core/domain/entities';

export type CreateCompetenceUseCaseInput = CreateCompetenceDto;

export interface CreateCompetenceUseCaseOutput {
  competence: Competence;
}

export class CreateCompetenceUseCase implements IUseCase<CreateCompetenceUseCaseInput, CreateCompetenceUseCaseOutput> {
  constructor(private readonly competenceGateway: CompetenceGateway) {}

  async execute(input: CreateCompetenceUseCaseInput): Promise<CreateCompetenceUseCaseOutput> {
    if (!input.name) {
      throw new Error('Competence name is required');
    }

    if (!input.category) {
      throw new Error('Competence category is required');
    }

    const response = await this.competenceGateway.create(input);

    if (!response.data) {
      throw new Error('Failed to create competence');
    }

    return {
      competence: response.data,
    };
  }
}
