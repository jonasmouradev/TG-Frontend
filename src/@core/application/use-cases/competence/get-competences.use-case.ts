import { IUseCase } from '@core/domain/use-case.interface';
import { CompetenceGateway, CompetenceFilters, CompetenceList } from '@core/domain/gateways/competence.gateway';

export interface GetCompetencesUseCaseInput {
  filters?: CompetenceFilters;
}

export interface GetCompetencesUseCaseOutput {
  competences: CompetenceList;
}

export class GetCompetencesUseCase implements IUseCase<GetCompetencesUseCaseInput, GetCompetencesUseCaseOutput> {
  constructor(private readonly competenceGateway: CompetenceGateway) {}

  async execute(input: GetCompetencesUseCaseInput = {}): Promise<GetCompetencesUseCaseOutput> {
    const response = await this.competenceGateway.findAll(input.filters);

    if (!response.data) {
      throw new Error('Failed to retrieve competences');
    }

    return {
      competences: response.data,
    };
  }
}
