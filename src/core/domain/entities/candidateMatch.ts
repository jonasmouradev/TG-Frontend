import { DateTime } from 'luxon';

type CandidateMatchProps = {
  id: string;
  personId: string;
  vacancyId: string;
  matchScore: number;
  scoreBreakdown: {
    competenceMatch: number;
    experienceMatch: number;
    educationMatch: number;
    locationMatch: number;
    salaryMatch: number;
  };
  totalCompetencesMatched: number;
  totalCompetencesCount: number;
  calculatedAt: DateTime;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export class CandidateMatch {
  private readonly props: CandidateMatchProps;

  constructor(props: CandidateMatchProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get personId(): string {
    return this.props.personId;
  }

  get vacancyId(): string {
    return this.props.vacancyId;
  }

  get matchScore(): number {
    return this.props.matchScore;
  }

  get scoreBreakdown(): {
    competenceMatch: number;
    experienceMatch: number;
    educationMatch: number;
    locationMatch: number;
    salaryMatch: number;
  } {
    return this.props.scoreBreakdown;
  }

  get totalCompetencesMatched(): number {
    return this.props.totalCompetencesMatched;
  }

  get totalCompetencesCount(): number {
    return this.props.totalCompetencesCount;
  }

  get calculatedAt(): DateTime {
    return this.props.calculatedAt;
  }

  get createdAt(): DateTime {
    return this.props.createdAt;
  }

  get updatedAt(): DateTime {
    return this.props.updatedAt;
  }
}
