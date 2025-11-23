import { IHttpClient, PromiseResponse } from '@core/domain';
import { CandidateVacancyMatch } from '@core/domain/entities/candidate-vacancy-match';
import {
  MatchingGateway,
  CalculateScoreDto,
  FindMatchingForPersonDto,
  FindMatchingForVacancyDto,
  RecalculateScoreDto,
} from '@core/domain/gateways/matching.gateway';

export class MatchingHttpGateway implements MatchingGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async calculate({ personId, vacancyId }: CalculateScoreDto): PromiseResponse<number> {
    return this.httpClient.post<number>({
      url: `/matching/calculate/${personId}/${vacancyId}`,
    });
  }

  async recalculate({ matchId }: RecalculateScoreDto): PromiseResponse<number> {
    return this.httpClient.post<number>({
      url: `/matching/recalculate/${matchId}`,
    });
  }

  async findForVacancy({
    vacancyId,
    minScore,
    limit,
  }: FindMatchingForVacancyDto): PromiseResponse<CandidateVacancyMatch[]> {
    const params: Record<string, number> = {};
    if (minScore !== undefined) params.minScore = minScore;
    if (limit !== undefined) params.limit = limit;

    return this.httpClient.get<CandidateVacancyMatch[]>({
      url: `/matching/vacancy/${vacancyId}`,
      params,
    });
  }

  async findForPerson({
    personId,
    minScore,
    limit,
  }: FindMatchingForPersonDto): PromiseResponse<CandidateVacancyMatch[]> {
    const params: Record<string, number> = {};
    if (minScore !== undefined) params.minScore = minScore;
    if (limit !== undefined) params.limit = limit;

    return this.httpClient.get<CandidateVacancyMatch[]>({
      url: `/matching/person/${personId}`,
      params,
    });
  }

  async findBestForVacancy(vacancyId: string): PromiseResponse<CandidateVacancyMatch | null> {
    return this.httpClient.get<CandidateVacancyMatch | null>({
      url: `/matching/vacancy/${vacancyId}/best`,
    });
  }
}
