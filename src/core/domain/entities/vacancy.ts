import { DateTime } from 'luxon';

export const VacancyType = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship',
  TEMPORARY: 'temporary',
} as const;
export type VacancyType = (typeof VacancyType)[keyof typeof VacancyType];

export const ExperienceLevel = {
  ENTRY: 'entry',
  JUNIOR: 'junior',
  MID: 'mid',
  SENIOR: 'senior',
  LEAD: 'lead',
} as const;
export type ExperienceLevel = (typeof ExperienceLevel)[keyof typeof ExperienceLevel];

export const VacancyStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  PAUSED: 'paused',
  CLOSED: 'closed',
  EXPIRED: 'expired',
} as const;
export type VacancyStatus = (typeof VacancyStatus)[keyof typeof VacancyStatus];

export const ContractType = {
  CLT: 'clt',
  PJ: 'pj',
  FREELANCE: 'freelance',
  INTERN: 'intern',
  TEMPORARY: 'temporary',
} as const;
export type ContractType = (typeof ContractType)[keyof typeof ContractType];

export const WorkModeType = {
  ONSITE: 'onsite',
  REMOTE: 'remote',
  HYBRID: 'hybrid',
} as const;
export type WorkModeType = (typeof WorkModeType)[keyof typeof WorkModeType];

type VacancyProps = {
  id: string;
  title: string;
  description: string;
  companyId: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  type: VacancyType;
  level: ExperienceLevel;
  remote: boolean;
  benefits?: string[];
  requirements: string[];
  responsibilities: string[];
  steps: {
    id: string;
    order: number;
    step: {
      name: string;
      description: string;
    };
  }[];
  company: {
    id: string;
    user: {
      name: string;
    };
  };
  status: VacancyStatus;
  publicationDate: string | null;
  expirationDate: string | null;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export class Vacancy {
  private readonly props: VacancyProps;

  constructor(props: VacancyProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  get location(): string {
    return this.props.location;
  }

  get salaryMin(): number | undefined {
    return this.props.salaryMin;
  }

  get salaryMax(): number | undefined {
    return this.props.salaryMax;
  }

  get currency(): string | undefined {
    return this.props.currency;
  }

  get type(): VacancyType {
    return this.props.type;
  }

  get level(): ExperienceLevel {
    return this.props.level;
  }

  get remote(): boolean {
    return this.props.remote;
  }

  get benefits(): string[] | undefined {
    return this.props.benefits;
  }

  get requirements(): string[] {
    return this.props.requirements;
  }

  get responsibilities(): string[] {
    return this.props.responsibilities;
  }

  get status(): VacancyStatus {
    return this.props.status;
  }

  get publicationDate(): string | null {
    return this.props.publicationDate;
  }

  get expirationDate(): string | null {
    return this.props.expirationDate;
  }

  get company(): { id: string; user: { name: string } } {
    return this.props.company;
  }

  get steps(): { id: string; order: number; step: { name: string; description: string } }[] {
    return this.props.steps;
  }

  get createdAt(): DateTime {
    return this.props.createdAt;
  }

  get updatedAt(): DateTime {
    return this.props.updatedAt;
  }
}
