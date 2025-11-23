import { VacancyGateway } from '@core/domain';
import { CandidateVacancyMatch } from '@core/domain/entities/candidate-vacancy-match';
import { IUseCase } from '@core/domain/use-case.interface';

export type GetBestCandidateInput = {
  vacancyId: string;
};

export type GetBestCandidateOutput = CandidateVacancyMatch | null;

export class GetBestCandidateUseCase implements IUseCase<GetBestCandidateInput, GetBestCandidateOutput> {
  constructor(private readonly gateway: VacancyGateway) {}

  async execute(input: GetBestCandidateInput): Promise<GetBestCandidateOutput> {
    const response = await this.gateway.findBestCandidate({
      vacancyId: input.vacancyId,
    });

    return response.data;
  }
}
