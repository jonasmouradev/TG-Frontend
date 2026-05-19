import { CandidateVacancyMatch } from '../entities/candidate-vacancy-match';
import { PromiseResponse } from '../ports';

type FindForVacancy = {
  vacancyId: string;
  minScore?: number;
  limit?: number;
};

type FindForPerson = {
  personId: string;
  minScore?: number;
  limit?: number;
};

type CalculateScore = {
  personId: string;
  vacancyId: string;
};

type RecalculateScore = {
  matchId: string;
};

export interface MatchingGateway {
  calculate(payload: CalculateScore): PromiseResponse<number>;
  recalculate(payload: RecalculateScore): PromiseResponse<number>;
  findForVacancy(params: FindForVacancy): PromiseResponse<CandidateVacancyMatch[]>;
  findForPerson(params: FindForPerson): PromiseResponse<CandidateVacancyMatch[]>;
  findBestForVacancy(vacancyId: string): PromiseResponse<CandidateVacancyMatch | null>;
}

export type {
  FindForVacancy as FindMatchingForVacancyDto,
  FindForPerson as FindMatchingForPersonDto,
  CalculateScore as CalculateScoreDto,
  RecalculateScore as RecalculateScoreDto,
};
