import { VacancyGateway } from '@core/domain';
import { CandidateVacancyMatch } from '@core/domain/entities/candidate-vacancy-match';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetBestCandidatesInput = {
  vacancyId: string;
  limit?: number;
  minScore?: number;
};

export type GetBestCandidatesOutput = CandidateVacancyMatch[] | null;

export class GetBestCandidatesUseCase implements IUseCase<GetBestCandidatesInput, GetBestCandidatesOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  public static readonly queryKey = (input: Partial<GetBestCandidatesInput>) => ['vacancy', 'getBestCandidates', input];

  async execute(input: GetBestCandidatesInput): Promise<GetBestCandidatesOutput> {
    const response = await this.gateway.findBestCandidates({
      vacancyId: input.vacancyId,
      limit: input.limit,
      minScore: input.minScore,
    });

    return response.data;
  }
}
