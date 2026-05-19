import { CandidateVacancyMatch } from '@core/domain/entities/candidate-vacancy-match';
import { MatchingGateway } from '@core/domain/gateways/matching.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetForVacancyInput = {
  vacancyId: string;
  limit?: number;
  minScore?: number;
};

export type GetForVacancyOutput = CandidateVacancyMatch[] | null;

export class GetForVacancyUseCase implements IUseCase<GetForVacancyInput, GetForVacancyOutput> {
  constructor(private readonly gateway: MatchingGateway) {}

  public static readonly queryKey = (input: Partial<GetForVacancyInput>) => ['matching', 'forVacancy', input];

  async execute(input: GetForVacancyInput): Promise<GetForVacancyOutput> {
    const response = await this.gateway.findForVacancy({
      vacancyId: input.vacancyId,
      limit: input.limit,
      minScore: input.minScore,
    });

    return response.data;
  }
}
