import { CandidateVacancyMatch } from '@core/domain/entities/candidate-vacancy-match';
import { MatchingGateway } from '@core/domain/gateways/matching.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetForPersonInput = {
  personId: string;
  limit?: number;
  minScore?: number;
};

export type GetForPersonOutput = CandidateVacancyMatch[] | null;

export class GetForPersonUseCase implements IUseCase<GetForPersonInput, GetForPersonOutput> {
  constructor(private readonly gateway: MatchingGateway) {}

  async execute(input: GetForPersonInput): Promise<GetForPersonOutput> {
    const response = await this.gateway.findForPerson({
      personId: input.personId,
      limit: input.limit,
      minScore: input.minScore,
    });

    return response.data;
  }
}
