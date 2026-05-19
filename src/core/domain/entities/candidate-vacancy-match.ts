type ScoreBreakdown = {
  competence_match: number;
  experience_match: number;
  education_match: number;
  location_match: number;
  salary_match: number;
};

type CandidateVacancyMatchProps = {
  id: string;
  personId: string;
  vacancyId: string;
  matchScore: number;
  scoreBreakdown: ScoreBreakdown;
  matchedCompetencesCount: number;
  requiredCompetencesCount: number;
  totalCompetencesCount: number;
  calculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export class CandidateVacancyMatch {
  private readonly props: CandidateVacancyMatchProps;

  constructor(props: CandidateVacancyMatchProps) {
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

  get scoreBreakdown(): ScoreBreakdown {
    return this.props.scoreBreakdown;
  }

  get matchedCompetencesCount(): number {
    return this.props.matchedCompetencesCount;
  }

  get requiredCompetencesCount(): number {
    return this.props.requiredCompetencesCount;
  }

  get totalCompetencesCount(): number {
    return this.props.totalCompetencesCount;
  }

  get calculatedAt(): Date {
    return this.props.calculatedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
