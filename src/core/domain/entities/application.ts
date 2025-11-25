import { DateTime } from 'luxon';
import { Person } from './person';
import { Vacancy } from './vacancy';

interface ApplicationProps {
  id: string;
  applicantId: string;
  vacancyId: string;
  status: ApplicationStatus;
  resume?: string;
  coverLetter?: string;
  applicant?: Person;
  vacancy?: Vacancy;
  appliedAt: DateTime;
  createdAt: string;
  updatedAt: DateTime;
}

export const ApplicationStatus = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  INTERVIEW: 'interview',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
} as const;
export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export class Application {
  private readonly props: ApplicationProps;

  constructor(props: ApplicationProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get applicantId(): string {
    return this.props.applicantId;
  }

  get vacancyId(): string {
    return this.props.vacancyId;
  }

  get status(): ApplicationStatus {
    return this.props.status;
  }

  get resume(): string | undefined {
    return this.props.resume;
  }

  get coverLetter(): string | undefined {
    return this.props.coverLetter;
  }

  get appliedAt(): DateTime {
    return this.props.appliedAt;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get updatedAt(): DateTime {
    return this.props.updatedAt;
  }

  get applicant(): Person | undefined {
    return this.props.applicant;
  }

  get vacancy(): Vacancy | undefined {
    return this.props.vacancy;
  }

  toJSON() {
    return {
      id: this.id,
      applicantId: this.applicantId,
      vacancyId: this.vacancyId,
      status: this.status,
      resume: this.resume,
      coverLetter: this.coverLetter,
      appliedAt: this.appliedAt.toISO(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt.toISO(),
    };
  }
}
