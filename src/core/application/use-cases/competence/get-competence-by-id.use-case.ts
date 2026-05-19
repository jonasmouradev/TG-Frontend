import { IUseCase } from '@core/domain/use-case.interface';
import { CompetenceGateway } from '@core/domain/gateways/competence.gateway';
import { Competence } from '@core/domain/entities';

export interface GetCompetenceByIdUseCaseInput {
  id: string;
}

export interface GetCompetenceByIdUseCaseOutput {
  competence: Competence | null;
}

export class GetCompetenceByIdUseCase
  implements IUseCase<GetCompetenceByIdUseCaseInput, GetCompetenceByIdUseCaseOutput>
{
  constructor(private readonly gateway: CompetenceGateway) {}

  public static readonly queryKey = (input: Partial<GetCompetenceByIdUseCaseInput>) => ['competenceById', input];

  async execute(input: GetCompetenceByIdUseCaseInput): Promise<GetCompetenceByIdUseCaseOutput> {
    if (!input.id) {
      throw new Error('Competence ID is required');
    }

    const response = await this.gateway.findOne(input.id);

    return {
      competence: response.data,
    };
  }
}
