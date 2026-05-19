import { CandidateVacancyMatch } from '@core/domain/entities/candidate-vacancy-match';
import { MatchingGateway } from '@core/domain/gateways/matching.gateway';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetBestForVacancyInput = {
  vacancyId: string;
};

export type GetBestForVacancyOutput = CandidateVacancyMatch | null;
export class GetBestForVacancyUseCase implements IUseCase<GetBestForVacancyInput, GetBestForVacancyOutput> {
  constructor(private readonly gateway: MatchingGateway) {}

  public static readonly queryKey = (input: Partial<GetBestForVacancyInput>) => ['matching', 'bestForVacancy', input];

  async execute({ vacancyId }: GetBestForVacancyInput): Promise<GetBestForVacancyOutput> {
    const response = await this.gateway.findBestForVacancy(vacancyId);

    return response.data;
  }
}
