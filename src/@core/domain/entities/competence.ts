import { DateTime } from 'luxon';

export const CompetenceCategory = {
  TECHNICAL: 'technical',
  BEHAVIORAL: 'behavioral',
  RESULT: 'result',
  CULTURAL_FIT: 'cultural-fit',
} as const;
export type CompetenceCategory = (typeof CompetenceCategory)[keyof typeof CompetenceCategory];

export const CompetenceLevel = {
  BASIC: 'basic',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert',
} as const;
export type CompetenceLevel = (typeof CompetenceLevel)[keyof typeof CompetenceLevel];

type CompetenceProps = {
  id: string;
  name: string;
  category: CompetenceCategory;
  description?: string;
  level?: CompetenceLevel;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export class Competence {
  private readonly props: CompetenceProps;

  constructor(props: CompetenceProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get category(): CompetenceCategory {
    return this.props.category;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get level(): CompetenceLevel | undefined {
    return this.props.level;
  }

  get createdAt(): DateTime {
    return this.props.createdAt;
  }

  get updatedAt(): DateTime {
    return this.props.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      description: this.description,
      level: this.level,
      createdAt: this.createdAt.toISO(),
      updatedAt: this.updatedAt.toISO(),
    };
  }
}
